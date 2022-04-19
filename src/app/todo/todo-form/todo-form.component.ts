import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})


export class TodoFormComponent implements OnInit {

  title:any = '';
  data:any = {
    title : '',
    action : 'add',
    id : 0,
    completed : null,
  }
  close:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private todoService:TodoService
  ) {
    console.log(this.dialogData)
    if(this.dialogData!=null){
      this.data.title = this.dialogData.task.title;
      this.data.action = 'edit';
      this.data.id = this.dialogData.task.id;
      this.data.completed = this.dialogData.task.completed;
    }
   }

  ngOnInit(): void {
    
  }

  onSave(){
    console.log(this.title)
    let data = JSON.stringify({
      title: this.title,
      completed: false,
      userId: 1,
    })

    this.todoService.postData('todos', data).then(res=>{
      console.log(res)
      this.close = true;
    })

  }
  onCancel(): void {
    // this.dialogRef.close();
  }
}
