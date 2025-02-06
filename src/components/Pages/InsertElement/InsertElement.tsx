import { Tabs } from "@chakra-ui/react";
import InsertCategory from "./InsertCategory";
import InsertTask from "./InsertTask";
import Header from "@/components/Header/Header";
import "./InsertElement.scss";
import InsertReward from "./InsertReward";
import { householdPaths } from "@/components/Router";

const InsertElement = () => {
  return (
    <div>
      <Header goBack={householdPaths.home} />
      <Tabs.Root defaultValue={"category"}>
        <Tabs.List>
          <Tabs.Trigger value="category">Categoria</Tabs.Trigger>
          <Tabs.Trigger value="task">Task</Tabs.Trigger>
          <Tabs.Trigger value="reward">Ricompensa</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="category">
          <InsertCategory />
        </Tabs.Content>
        <Tabs.Content value="task">
          <InsertTask />
        </Tabs.Content>
        <Tabs.Content value="reward">
          <InsertReward />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default InsertElement;
