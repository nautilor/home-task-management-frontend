import { VStack, Box, Text, HStack, Icon } from "@chakra-ui/react";
import { Api, FridgeItem } from "@/components/Api";
import "./FridgeInfo.scss";
import { FiEdit, FiMinusCircle, FiPlusCircle, FiTrash } from "react-icons/fi";

interface FridgeInfoProps {
  item: FridgeItem;
  onReload: () => Promise<void>;
  onEdit: (item: FridgeItem) => void;
}

const FridgeInfo = (props: FridgeInfoProps) => {
  const { item, onReload, onEdit } = props;
  const onQuantityChange = async (value: number) => {
    if (item.quantity === 0 && value === -1) {
      return;
    }
    const quantity: number = item.quantity + value;
    item.quantity = quantity;
    await Api.updateFridgeItem(item);
    await onReload();
  };

  const backgroundColor = item.quantity === 0 ? "gray.900" : "black";
  const mainTextColor = item.quantity === 0 ? "gray.500" : "white";
  const descriptionColor = item.quantity === 0 ? "gray.700" : "gray.500";
  const minusColor = item.quantity === 0 ? "gray" : "white";

  return (
    <Box padding="5" backgroundColor={backgroundColor}>
      <HStack justify="space-between">
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"semibold"} color={mainTextColor}>
            {item.name}
          </Text>
          <Text color={descriptionColor}>{item.description || "-"}</Text>
        </VStack>
        <HStack gap={6}>
          <HStack gap={4}>
            <Icon color={minusColor} size="xl">
              <FiMinusCircle size={25} onClick={() => onQuantityChange(-1)} />
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
