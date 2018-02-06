import { Controller, Inject } from '@nestjs/common';
import { LocalBitcoinService } from './services/localbitcoin.service';
import * as Agenda from 'agenda';

@Controller()
export class PollerController {
  constructor(
    private readonly localBitcoinService: LocalBitcoinService,
    @Inject('AgendaProviderToken') private readonly agenda,
  ) {
    agenda.define('poll api', this.update.bind(this));
  }

  private async update(job, done) {
    try {
      await this.localBitcoinService.update();
    } catch (e) {
      console.error(e);
    } finally {
      done();
    }
  }
}
