import { VStack, Box, Text, HStack, Icon } from "@chakra-ui/react";
import { Api, FridgeItem } from "@/components/Api";
import "./FridgeInfo.scss";
import { FiEdit, FiMinusCircle, FiPlusCircle, FiTrash } from "react-icons/fi";
import { toaster } from "../ui/toaster";

interface FridgeInfoProps {
  item: FridgeItem;
  onReload: () => Promise<void>;
  onEdit: (item: FridgeItem) => void;
}

const FridgeInfo = (props: FridgeInfoProps) => {
  const { item, onReload, onEdit } = props;
  const onQuantityChange = async (value: number) => {
    if (item.quantity === 1 && value === -1) {
      return;
    }
    const quantity: number = item.quantity + value;
    item.quantity = quantity;
    await Api.updateFridgeItem(item);
    await onReload();
  };
  return (
    <Box padding="5">
      <HStack justify="space-between">
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"semibold"}>{item.name}</Text>
          <Text color="gray.500">{item.description || "-"}</Text>
        </VStack>
        <HStack gap={6}>
          <HStack gap={4}>
            <Icon color="white" size="xl">
              <FiMinusCircle
                size={25}
                onClick={() => onQuantityChange(-1)}
                color={item.quantity === 1 ? "gray" : "white"}
              />
            </Icon>
            <Text fontWeight={"semibold"}>{item.quantity}</Text>
            <Icon color="white" size="xl">
              <FiPlusCircle onClick={() => onQuantityChange(1)} />
            </Icon>
          </HStack>
          <Icon color="blue.500" size="xl">
            <FiEdit onClick={() => onEdit(item)} />
          </Icon>
          <Icon color="red.500" size="xl">
            <FiTrash
              onClick={() => Api.deleteFridgeItem(item.id!).then(onReload)}
            />
          </Icon>
        </HStack>
      </HStack>
    </Box>
  );
};

export default FridgeInfo;
