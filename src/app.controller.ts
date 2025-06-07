import { Controller, Get } from '@nestjs/common';
import { AppService, HealthDTO } from './app.service';

@Controller("root")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  getHealth(): HealthDTO {
    return this.appService.getHealth();
  }
}
