import { Module } from '@nestjs/common';
import { PollerController } from './poller.controller';
import { InfluxDBModule } from '../influxdb/influxdb.module';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { LocalBitcoinService } from './services/localbitcoin.service';

@Module({
  modules: [InfluxDBModule, SchedulerModule],
  controllers: [PollerController],
  components: [LocalBitcoinService],
})
export class PollerModule {}
