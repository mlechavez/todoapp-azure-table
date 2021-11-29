import { IEntityBase } from "./base.model";

export interface IUIPreference {
  userId: string;
  showCompletedTasks: boolean;
  myDayBaseTime?: number;
}

export interface IUIPreferenceEntity extends IEntityBase, IUIPreference {}
