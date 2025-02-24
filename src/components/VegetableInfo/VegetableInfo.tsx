import { VStack, Box, Text, HStack, Icon } from "@chakra-ui/react";
import { Api, Vegetable } from "@/components/Api";
import "./VegetableInfo.scss";
import { FiArrowRightCircle, FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { recipePaths } from "../Router";

interface VegetableInfoProps {
  item: Vegetable;
  onReload: () => Promise<void>;
  onEdit: (item: Vegetable) => void;
}

const VegetableInfo = (props: VegetableInfoProps) => {
  const { item, onReload, onEdit } = props;
  const navigate = useNavigate();

  return (
    <Box padding="5" backgroundColor={"black"}>
      <HStack justify="space-between">
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"semibold"} color={"gray.500"}>
            {item.name}
          </Text>
        </VStack>
        <HStack gap={6}>
          <Icon className="vegetablebutton" color="green.500" size="xl">
            <FiArrowRightCircle
              onClick={() =>
                navigate(
                  recipePaths.vegetable.replace(":vegetableId", item.id!),
                )
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
    </Box>
  );
};

export default VegetableInfo;
