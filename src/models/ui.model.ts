import { IEntityBase } from "./base.model";

export interface IUIPreference {
  userId: string;
  showCompletedTasks: boolean;
}

export interface IUIPreferenceEntity extends IEntityBase, IUIPreference {}
