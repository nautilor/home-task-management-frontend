import Header from "@/components/Header/Header";
import "./TaskEditPage.scss";
import { useParams } from "react-router-dom";
import { Api, Task } from "@/components/Api";
import { useCallback, useEffect, useState } from "react";
import InsertTask from "../InsertElement/InsertTask";
import { householdPaths } from "@/components/Router";

const TaskEditPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<Task | undefined>(undefined);

  const loadData = useCallback(async () => {
    const task = await Api.getTask(taskId!);
    setTask(task);
  }, [taskId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      {task && (
        <Header
          goBack={householdPaths.category.replace(
            ":categoryId",
            task!.category.id!,
          )}
        />
      )}
      {task && <InsertTask task={task} />}
    </div>
  );
};

export default TaskEditPage;
