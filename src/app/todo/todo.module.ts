import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { NavbarComponent } from '../component/navbar/navbar.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    TodoComponent,
    NavbarComponent,
    TodoFormComponent
  ],
  entryComponents:[
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatDialogModule,
    // NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatFormFieldModule,
    MatRadioModule
  ]
})
export class TodoModule { }
