import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { listItem } from '../listItem';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', '../app.component.css']
})
export class ListComponent implements OnInit {
  /**
   * Selects the numeric position indicator in the list header, allowing the user to
   * change the list's relative position in the model.
   */
  @ViewChild('index') positionSelector: ElementRef;

  /**
   * The name (and primary ID) of this list.
   */
  @Input() title: string;

  /**
   * The numeric (1-indexed) position of this list relative to the others.
   */
  @Input() pos: number;

  /**
   * The contents of the list.
   */
  @Input() items: listItem[];

  @Output() onAddItemToList: EventEmitter<[string, string]> = new EventEmitter();
  @Output() onRemoveItemFromList: EventEmitter<[string, listItem]> = new EventEmitter();
  @Output() onDeleteList: EventEmitter<string> = new EventEmitter();
  @Output() onMoveToTop: EventEmitter<any> = new EventEmitter();
  @Output() onMoveToIndex: EventEmitter<any> = new EventEmitter();

  /**
   * Flag to prevent an empty item from being added to the list.
   */
  inputEmpty = false;

  /**
   * Flag to indicate whether or not the list is in collapsed view.
   */
  collapsed = false;

  constructor() { }
  ngOnInit() { }

  /**
   * Triggers the list view to collapse or expand.
   */
  collapseExpand() {
    this.collapsed = !this.collapsed;
  }

  /**
   * Emits a message to remove a given listItem from this list in the parent component.
   *
   * @param  itemToRemove  target listItem to remove
   */
  removeItem(itemToRemove: listItem) {
    this.onRemoveItemFromList.emit([this.title, itemToRemove]);
  }

  /**
   * Emits a message to the parent component to add a new item to this list.
   *
   * @param  newItemText  text content of the listItem to be added
   */
  addItem(newItemText) {
    if (newItemText === '') {
      this.inputEmpty = true;
    } else {
      this.inputEmpty = false;
      this.onAddItemToList.emit([this.title, newItemText]);
    }
  }


  /**
   * Emits a message to the parent component to fully delete this list.
   */
  deleteList() {
    this.onDeleteList.emit(this.title);
  }

  moveToTop() {
    this.onMoveToTop.emit(this.title);
  }


  /**
   * Emits a message to the parent component to move this list to the specified position.
   * No input parameters, since it takes the value from the text field object in the list header.
   */
  moveToIndex() {
    const newIndex = this.positionSelector.nativeElement.value - 1;
    if (newIndex < 0) {
      this.resetPositionValue();
    } else {
      this.onMoveToIndex.emit([this.pos - 1, newIndex]);
    }
  }

  /**
   * Resets the text in the position input when the user clicks away or makes a bad input.
   */
  resetPositionValue() {
    this.positionSelector.nativeElement.value = this.pos;
  }
}

