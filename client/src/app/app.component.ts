import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './models/Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  tasks: Task[] = [];
  activeTask: Task = new Task();
  editMode = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.GetTasks();
  }

  GetTasks() {
    this.taskService.GetTasks().subscribe((result) => {
      this.tasks = result;
    });
  }

  changeCompleteStatus(TaskID: number) {
    this.tasks.forEach((task) => {
      if (task.TaskID === TaskID) task.Completed = !task.Completed;
    });
  }

  Edit(TaskID: number) {
    let filtered = this.tasks.filter((task) => {
      return task.TaskID === TaskID;
    });

    if (filtered.length > 0) {
      this.editMode = !this.editMode;
      this.activeTask = filtered[0];
    }
  }

  Clear() {
    this.activeTask = new Task();
    this.editMode = !this.editMode;
  }
}
