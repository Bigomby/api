import { Module } from '@nestjs/common';
import { PollerModule } from './modules/poller/poller.module';
import { InfluxDBModule } from './modules/influxdb/influxdb.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { APIModule } from './modules/api/api.module';

@Module({
  modules: [PollerModule, APIModule, InfluxDBModule, SchedulerModule],
})
export class ApplicationModule {}
