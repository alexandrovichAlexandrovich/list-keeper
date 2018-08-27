import {Directive, Component, Output, EventEmitter} from '@angular/core';
import {ListComponent} from './list/list.component';
import index from '../../node_modules/@angular/cli/lib/cli';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  lists: string[] = [];
  badNewListName = false;
  warning = '';

  searchFilter='';

  addList (newListName) {
    if (newListName === '') {
      this.warn('Please enter a list name.');
    } else if (this.lists.includes(newListName)) {
      this.warn('A list already exists with that name! List names must be unique.');
    } else {
      this.badNewListName = false;
      this.warn('');
      this.lists.unshift(newListName);
    }
  }

  warn (warning: string) {
    this.warning = warning;
  }

  removeList(listName: string) {
    const indexToRemove = this.lists.indexOf(listName);
    this.lists.splice(indexToRemove, 1);
  }

  moveToFront(ev: string) {
    let a = this.lists.splice(this.lists.indexOf(ev), 1)[0];
    this.lists.unshift(a);
  }

  moveToTarget(ev: number[]) {
    const fromIndex = ev[0];
    const toIndex = ev[1] < this.lists.length ? ev[1] : this.lists.length - 1;
    if (fromIndex === toIndex) return;
    const elem = this.lists.splice(fromIndex, 1)[0];
    // console.log(this.lists);
    this.lists.splice(toIndex, 0, elem);
    // console.log(this.lists);
  }

  search(input: string){
    this.searchFilter = input;
  }
}
