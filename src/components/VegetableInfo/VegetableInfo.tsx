import { VStack, Box, Text, HStack, Icon, List } from "@chakra-ui/react";
import { Api, Recipe, Vegetable } from "@/components/Api";
import "./VegetableInfo.scss";
import { FiArrowRightCircle, FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { recipePaths } from "../Router";
import { FaArrowRight } from "react-icons/fa6";
import { PiForkKnife } from "react-icons/pi";

interface VegetableInfoProps {
  item: Vegetable;
  onReload: () => Promise<void>;
  onEdit: (item: Vegetable) => void;
}

const VegetableInfo = (props: VegetableInfoProps) => {
  const { item, onReload, onEdit } = props;

  const navigate = useNavigate();

  const deleteRecipe = async (recipeId: string) => {
    const recipeVegetables = item.recipes?.find(
      (r) => r.id === recipeId,
    )?.vegetables;
    const otherVegetables = recipeVegetables?.filter((v) => v.id !== item.id);
    if (otherVegetables?.length !== 0) {
      item.recipes = item.recipes?.filter((r) => r.id !== recipeId);
      await Api.updateVegetable(item);
    } else {
      await Api.deleteRecipe(recipeId);
    }
    onReload();
  };

  return (
    <Box
      margin={5}
      backgroundColor={"black"}
      borderRadius={8}
      borderColor="gray.800"
      borderWidth={1.5}
      borderLeftWidth={"1em"}
      borderLeftColor={"green.500"}
    >
      <HStack padding={5} justify="space-between">
        <HStack alignItems={"flex-start"}>
          <Text fontWeight={"semibold"} fontSize={"2xl"} color={"white"}>
            {item.name}
          </Text>
        </HStack>
        <HStack gap={6}>
          <Icon className={"vegetablebutton"} color="white.500" size="xl">
            <FiPlus
              onClick={() =>
                navigate(recipePaths.insert.replace(":vegetableId", item.id!))
              }
            />
          </Icon>
          <Icon className={"vegetablebutton"} color="white.500" size="xl">
            <FiEdit onClick={() => onEdit(item)} />
          </Icon>
          <Icon className={"vegetablebutton"} color="red.500" size="xl">
            <FiTrash
              onClick={() => Api.deleteVegetable(item.id!).then(onReload)}
            />
          </Icon>
        </HStack>
      </HStack>
      <hr />
      {!item.recipes?.length ? (
        <Text color="gray.500" fontStyle={"italic"} padding={5}>
          Non ci sono ricette per questa verdura, aggiungine una!
        </Text>
      ) : (
        item.recipes!.map((recipe: Recipe, index: number) => (
          <div key={item.id! + recipe.id!}>
            <HStack padding={5} justifyContent={"space-between"}>
              <HStack justifyContent={"flex-start"}>
                <Icon size={"xl"} color={"gray.300"}>
                  <PiForkKnife />
                </Icon>
                <VStack gap={0} alignItems={"flex-start"}>
                  <Text key={recipe.id} fontSize={"large"} color={"gray.500"}>
                    {recipe.name}
                  </Text>
                  <Text fontSize={"small"} color={"gray.700"}>
                    {recipe.description
                      ? recipe.description.length > 50
                        ? recipe.description.substring(0, 50) + "..."
                        : recipe.description
                      : "..."}
                  </Text>
                </VStack>
              </HStack>
              <HStack gap={5} justifyContent={"flex-end"}>
                {recipe.extra && (
                  <Icon
                    size={"lg"}
                    color={"green.700"}
                    className="vegetablebutton"
                    onClick={() =>
                      navigate(
                        recipePaths.view.replace(":recipeId", recipe.id!),
                      )
                    }
                  >
                    <FaArrowRight />
                  </Icon>
                )}
                <Icon
                  size={"lg"}
                  color={"red.700"}
                  className="vegetablebutton"
                  onClick={() => deleteRecipe(recipe.id!)}
                >
                  <FiTrash />
                </Icon>
              </HStack>
            </HStack>
            {index !== item.recipes!.length - 1 && <hr />}
          </div>
        ))
      )}
    </Box>
  );
};

export default VegetableInfo;
