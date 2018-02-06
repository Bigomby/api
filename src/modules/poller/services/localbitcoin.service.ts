import { Component, Inject } from '@nestjs/common';
import * as request from 'superagent';
import * as stats from 'stats-lite';

@Component()
export class LocalBitcoinService {
  private readonly URL = 'https://localbitcoins.com/bitcoincharts/VEF/orderbook.json';

  constructor(@Inject('DbConnectionToken') private readonly influx) {}

  public async update() {
    const res = await request.get(this.URL);
    const { asks } = res.body;
    const price = this.computeBTCPrice(asks);

    await this.influx.writePoints([
      { measurement: 'price', fields: { currency: 'VEF', value: price } },
    ]);
  }

  private computeBTCPrice(data: [[string, string]]): number {
    const floatData = data.map(([price, volume]) => [parseFloat(price), parseFloat(volume)]);
    const percentile = stats.percentile(floatData.map(([price, volume]) => price), 0.075);

    const [fiat, btc] = floatData
      .filter(([price, volume]) => volume / price >= 0.00001)
      .filter(([price, volume]) => price >= percentile)
      .map(([price, volume]) => [volume, volume / price])
      .reduce(
        ([accFiatVolume, accBtcVolume], [currentFiatVolume, currentBtcVolume]) =>
          accBtcVolume >= 1
            ? [accFiatVolume, accBtcVolume]
            : [accFiatVolume + currentFiatVolume, accBtcVolume + currentBtcVolume],
      );

    return fiat / btc;
  }
}
