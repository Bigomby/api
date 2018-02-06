import { Module } from '@nestjs/common';
import { APIController } from './api.controller';
import { APIService } from './api.service';
import { InfluxDBModule } from '../influxdb/influxdb.module';

@Module({
  modules: [InfluxDBModule],
  controllers: [APIController],
  components: [APIService],
})
export class APIModule {}
