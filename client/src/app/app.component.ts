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
      this.editMode = true;
      this.activeTask = filtered[0];
    }
  }

  Clear() {
    this.activeTask = new Task();
    this.editMode = false;
  }

  AddTask() {
    let task: Task = {
      TaskID: 0,
      Task: this.activeTask.Task,
      AddedBy: this.activeTask.AddedBy,
      Completed: false,
    };

    this.taskService.AddTask(task).subscribe((result) => {
      this.activeTask = new Task();
      this.GetTasks();
    });
  }

  UpdateTask() {
    let task: Task = {
      TaskID: this.activeTask.TaskID,
      Task: this.activeTask.Task,
      AddedBy: this.activeTask.AddedBy,
      Completed: false,
    };

    this.taskService.UpdateTask(task).subscribe((result) => {
      this.activeTask = new Task();
      this.GetTasks();
      this.editMode = false;
    });
  }

  DeleteTask(TaskID: number) {
    this.taskService.DeleteTask(TaskID).subscribe((result) => {
      this.activeTask = new Task();
      this.GetTasks();
      this.editMode = false;
    });
  }
}
