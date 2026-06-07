import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { routes } from './app.routes'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { env } from '../environments/environment'
import { providePrimeNG } from 'primeng/config'
import Aura from '@primeuix/themes/aura'
import { ConfirmationService, MessageService } from 'primeng/api'
import { registerLocaleData } from '@angular/common'
import localeIt from '@angular/common/locales/it'

registerLocaleData(localeIt)

export const appConfig: ApplicationConfig = {
   providers: [
      { provide: LOCALE_ID, useValue: 'it-IT' },
      provideBrowserGlobalErrorListeners(),
      provideRouter(routes),
      provideFirebaseApp(() => initializeApp(env.firebaseConfig)),
      provideFirestore(() => getFirestore()),
      providePrimeNG({
         theme: {
            preset: Aura,
            options: {
               darkModeSelector: false || 'none',
            },
         },
      }),
      ConfirmationService,
      MessageService,
   ],
}
