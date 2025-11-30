import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import Aura from '@primeuix/themes/aura';


import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NotesStore } from './@core/stores/note.store';

registerLocaleData(localeId, 'id-ID');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),
    {
      provide: NotesStore,   
      useFactory: NotesStore,
    }
  ]
};
