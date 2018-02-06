import { Module } from '@nestjs/common';
import { schedulerProviders } from './scheduler.providers';

@Module({
  exports: [...schedulerProviders],
  components: [...schedulerProviders],
})
export class SchedulerModule {}
