import { Module } from '@nestjs/common';
import { databaseProviders } from './influxdb.providers';

@Module({
  components: [...databaseProviders],
  exports: [...databaseProviders],
})
export class InfluxDBModule {}
