import { odata, TableClient, TableTransaction } from "@azure/data-tables";
import { InteractiveBrowserCredential } from "@azure/identity";
import { IStep, ITask, ITaskEntity } from "../models/task.model";

const storageAccountName = process.env.REACT_APP_STORAGE_ACCOUNT_NAME;

const endpoint = `https://${storageAccountName}.table.core.windows.net`;
const tableName =
  process.env.REACT_APP_ENV === "production" ? "tasks" : "localtasks";
const partitionKey = "task";
const credentials = new InteractiveBrowserCredential({
  clientId: process.env.REACT_APP_CLIENT_ID,
  tenantId: process.env.REACT_APP_TENANT_ID,
});

const client = new TableClient(endpoint, tableName, credentials);

const createTaskAsync = async (task: ITask) => {
  try {
    const id = `${task.userId}_${Date.now().toString()}`;
    const newTask: ITaskEntity = {
      partitionKey: `${partitionKey}`,
      rowKey: id,
      id,
      type: partitionKey,
      userId: task.userId,
      description: task.description,
      completed: task.completed,
      important: task.important,
    };

    const transaction = new TableTransaction();
    transaction.createEntity(newTask);

    return await client.submitTransaction(transaction.actions);
  } catch (error: any) {
    return Promise.reject(new Error(error));
  }
};

const getTasksAsync = async (username: string) => {
  const lowerValue = `${username}_${"0".padStart(13, "0")}`;
  const higherValue = `${username}_${Date.now().toString()}`;

  let odataFilter = odata`PartitionKey eq ${partitionKey} and RowKey ge ${lowerValue} and RowKey le ${higherValue}`;

  const result = client.listEntities<ITask>({
    queryOptions: {
      filter: odataFilter,
    },
  });

  const items: ITask[] = [];

  for await (const task of result) {
    items.push({
      id: task.rowKey!,
      userId: task.userId,
      type: task.type,
      description: task.description,
      completed: task.completed,
      important: task.important,
      myDayEndDate: task.myDayEndDate,
    });
  }
  return items;
};

const deleteTaskAsync = async (id: string) => {
  try {
    const filter = odata`PartitionKey eq 'step' and RowKey ge '${id}_a' and RowKey le '${id}_9'`;
    const result = client.listEntities<IStep>({
      queryOptions: {
        filter,
      },
    });

    const transaction = new TableTransaction();
    transaction.deleteEntity(partitionKey, id);

    for await (const step of result) {
      if (step) transaction.deleteEntity(step.partitionKey!, step.rowKey!);
    }

    return client.submitTransaction(transaction.actions);
  } catch (error: any) {
    return Promise.reject(new Error(error));
  }
};

const updateTaskAsync = async (task: ITask) => {
  try {
    const taskToUpdate: ITaskEntity = {
      partitionKey: partitionKey,
      rowKey: task.id!,
      id: task.id,
      userId: task.userId,
      type: task.type,
      description: task.description,
      completed: task.completed,
      important: task.important,
      myDayEndDate: task.myDayEndDate,
    };
    await client.upsertEntity(taskToUpdate, "Replace");
  } catch (error: any) {
    return Promise.reject(new Error(error));
  }
};

const getStepsByIdAsync = async (username: string, taskId: string) => {
  const lowerValue = `${username}_${taskId}_${"0".padStart(13, "0")}`;
  const higherValue = `${username}_${taskId}_${Date.now().toString()}`;
  const filter = odata`PartitionKey eq 'step' and RowKey ge ${lowerValue} and RowKey le ${higherValue}`;
  const result = client.listEntities<IStep>({
    queryOptions: {
      filter,
    },
  });
  const items: IStep[] = [];

  for await (const step of result) {
    items.push({
      id: step.rowKey!,
      userId: step.userId,
      type: step.type,
      description: step.description,
      completed: step.completed,
      taskId: step.taskId,
    });
  }
  return items;
};

const taskService = {
  createTaskAsync,
  getTasksAsync,
  deleteTaskAsync,
  updateTaskAsync,
  getStepsByIdAsync,
};

export default taskService;
