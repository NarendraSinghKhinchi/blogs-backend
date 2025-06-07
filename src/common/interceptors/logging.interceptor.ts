import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const startTime = Date.now();
    const method = request.method;
    const url = request.url;
    const ip = this.getClientIp(request);

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        const statusCode = response.statusCode;

        console.log(
          `${method} ${url} ${statusCode} - ${duration}ms`,
          `| IP: ${ip}`,
          `| User-Agent: ${request.headers['user-agent']}`,
        );
      }),
    );
  }

  private getClientIp(request: Request): string {
    const xForwardedFor = request.headers['x-forwarded-for'];
    const xRealIp = request.headers['x-real-ip'];
    const xClientIp = request.headers['x-client-ip'];
    const cfConnectingIp = request.headers['cf-connecting-ip']; // Cloudflare
    
    // X-Forwarded-For can contain multiple IPs, take the first one
    if (xForwardedFor) {
      const ips = Array.isArray(xForwardedFor) 
        ? xForwardedFor[0] 
        : xForwardedFor;
      return ips.split(',')[0].trim();
    }
    
   
    if (xRealIp) {
      return Array.isArray(xRealIp) ? xRealIp[0] : xRealIp;
    }
    
    if (xClientIp) {
      return Array.isArray(xClientIp) ? xClientIp[0] : xClientIp;
    }
    
    if (cfConnectingIp) {
      return Array.isArray(cfConnectingIp) ? cfConnectingIp[0] : cfConnectingIp;
    }
    
    
    const ip = request.ip || 'unknown';
    
    // Convert IPv6 loopback to IPv4 for better readability
    if (ip === '::1') {
      return '127.0.0.1';
    }
    
    // Remove IPv6 prefix if present (e.g., ::ffff:192.168.1.1 -> 192.168.1.1)
    if (ip.startsWith('::ffff:')) {
      return ip.substring(7);
    }
    
    return ip;
  }
}
