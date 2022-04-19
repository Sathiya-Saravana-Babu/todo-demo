import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TodoService } from '../services/todo.service';
import { MatDialog,  MatDialogRef} from '@angular/material/dialog';
import { TodoFormComponent } from './todo-form/todo-form.component';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todo:any;
  done:any;

  constructor(
    private todoService:TodoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  
  getData(){
    this.todoService.getData('todos').then(res=>{
     
      this.todo = res.filter((data:any)=>data.completed===true);
      this.done = res.filter((data:any)=>data.completed===false);
      console.log(res,this.todo, this.done, 'list');
     });
  }

  openDialog(item:any): void {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '500px',
      data: {task: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result.action == 'add'){
        this.todo.push({
          id: this.todo.length + 1,
          title: result.title,
          completed: false,
          userId: 1
        });
        alert('Task added !');
      }
      if(result.action == 'edit'){
        // let array:any = [];
        // if(result.completed == true){
        //   this.done.map((task:any)=>{
        //     if(task.id == result.id){
        //       task.title = result.title
        //     }
        //     array.push(task);
        //   })
        //   this.done = array;
        // }

        // if(result.completed == false){
        //   this.todo.map((task:any)=>{
        //     if(task.id == result.id){
        //       task.title = result.title
        //     }
        //     array.push(task);
        //   })
        //   this.todo = array;
        // }
        
        alert('Task updated !');
      }
      
    });
  }

  onEdit(){
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '500px',
      data: {action:'edit'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.todo.push({
        id: this.todo.length + 1,
        title: result,
        completed: false,
        userId: 1
      });
      alert('Task added !');
    });
  }

  onDelete(taskId:any){
    if (confirm('Are you sure to delete it ?')) {
      this.todo = this.todo.filter((task:any) => task.id !== taskId);
      this.done = this.done.filter((task:any) => task.id !== taskId);
    }
  }
  radioClick(item:any, list:any){
    
    if(list == 'todo' ){
      this.todo = this.todo.filter((task:any) => task.id !== item.id);
      this.done.push(item);
    }
    if(list == 'done' ){
      this.done = this.done.filter((task:any) => task.id !== item.id);
      this.todo.push(item);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
