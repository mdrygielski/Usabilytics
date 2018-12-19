import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';
import {SpeechRecognizerService} from '../shared/services/speech-recognizer.service';
import {SpeechNotification} from '../shared/model/speech-notification';
import {SpeechError} from '../shared/model/speech-error';

@Component({
  selector: 'app-number-voice',
  templateUrl: './number-voice.component.html',
  styleUrls: ['./number-voice.component.css', '../../usability/usability.component.css']
})
export class NumberVoiceComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredValue: number;
  @Input() title: string;
  @Input() startTime: number;

  finalTranscript = '';
  interimTranscript = '';
  recognizing = false;
  notification: string;

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  public finished: boolean;

  numberBigInputFormControl = new FormControl('', []);

  constructor(private changeDetector: ChangeDetectorRef,
              private speechRecognizer: SpeechRecognizerService,
              private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
    this.speechRecognizer.initialize('pl');
    this.initRecognition();
    this.notification = null;
  }


  validateNumberVoice() {
    const cleanValue = +this.finalTranscript.replace(/[^0-9]+/g, '');
    if (cleanValue === this.requiredValue) {
      this.endTime = Date.now();
      this.finished = true;
      this.numberBigInputFormControl.setErrors(null);
      this.numberBigInputFormControl.disable();
      this.duration = this.endTime - this.startTime;
    } else {
      this.numberBigInputFormControl.setErrors({'incorrectNumberVoice': true});
      this.incorrectCounter++;
    }
  }

  submitTest(obj) {
    if (this.dataType === 'barcode') {
      const numberVoiceInput = {
        'numberVoiceInputBarcodeTitle': this.title,
        'numberVoiceInputBarcodeDuration': this.duration,
        'numberVoiceInputBarcodeIncorrectCounter': this.incorrectCounter,
        'numberVoiceInputBarcodeSEQRate': obj.rating,
        'numberVoiceInputBarcodeComment': obj.comment
      };
      this.loggingService.SendData(numberVoiceInput).subscribe();
    }
    this.finish.emit();
  }


  startButton(event) {
    if (this.recognizing) {
      this.speechRecognizer.stop();
      return;
    }
    this.speechRecognizer.start(event.timeStamp);
  }

  private initRecognition() {
    this.speechRecognizer.onStart()
      .subscribe(data => {
        this.recognizing = true;
        this.notification = 'I\'m listening...';
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        this.detectChanges();
        this.notification = null;
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        let message = data.content.trim();
        message = message.replace(/[^0-9]+/g, '');
        if (data.info === 'final_transcript' && message.length > 0) {
          this.interimTranscript = '';
          if (this.finalTranscript === '') {
            this.finalTranscript = message;
          } else if (this.finalTranscript.endsWith('\n')) {
            this.finalTranscript = `${this.finalTranscript}${message}`;
          } else {
            this.finalTranscript = `${this.finalTranscript} ${message}`;
          }
          this.detectChanges();
        }
        if (data.info === 'interim_transcript' && message.length > 0) {
          this.interimTranscript = message;
          this.detectChanges();
        }
      });

    this.speechRecognizer.onError()
      .subscribe(data => {
        switch (data.error) {
          case SpeechError.BLOCKED:
          case SpeechError.NOT_ALLOWED:
            this.notification = `Cannot run the demo.
            Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
            `;
            break;
          case SpeechError.NO_SPEECH:
            this.notification = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.NO_MICROPHONE:
            this.notification = `Microphone is not available. Please verify the connection of your microphone and try again.`;
            break;
          default:
            this.notification = null;
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }


  detectChanges() {
    this.changeDetector.detectChanges();
  }


  updateFinalTranscript(value: string) {
    if (this.interimTranscript === '') {
      this.finalTranscript = value;
    }
  }

  NumberAndSeparatorOnly(event: any): boolean {
    const charCode = event.which;
    // Allow number
    if ((charCode >= 48 && charCode <= 57) ||
      (charCode >= 96 && charCode <= 105)) {
      return true;
    }
    // Allow arrow keys
    if (charCode >= 37 && charCode <= 40) {
      return true;
    }
    // Allow select all
    if (charCode === 65 && event.ctrlKey) {
      return true;
    }
    // Allow contol characters
    if (charCode === 8 || charCode === 46) {
      return true;
    }

    // Allow special characters
    if (charCode === 32 || charCode === 109 || charCode === 189) {
      return true;
    }
    return false;
  }
}
