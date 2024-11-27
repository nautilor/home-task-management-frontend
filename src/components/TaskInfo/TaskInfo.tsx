import { Badge, Button, Text } from "@chakra-ui/react";
import { Task, User } from "../Api";
import "./TaskInfo.scss";
import { LuCheckCircle, LuUndo } from "react-icons/lu";

interface TaskInfoProps {
  task: Task;
  users: User[];
  onTaskCompleted: (task: Task, user: User) => void;
  onTaskDelete: (task: Task) => void;
  onTaskEdit: (task: Task) => void;
  onTaskUndo: (task: Task, user: User) => void;
}

const TaskInfo = (props: TaskInfoProps) => {
  const { task, users } = props;

  const renderUserActions = (user: User) => {
    const userHasCompletedTask = task.completions!.find(
      (completion) => completion.user.id === user.id,
    );
    const numberOfCompletions = task.completions!.filter(
      (completion) => completion.user.id === user.id,
    ).length;
    return (
      <div className="taskusersection">
        <Button
          className="taskcompletebutton"
          colorScheme="green"
          onClick={() => props.onTaskCompleted(task, user)}
          colorPalette={"green"}
          variant={"subtle"}
        >
          <LuCheckCircle />
          {user.name}
        </Button>
        {userHasCompletedTask && (
          <Button
            className="taskundobutton"
            onClick={() => props.onTaskUndo(task, user)}
            colorScheme="red"
            colorPalette={"red"}
            variant={"subtle"}
          >
            <LuUndo />
            {numberOfCompletions}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div
      className="task-container"
      style={{
        borderLeft: `1em solid ${task.category.color}`,
      }}
    >
      <div className="taskinfo">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          {task.name}
        </Text>
        <Badge
          style={{
            marginTop: "0.2em",
            backgroundColor: `${task.category.color}55`,
            color: task.category.color,
          }}
        >
          {task.category.name}
        </Badge>
        <Text fontSize={"md"} className="taskpoints" color={"blue.500"}>
          {task.points} punti
        </Text>
        <div className="taskusersections">
          {users.map((user) => (
            <div key={user.id} className="taskuser">
              {renderUserActions(user)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
