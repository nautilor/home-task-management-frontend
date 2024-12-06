import { Api, Task, User } from "../Api";
import TaskInfo from "../TaskInfo/TaskInfo";
import { toaster, Toaster } from "../ui/toaster";

interface TaskContainerProps {
  users: User[];
  tasks: Task[];
  onReload: () => void;
}

const TaskContainer = (props: TaskContainerProps) => {
  const { tasks, users, onReload } = props;

  const onTaskCompleted = async (task: Task, user: User) => {
    await Api.addCompletion(task, user);
    onReload();
  };

  const onTaskUndo = async (task: Task, user: User) => {
    const completion = task.completions!.find((c) => c.user.id === user.id);
    if (!completion) {
      toaster.create({
        title: "Impossibile annullare il premio",
        type: "error",
        duration: 1500,
      });
      return;
    }
    try {
      await Api.deleteCompletion(completion.id);
      onReload();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Errore durante la richiesta";
      console.error(message);
      toaster.create({
        title: message,
        type: "error",
        duration: 1500,
      });
    }
  };

  const onTaskDelete = async (task: Task) => {
    console.log("Task deleted", task);
  };

  const onTaskEdit = async (task: Task) => {
    console.log("Task edited", task);
  };

  return (
    <div>
      <Toaster />
      {tasks.map((task) => (
        <TaskInfo
          key={task.id}
          task={task}
          users={users}
          onTaskCompleted={onTaskCompleted}
          onTaskDelete={onTaskDelete}
          onTaskEdit={onTaskEdit}
          onTaskUndo={onTaskUndo}
        />
      ))}
    </div>
  );
};

export default TaskContainer;
