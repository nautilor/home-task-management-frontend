import { VStack, Box, Text, HStack, Icon, List } from "@chakra-ui/react";
import { Api, Recipe, Vegetable } from "@/components/Api";
import "./VegetableInfo.scss";
import { FiArrowRightCircle, FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { recipePaths } from "../Router";
import { FaArrowRight, FaCircleDot } from "react-icons/fa6";
import { PiForkKnife } from "react-icons/pi";
import {
  FaAngleDoubleRight,
  FaArrowCircleLeft,
  FaArrowCircleRight,
} from "react-icons/fa";

interface VegetableInfoProps {
  item: Vegetable;
  onReload: () => Promise<void>;
  onEdit: (item: Vegetable) => void;
}

const VegetableInfo = (props: VegetableInfoProps) => {
  const { item, onReload, onEdit } = props;

  const navigate = useNavigate();

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
          <>
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
                    {recipe.description && recipe.description.length > 50
                      ? recipe.description.substring(0, 50) + "..."
                      : recipe.description}
                  </Text>
                </VStack>
              </HStack>
              {recipe.extra && (
                <HStack justifyContent={"flex-end"}>
                  <Icon
                    size={"xl"}
                    color={"green.500"}
                    className="vegetablebutton"
                    onClick={() =>
                      navigate(
                        recipePaths.view.replace(":recipeId", recipe.id!),
                      )
                    }
                  >
                    <FaArrowRight />
                  </Icon>
                </HStack>
              )}
            </HStack>
            {index !== item.recipes!.length - 1 && <hr />}
          </>
        ))
      )}
    </Box>
  );
};

export default VegetableInfo;
