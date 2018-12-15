import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AppbarComponent} from './appbar/appbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatNativeDateModule, MatRadioButton, MatRadioModule, MatSliderModule,
  MatStepperModule,
  MatToolbarModule, NativeDateModule
} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

// Routing
import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './main/main.component';
import {UsabilityComponent} from './usability/usability.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Scenario1Component } from './usability/scenario1/scenario1.component';
import {MAT_STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Scenario2Component } from './usability/scenario2/scenario2.component';
import { Scenario3Component } from './usability/scenario3/scenario3.component';
import { WebSpeechComponent } from './usability/scenario3/web-speech/web-speech.component';
import {CommonModule} from '@angular/common';
import {SpeechRecognizerService} from './usability/scenario3/web-speech/shared/services/speech-recognizer.service';
import {UserService} from './user.service';
import {LoggingService} from './logging.service';
import {DatePickerComponent} from './input-components/date-picker/date-picker.component';
import { SeqComponent } from './input-components/seq/seq.component';
import { DateSpinnerComponent } from './input-components/date-spinner/date-spinner.component';
import { DateMaskedComponent } from './input-components/date-masked/date-masked.component';
import { DateMonthSelectorComponent } from './input-components/date-month-selector/date-month-selector.component';
import { DateFullSelectorComponent } from './input-components/date-full-selector/date-full-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    AppbarComponent,
    MainComponent,
    UsabilityComponent,
    Scenario1Component,
    Scenario2Component,
    Scenario3Component,
    WebSpeechComponent,
    DatePickerComponent,
    SeqComponent,
    DateSpinnerComponent,
    DateMaskedComponent,
    DateMonthSelectorComponent,
    DateFullSelectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NativeDateModule,
    MatSliderModule,
    MatListModule,
    MatRadioModule,

    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    SpeechRecognizerService,
    UserService,
    LoggingService,
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
    ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
