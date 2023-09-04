import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private API_URL = 'http://localhost:5000/';
  constructor(private http: HttpClient) {}

  public GetTasks() {
    return this.http.get<Task[]>(this.API_URL + 'GetTasks');
  }

  public AddTask(task: Task) {
    return this.http.post(this.API_URL + 'AddTask', task);
  }

  public UpdateTask(task: Task) {
    return this.http.post(this.API_URL + 'UpdateTask', task);
  }

  public DeleteTask(TaskID: number) {
    return this.http.delete(this.API_URL + 'DeleteTask/' + TaskID);
  }
}
