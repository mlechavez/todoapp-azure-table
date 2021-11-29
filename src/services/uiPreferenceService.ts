import { TableClient } from "@azure/data-tables";
import { InteractiveBrowserCredential } from "@azure/identity";
import { IUIPreference, IUIPreferenceEntity } from "../models/ui.model";

const storageAccountName = process.env.REACT_APP_STORAGE_ACCOUNT_NAME;

const endpoint = `https://${storageAccountName}.table.core.windows.net`;
const tableName =
  process.env.REACT_APP_ENV === "production" ? "tasks" : "localtasks";
const partitionKey = "uiPreference";
const credentials = new InteractiveBrowserCredential({
  clientId: process.env.REACT_APP_CLIENT_ID,
  tenantId: process.env.REACT_APP_TENANT_ID,
});

const client = new TableClient(endpoint, tableName, credentials);

const updateUIPreferenceTasksAsync = async (uiPref: IUIPreference) => {
  try {
    const uiPreferenceToUpdate: IUIPreferenceEntity = {
      partitionKey,
      rowKey: uiPref.userId,
      userId: uiPref.userId,
      showCompletedTasks: uiPref.showCompletedTasks,
    };
    const response = await getUiPreferenceAsync(uiPref.userId);

    if (response && response.hasError)
      await client.createEntity(uiPreferenceToUpdate);
    else await client.updateEntity(uiPreferenceToUpdate, "Replace");

    return uiPref;
  } catch (error: any) {
    if (error.statusCode >= 500)
      return {
        hasError: true,
        statusCode: 404,
        message: "An error occured!",
      };
    return null;
  }
};

const getUiPreferenceAsync = async (userId: string) => {
  try {
    return await client.getEntity(partitionKey, userId);
  } catch (error: any) {
    if (error.statusCode === 404)
      return {
        hasError: true,
        statusCode: 404,
        message: "Resource not found!",
      };
    return null;
  }
};

const uiPreferenceService = {
  getUiPreferenceAsync,
  updateUIPreferenceTasksAsync,
};

export default uiPreferenceService;
