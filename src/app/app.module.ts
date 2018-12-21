import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AppbarComponent} from './appbar/appbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  DateAdapter, MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatCardModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatNativeDateModule, MatRadioButton, MatRadioModule, MatSliderModule, MatSlideToggleModule,
  MatStepperModule,
  MatToolbarModule, MatTooltipModule, NativeDateModule
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
import {CommonModule} from '@angular/common';
import {SpeechRecognizerService} from './input-components/shared/services/speech-recognizer.service';
import {UserService} from './user.service';
import {LoggingService} from './logging.service';
import {DatePickerComponent} from './input-components/date-picker/date-picker.component';
import { SeqComponent } from './input-components/seq/seq.component';
import { DateSpinnerComponent } from './input-components/date-spinner/date-spinner.component';
import { DateMaskedComponent } from './input-components/date-masked/date-masked.component';
import { DateMonthSelectorComponent } from './input-components/date-month-selector/date-month-selector.component';
import { DateFullSelectorComponent } from './input-components/date-full-selector/date-full-selector.component';
import { NumberInputComponent } from './input-components/number-input/number-input.component';
import { DateEditablePickerComponent } from './input-components/date-editable-picker/date-editable-picker.component';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { NumberSpinnerComponent } from './input-components/number-spinner/number-spinner.component';
import { NumberBigInputComponent } from './input-components/number-big-input/number-big-input.component';
import { NumberVoiceComponent } from './input-components/number-voice/number-voice.component';
import { Scenario4Component } from './usability/scenario4/scenario4.component';
import { NumberStarRatingComponent } from './input-components/number-star-rating/number-star-rating.component';
import { NumberRadioRatingComponent } from './input-components/number-radio-rating/number-radio-rating.component';
import { NumberSpinnerRatingComponent } from './input-components/number-spinner-rating/number-spinner-rating.component';
import { NumberSliderRatingComponent } from './input-components/number-slider-rating/number-slider-rating.component';
import { TextInputComponent } from './input-components/text-input/text-input.component';
import { TextVoiceComponent } from './input-components/text-voice/text-voice.component';
import { Scenario5Component } from './usability/scenario5/scenario5.component';
import { OptionsSlideToggleComponent } from './input-components/options-slide-toggle/options-slide-toggle.component';
import { OptionsSelectorComponent } from './input-components/options-selector/options-selector.component';
import { OptionsCheckboxComponent } from './options-checkbox/options-checkbox.component';


@NgModule({
  declarations: [
    AppComponent,
    AppbarComponent,
    MainComponent,
    UsabilityComponent,
    Scenario1Component,
    Scenario2Component,
    Scenario3Component,
    DatePickerComponent,
    SeqComponent,
    DateSpinnerComponent,
    DateMaskedComponent,
    DateMonthSelectorComponent,
    DateFullSelectorComponent,
    NumberInputComponent,
    DateEditablePickerComponent,
    NumberSpinnerComponent,
    NumberBigInputComponent,
    NumberVoiceComponent,
    Scenario4Component,
    NumberStarRatingComponent,
    NumberRadioRatingComponent,
    NumberSpinnerRatingComponent,
    NumberSliderRatingComponent,
    TextInputComponent,
    TextVoiceComponent,
    Scenario5Component,
    OptionsSlideToggleComponent,
    OptionsSelectorComponent,
    OptionsCheckboxComponent,
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
    MatTooltipModule,
    MatSlideToggleModule,

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
    },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
