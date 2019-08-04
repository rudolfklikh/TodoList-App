import { Component, OnInit } from '@angular/core';
import { TodoService } from "./shared/todo.service";
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray : any[];
  constructor(private toDoService : TodoService) { }

  ngOnInit() {
     this.toDoService.gettoDoList().snapshotChanges().subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })
    })
  }
  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }
  checkDo(key : any, bool : boolean) {
    this.toDoService.checkOrUnCheckTitle(key ,!bool);
  }

  onDelete(key) {
    this.toDoService.removeTitle(key);
  }
}
