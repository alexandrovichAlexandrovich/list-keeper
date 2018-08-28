/**
 * A simple text field component used in a couple places in this app.
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent implements OnInit {

  @Input() placeholder: string;
  @Input() warning = '';
  @Input() fontSize = '12px';
  @Input() resetOnSubmit = true;

  /**
   * Emits an event when a user hits the Enter key.
   */
  @Output() onFormSubmit: EventEmitter<string> = new EventEmitter();

  /**
   * Emits an event when the user hits any key.
   */
  @Output() onKeyUp: EventEmitter<string> = new EventEmitter();


  constructor() { }
  ngOnInit() { }

  submitForm(text: string) {
    this.onFormSubmit.emit(text);
  }

  emitCurrentValue(text: string) {
    this.onKeyUp.emit(text);
  }
}
