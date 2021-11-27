import { IEntityBase } from "./base.model";

export interface ITask {
  id: string;
  userId: string;
  type: string;
  description?: string;
  completed: boolean;
  myDay: boolean;
  important: boolean;
  note?: string;
  steps?: IStep[];
}

export interface IStep {
  id: string;
  userId: string;
  type: string;
  taskId: string;
  description?: string;
  completed?: boolean;
}

export interface ITaskEntity extends IEntityBase, ITask {}

export interface IStepEntity extends IEntityBase, IStep {}
