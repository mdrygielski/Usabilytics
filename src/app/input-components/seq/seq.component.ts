import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-seq',
  templateUrl: './seq.component.html',
  styleUrls: ['./seq.component.css']
})
export class SeqComponent implements OnInit {
  @Output() finish = new EventEmitter<object>();
  @Input() public displayControl: string;
  rate: number;
  comment: string;

  constructor() { }

  ngOnInit() {
  }

  submitSEQ() {
    this.finish.emit( {rate: this.rate, comment: this.comment} );
  }

}
