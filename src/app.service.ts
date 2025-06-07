import { Injectable } from '@nestjs/common';

export interface HealthDTO {
  status: string;
  timestamp: Date;
}
@Injectable()
export class AppService {
  getHealth(): HealthDTO {
    return {
      status: 'Running and Healthy ✅',
      timestamp: new Date(),
    };
  }
}
