import { Tabs } from "@chakra-ui/react";
import Header from "@/components/Header/Header";
import "./InsertVegetableElement.scss";
import { vegetablePaths } from "@/components/Router";
import InsertVegetable from "./InsertVegetable";
import { useLocation, useParams } from "react-router-dom";
import InsertRecipe from "./InsertRecipe";
import { useCallback, useEffect, useState } from "react";
import { Api, Vegetable } from "@/components/Api";

const InsertVegetableElement = () => {
  const { vegetableId } = useParams();
  const location = useLocation();
  const isRecipe = location.pathname.includes("recipe");
  const defaultTab = vegetableId && isRecipe ? "recipe" : "vegetable";
  const [vegetable, setVegetable] = useState<Vegetable>();

  const loadVegetable = useCallback(async () => {
    if (vegetableId) {
      const response: Vegetable = await Api.getVegetable(vegetableId);
      setVegetable(response);
    }
  }, [vegetableId]);

  useEffect(() => {
    loadVegetable();
  }, [loadVegetable]);

  return (
    <div>
      <Header goBack={vegetablePaths.home} />
      <Tabs.Root defaultValue={defaultTab}>
        <Tabs.List>
          <Tabs.Trigger value="vegetable">Verdure</Tabs.Trigger>
          <Tabs.Trigger value="recipe">Ricetta</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="vegetable">
          <InsertVegetable />
        </Tabs.Content>
        <Tabs.Content value="recipe">
          <InsertRecipe vegetable={vegetable} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default InsertVegetableElement;
