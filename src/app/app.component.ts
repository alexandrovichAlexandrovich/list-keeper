/**
 * Main app component for list-keeper, an front-end that maintains a list of lists.
 * Stores lists in a dictionary Object, mapped by {listName : [item1, item2, ...]}.
 * List names are also stored in a list to maintain name uniqueness and respective
 * ordering.
 *
 * In this implementation, (string) list names are used as a primary identifier, and
 * must be unique.
 */

import {Component} from '@angular/core';
import {listItem} from './listItem';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  /**
   * A list of IDs representing the lists in the model. Used to maintain uniqueness of
   * primary IDs (list name in this implementation) and relative ordering.
   */
  lists: string[] = [];

  /**
   * Maps list name to its contents, an array of listItems.
   */
  contents: {[listName: string]: listItem[]} = {};

  /* In addition to the component's primary data contents,
     these variables serve as flags to determine whether
     a search is being performed or if an improper list
     is being added. */

  /**
   * Set to true if the text in the input text field is an unsuitable list name.
   */
  badNewListName = false;

  /**
   * Warning text to be displayed if a bad submission is made.
   */
  warning = '';

  /**
   * If nonempty, used to search for lists by name and contents.
   */
  searchFilter = '';

  /**
   * Attempts to create a new list with the given name. Fails if the the submitted string
   * is blank or if a list already exists with that name.
   *
   * @param  newListName  submitted name for a new list
   */
  addList (newListName) {
    if (newListName === '') {
      this.warn('Please enter a list name.');
    } else if (this.lists.includes(newListName)) {
      this.warn('A list already exists with that name! List names must be unique.');
    } else {
      this.badNewListName = false;
      this.warn('');
      this.contents[newListName] = [];
      this.lists.unshift(newListName);
    }
  }

  /**
   * Sets warning text to an input value.
   *
   * @param  warning  warning text
   */
  warn (warning: string) {
    this.warning = warning;
  }

  /**
   * Deletes a specified list.
   *
   * @param  listName  ID of list to remove
   */

  removeList(listName: string) {
    const indexToRemove = this.lists.indexOf(listName);
    this.lists.splice(indexToRemove, 1);
    delete this.contents[listName];
  }

  moveToFront(ev: string) {
    const a = this.lists.splice(this.lists.indexOf(ev), 1)[0];
    this.lists.unshift(a);
  }

  /**
   * Moves a list to a new position in the ordering.
   *
   * @param  ev  list of the form [oldIndex: number, newIndex: number]
   */

  moveToTarget(ev: number[]) {
    const fromIndex = ev[0];
    const toIndex = ev[1] < this.lists.length ? ev[1] : this.lists.length - 1;
    if (fromIndex === toIndex) { return; }
    const elem = this.lists.splice(fromIndex, 1)[0];
    this.lists.splice(toIndex, 0, elem);
  }

  /**
   * Updates the search filter, which is used in *ngIf attributes on app.component.html to
   * filter on list name and item contents.
   *
   * @param  input  search filter text
   */
  search(input: string) {
    this.searchFilter = input;
  }

  /**
   * Adds a new item with input text to a target list.
   *
   * @param  ev  list of the form [targetList: string, itemToAdd: string]
   */

  addItemToList(ev: [string , string]) {
    const targetList = ev[0];
    const itemToAdd = {
      text: ev[1]
    };
    this.contents[targetList].push(itemToAdd);
  }

  /**
   * Removes a passed listItem from a target list.
   *
   * @param  ev  list of the form [targetList: string, itemToRemove: listItem]
   */

  removeItemFromList(ev: [string, listItem]) {
    const i = this.contents[ev[0]].indexOf(ev[1]);
    this.contents[ev[0]].splice(i, 1);
    for (const item of this.contents[ev[0]]) {
      console.log('remaining: ' + item.text);
    }
  }

  /**
   * Searches the items of a target list for one that contains this.searchFilter.
   * Returns true if such an item exists in the target list, and false otherwise.
   *
   * @param list
   */

  searchByItemText(list: string) {
    for (const item of this.contents[list]) {
      if (item.text.includes(this.searchFilter)) { return true; }
    }
    return false;
  }
}
