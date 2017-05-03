import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

declare const ENV: string;

if (ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((error) => console.log(error));
