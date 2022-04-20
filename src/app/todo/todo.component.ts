import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { TodoService } from "../services/todo.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TodoFormComponent } from "./todo-form/todo-form.component";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
})
export class TodoComponent implements OnInit {
  @ViewChild("focus") focusElement: ElementRef;
  todo: any;
  done: any;
  data: any = {
    title: "",
    userId: 1,
    id: 0,
    completed: false,
  };
  taskInput: boolean = false;
  editId: number = 0;
  toolbar: boolean = false;
  toolbarId: any = [];
  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.todoService.getData("todos").then((res) => {
      this.todo = res.filter(
        (data: any) => data.id <= 20 && data.completed === true
      );
      this.done = res.filter(
        (data: any) => data.id <= 20 && data.completed === false
      );
      console.log(res, this.todo, this.done, "list");
    });
  }

  openDialog(item: any, list: any): void {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: "500px",
      data: { task: item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed", result);
      // Add task
      if (result.action == "add") {
        this.todo.unshift({
          id: this.todo.length + 1,
          title: result.title,
          completed: false,
          userId: 1,
        });
        alert("Task added !");
      }

      // Edit task
      if (result.action == "edit") {
        if (list == "todo") {
          this.todo = this.todo.filter((task: any) => {
            if (task.id === result.id) {
              task.title = result.title;
            }
            return task;
          });
        } else {
          this.done = this.done.filter((task: any) => {
            if (task.id === result.id) {
              task.title = result.title;
            }
            return task;
          });
        }
        alert("Task updated !");
      }
    });
  }

  onDelete(taskId: any) {
    if (confirm("Are you sure to delete it ?")) {
      this.todo = this.todo.filter((task: any) => task.id !== taskId);
      this.done = this.done.filter((task: any) => task.id !== taskId);
    }
  }

  radioClick(item: any, list: any) {
    if (list == "todo") {
      this.todo = this.todo.filter((task: any) => task.id !== item.id);
      this.done.unshift(item);
    }
    if (list == "done") {
      this.done = this.done.filter((task: any) => task.id !== item.id);
      this.todo.unshift(item);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  createTaskInput(el: HTMLElement) {
    el.scrollIntoView();
    this.taskInput = true;
    this.focusElement.nativeElement.focus();
  }
  onChange() {
    this.data.completed = !this.data.completed;
  }
  removeInput() {
    this.taskInput = false;
    this.editId = 0;
    this.data = {
      title: "",
      userId: 1,
      id: 0,
      completed: false,
    };
  }
  addTask() {
    this.data.id = this.todo.length + this.done.length + 1;
    console.log(this.data);
    this.todoService
      .postData("todos", JSON.stringify(this.data))
      .then((res) => {
        let result = this.data.completed
          ? this.done.unshift(this.data)
          : this.todo.unshift(this.data);
        alert("Task added !");
        this.removeInput();
      });
  }
  editInput(item: any, list: any) {
    this.editId = item.id;
    this.focusElement.nativeElement.focus();
  }

  onEdit(item: any, list: any) {
    if (list == "todo") {
      this.todo = this.todo.filter((task: any) => {
        if (task.id === item.id) {
          task.title = item.title;
        }
        return task;
      });
    } else {
      this.done = this.done.filter((task: any) => {
        if (task.id === item.id) {
          task.title = item.title;
        }
        return task;
      });
    }
    this.removeInput();
    alert("Task updated !");
  }
  onClick(id: any) {
    let i = this.toolbarId.indexOf(id);
    if (i == -1) {
      this.toolbarId.push(id);
    } else {
      this.toolbarId.splice(i, 1);
    }
  }
}
