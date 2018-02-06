import * as Agenda from 'agenda';

export const schedulerProviders = [
  {
    provide: 'AgendaProviderToken',
    useFactory: () =>
      new Promise((resolve, reject) => {
        const agenda = new Agenda({ db: { address: 'mongodb://localhost/btcven' } });

        agenda.once('ready', () => {
          agenda.start();
          resolve(agenda);
        });
      }),
  },
];
