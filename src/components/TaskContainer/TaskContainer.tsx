import { Api, Task, User } from "../Api";
import TaskInfo from "../TaskInfo/TaskInfo";

interface TaskContainerProps {
  users: User[];
  tasks: Task[];
  onReload: () => void;
}

const TaskContainer = (props: TaskContainerProps) => {
  const { tasks, users, onReload } = props;

  const onTaskCompleted = async (task: Task, user: User) => {
    await Api.addCompletion(task.id!, user.id);
    onReload();
  };

  const onTaskUndo = async (task: Task, user: User) => {
    const completion = task.completions!.find((c) => c.user.id === user.id);
    if (!completion) {
      return;
      // TODO: Add error handling
    }
    await Api.deleteCompletion(completion.id);
    onReload();
  };

  const onTaskDelete = async (task: Task) => {
    console.log("Task deleted", task);
  };

  const onTaskEdit = async (task: Task) => {
    console.log("Task edited", task);
  };

  return (
    <div>
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
