import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../user.service';
import {LoggingService} from '../../logging.service';
import {SpeechRecognizerService} from '../shared/services/speech-recognizer.service';
import {SpeechNotification} from '../shared/model/speech-notification';
import {SpeechError} from '../shared/model/speech-error';

@Component({
  selector: 'app-text-voice',
  templateUrl: './text-voice.component.html',
  styleUrls: ['./text-voice.component.css', '../../usability/usability.component.css']
})
export class TextVoiceComponent implements OnInit {
  @Output() finish = new EventEmitter<void>();
  @Input() dataType: string;
  @Input() requiredText: number;
  @Input() title: string;
  @Input() startTime: number;

  finalTranscript = '';
  interimTranscript = '';
  recognizing = false;
  notification: string;

  private endTime: number;
  private duration: number;
  private incorrectCounter: number;
  private arrowKeyCounter: number;
  public finished: boolean;

  textVoiceFormControl = new FormControl('', []);

  constructor(private changeDetector: ChangeDetectorRef,
              private speechRecognizer: SpeechRecognizerService,
              private userService: UserService,
              private loggingService: LoggingService) {
  }

  ngOnInit() {
    this.finished = false;
    this.incorrectCounter = 0;
    this.arrowKeyCounter = 0;
    this.notification = null;
    this.speechRecognizer.initialize('pl');
    this.initRecognition();
  }


  validateText() {
    console.log(this.finalTranscript);
    if (this.textVoiceFormControl.value === this.requiredText) {
      this.endTime = Date.now();
      this.finished = true;
      this.textVoiceFormControl.setErrors(null);
      this.textVoiceFormControl.disable();
      this.duration = this.endTime - this.startTime;
    } else {
      this.textVoiceFormControl.setErrors({'incorrectText': true});
      this.incorrectCounter++;
    }
  }

  submitTest(obj) {
    if (this.dataType === 'simpleText') {
      const textVoiceInput = {
        'textVoiceSimpleTitle': this.title,
        'textVoiceSimpleDuration': this.duration,
        'textVoiceSimpleIncorrectCounter': this.incorrectCounter,
        'textVoiceSimpleArrowKeyCounter': this.arrowKeyCounter,
        'textVoiceSimpleSEQRate': obj.rating,
        'textVoiceSimpleComment': obj.comment
      };
      this.loggingService.SendData(textVoiceInput).subscribe();
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
        const message = data.content.trim();
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

  keyCounter(): void {
    this.arrowKeyCounter++;
  }
}
