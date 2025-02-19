import { Task } from '../task/task.model';

export type Priority = 'normal' | 'low' | 'high';

export interface Todo {
  title: string;
  description: string;
  deadline: string;
  priority: Priority;
  tasks: Task[];
}
