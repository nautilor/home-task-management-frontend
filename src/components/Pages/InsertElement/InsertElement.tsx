import { Tabs } from "@chakra-ui/react";
import InsertCategory from "./InsertCategory";
import InsertTask from "./InsertTask";
import Header from "@/components/Header/Header";
import "./InsertElement.scss";

const InsertElement = () => {
  return (
    <div>
      <Header hideAddButton={true} />
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