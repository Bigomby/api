import { Controller, Get } from '@nestjs/common';
import { APIService } from './api.service';

@Controller()
export class APIController {
  constructor(private readonly apiService: APIService) {}

  @Get()
  public getPrice() {
    return this.apiService.getPrice();
  }
}
