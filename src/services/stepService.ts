import { odata, TableClient, TableTransaction } from "@azure/data-tables";
import { InteractiveBrowserCredential } from "@azure/identity";
import { v4 as uuidv4 } from "uuid";

import { IStep, IStepEntity } from "../models/task.model";

const storageAccountName = process.env.REACT_APP_STORAGE_ACCOUNT_NAME;
const endpoint = `https://${storageAccountName}.table.core.windows.net`;
const tableName =
  process.env.REACT_APP_ENV === "production" ? "tasks" : "localtasks";
const partitionKey = "step";
const credentials = new InteractiveBrowserCredential({
  clientId: process.env.REACT_APP_CLIENT_ID,
  tenantId: process.env.REACT_APP_TENANT_ID,
});
const client = new TableClient(endpoint, tableName, credentials);

const createStepAsync = async (step: IStep) => {
  try {
    const id = `${step.userId}_${step.taskId}_${Date.now().toString()}`;
    const newStep: IStepEntity = {
      partitionKey: partitionKey,
      rowKey: id,
      id,
      userId: step.userId,
      type: "step",
      description: step.description,
      completed: step.completed,
      taskId: step.taskId,
    };
    const transaction = new TableTransaction();
    transaction.createEntity(newStep);

    return await client.submitTransaction(transaction.actions);
  } catch (error: any) {
    return Promise.reject(new Error(error));
  }
};

const getSteps = (username: string, taskId: string) => {
  const lowerValue = `${username}_${taskId}_${"0".padStart(13, "0")}`;
  const higherValue = `${username}_${taskId}_${Date.now().toString()}`;
  const filter = odata`PartitionKey eq ${partitionKey} and RowKey ge ${lowerValue} and RowKey le ${higherValue}`;
  const result = client.listEntities<IStep>({
    queryOptions: {
      filter,
    },
  });
  return result;
};

const updateStepAsync = async (step: IStep) => {
  try {
    const id = uuidv4().toString();
    const stepToUpdate: IStepEntity = {
      partitionKey: partitionKey,
      rowKey: step.id ? step.id : id,
      id: step.id ? step.id : id,
      userId: step.userId,
      type: step.type,
      description: step.description,
      completed: step.completed,
      taskId: step.taskId,
    };
    await client.upsertEntity(stepToUpdate, "Replace");
  } catch (error: any) {
    return Promise.reject(new Error(error));
  }
};

const deleteStepAsync = async (id: string) => {
  try {
    return await client.deleteEntity(partitionKey, id);
  } catch (error: any) {
    Promise.reject(new Error(error));
  }
};

const stepService = {
  createStepAsync,
  getSteps,
  updateStepAsync,
  deleteStepAsync,
};

export default stepService;
