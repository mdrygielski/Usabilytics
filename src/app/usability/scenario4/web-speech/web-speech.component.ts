// import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
// import { SpeechRecognizerService } from './shared/services/speech-recognizer.service';
//
// import { SpeechNotification } from './shared/model/speech-notification';
// import { SpeechError } from './shared/model/speech-error';
// import {UserService} from '../../../user.service';
//
// @Component({
//   selector: 'app-web-speech',
//   templateUrl: './web-speech.component.html',
//   styleUrls: ['./web-speech.component.css']
// })
//
//
// export class WebSpeechComponent implements OnInit {
//
//   finalTranscript = '';
//   interimTranscript = '';
//   recognizing = false;
//   notification: string;
//   currentLanguage: string;
//
//   constructor(private changeDetector: ChangeDetectorRef,
//               private speechRecognizer: SpeechRecognizerService,
//               private userService: UserService) { }
//
//   ngOnInit() {
//     this.currentLanguage = this.userService.language;
//     this.speechRecognizer.initialize(this.currentLanguage);
//     this.initRecognition();
//     this.notification = null;
//   }
//
//   startButton(event) {
//     if (this.currentLanguage !== this.userService.language) {
//       this.currentLanguage = this.userService.language;
//       this.speechRecognizer.setLanguage(this.currentLanguage);
//     }
//     if (this.recognizing) {
//       this.speechRecognizer.stop();
//       return;
//     }
//     this.speechRecognizer.start(event.timeStamp);
//   }
//
//   private initRecognition() {
//     this.speechRecognizer.onStart()
//       .subscribe(data => {
//         this.recognizing = true;
//         this.notification = 'I\'m listening...';
//         this.detectChanges();
//       });
//
//     this.speechRecognizer.onEnd()
//       .subscribe(data => {
//         this.recognizing = false;
//         this.detectChanges();
//         this.notification = null;
//       });
//
//     this.speechRecognizer.onResult()
//       .subscribe((data: SpeechNotification) => {
//         const message = data.content.trim();
//         if (data.info === 'final_transcript' && message.length > 0) {
//           this.interimTranscript = '';
//           if (this.finalTranscript === '') {
//             this.finalTranscript = message;
//           } else if (this.finalTranscript.endsWith('\n')) {
//             this.finalTranscript = `${this.finalTranscript}${message}`;
//           } else {
//             this.finalTranscript = `${this.finalTranscript} ${message}`;
//           }
//           this.detectChanges();
//         }
//         if (data.info === 'interim_transcript' && message.length > 0) {
//           this.interimTranscript = message;
//           this.detectChanges();
//         }
//       });
//
//     this.speechRecognizer.onError()
//       .subscribe(data => {
//         switch (data.error) {
//           case SpeechError.BLOCKED:
//           case SpeechError.NOT_ALLOWED:
//             this.notification = `Cannot run the demo.
//             Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
//             `;
//             break;
//           case SpeechError.NO_SPEECH:
//             this.notification = `No speech has been detected. Please try again.`;
//             break;
//           case SpeechError.NO_MICROPHONE:
//             this.notification = `Microphone is not available. Please verify the connection of your microphone and try again.`;
//             break;
//           default:
//             this.notification = null;
//             break;
//         }
//         this.recognizing = false;
//         this.detectChanges();
//       });
//   }
//
//   detectChanges() {
//     this.changeDetector.detectChanges();
//   }
//
//   updateFinalTranscript(value: string) {
//     if (this.interimTranscript === '') {
//       this.finalTranscript = value;
//     }
//   }
// }
