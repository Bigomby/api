import * as Influx from 'influx';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => {
      const influx = await new Influx.InfluxDB({
        host: 'localhost',
        database: 'btcven',
        schema: [
          {
            measurement: 'price',
            fields: {
              currency: Influx.FieldType.STRING,
              value: Influx.FieldType.FLOAT,
            },
            tags: [],
          },
        ],
      });

      return influx;
    },
  },
];
