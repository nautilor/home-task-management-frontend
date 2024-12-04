import { Tabs } from "@chakra-ui/react";
import InsertCategory from "./InsertCategory";
import InsertTask from "./InsertTask";
import Header from "@/components/Header/Header";
import "./InsertElement.scss";
import { useNavigate } from "react-router-dom";

const InsertElement = () => {
  const navigate = useNavigate();
  const goHome = () => navigate("/");
  return (
    <div>
      <Header hideAddButton={true} goBack={goHome} />
      <Tabs.Root defaultValue={"category"}>
        <Tabs.List>
          <Tabs.Trigger value="category">Category</Tabs.Trigger>
          <Tabs.Trigger value="task">Task</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="category">
          <InsertCategory />
        </Tabs.Content>
        <Tabs.Content value="task">
          <InsertTask />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default InsertElement;
