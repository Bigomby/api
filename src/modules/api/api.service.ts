import { Component, Inject } from '@nestjs/common';

@Component()
export class APIService {
  constructor(@Inject('DbConnectionToken') private readonly influx) {}

  public async getPrice() {
    const results = await this.influx.query('SELECT * FROM price ORDER BY time DESC LIMIT 1');
    const price = results
      .map(result => {
        return {
          time: {
            timestamp: Math.floor(result.time.getTime() / 1000),
          },
          BTC: {
            VEF: result.value,
          },
        };
      })
      .reduce((_, current) => {
        return current;
      }, []);

    return price;
  }
}
