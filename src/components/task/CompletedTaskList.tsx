import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMsal } from "@azure/msal-react";

import { ITask } from "../../models/task.model";
import { useAppDispatch } from "../../store/configureStore";
import { updateTaskAsync } from "../../store/taskSlice";
import ChevronToggler from "../ui/ChevronToggler";
import Item from "./Item";
import {
  setModalData,
  setShowFooter,
  toggleModal,
} from "../../store/modalSlice";
import {
  getUiPreferenceAsync,
  selectUiPreference,
  setUiPreferenceAsync,
} from "../../store/uiPreferenceSlice";

type Props = {
  tasks: ITask[];
};

const CompletedTaskList = ({ tasks }: Props) => {
  const dispatch = useAppDispatch();
  const { accounts } = useMsal();
  const account = accounts[0] && accounts[0].username;
  const uiPreference = useSelector(selectUiPreference);

  console.log(uiPreference);
  const handleShowDetails = (task: ITask) => {
    dispatch(setModalData(task));
    dispatch(toggleModal());
    dispatch(setShowFooter(false));
  };

  const handleComplete = async (task: ITask) => {
    await dispatch(updateTaskAsync({ ...task, completed: !task.completed }));
  };

  const handleTagImportant = async (task: ITask) => {
    if (task.completed) return;
    await dispatch(updateTaskAsync({ ...task, important: !task.important }));
  };

  const handleCompletedToggle = async () => {
    await dispatch(
      setUiPreferenceAsync({
        showCompletedTasks: uiPreference
          ? !uiPreference?.showCompletedTasks
          : false,
        userId: account,
      })
    );
  };

  const getUiPreference = async () => {
    await dispatch(getUiPreferenceAsync(account));
  };

  useEffect(() => {
    getUiPreference();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {tasks.length > 0 && (
        <ChevronToggler
          show={uiPreference?.showCompletedTasks || false}
          onToggle={handleCompletedToggle}
        />
      )}

      {uiPreference?.showCompletedTasks &&
        tasks.map((task, index) => (
          <Item
            key={`${task.id}-${index}`}
            task={task}
            onShowDetails={() => handleShowDetails(task)}
            onComplete={() => handleComplete(task)}
            onTagImportant={() => handleTagImportant(task)}
          />
        ))}
    </>
  );
};

export default CompletedTaskList;
