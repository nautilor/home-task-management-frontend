import { Tabs } from "@chakra-ui/react";
import Header from "@/components/Header/Header";
import InsertFridgeCategory from "./InsertFridgeCategory";
import "./InsertFridge.scss";
import InsertFridgeProduct from "./InsertFridgeProduct";

const InsertFridge = () => {
  return (
    <div>
      <Header goBack={true} />
      <Tabs.Root defaultValue={"category"}>
        <Tabs.List>
          <Tabs.Trigger value="category">Categoria</Tabs.Trigger>
          <Tabs.Trigger value="item">Prodotto</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="category">
          <InsertFridgeCategory />
        </Tabs.Content>
        <Tabs.Content value="item">
          <InsertFridgeProduct />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default InsertFridge;
