import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import "./FridgePage.scss";
import { useEffect, useState } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import Header from "@/components/Header/Header";
import { Api, FridgeItem } from "@/components/Api";
import { toaster } from "@/components/ui/toaster";
import FridgeInfo from "@/components/FridgeInfo/FridgeInfo";

const FridgePage = () => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [item, setItem] = useState<FridgeItem>();
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const items = await Api.getFridgeItems();
      setFridgeItems(items);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Errore durante il caricamento dei prodotti";
      toaster.create({
        title: message,
        type: "error",
      });
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setQuantity(1);
    setItem(undefined);
    setIsEditing(false);
  };
  const onIsEditingChange = (item: FridgeItem) => {
    setIsEditing(true);
    setName(item.name);
    setDescription(item.description);
    setItem(item);
    setQuantity(item.quantity);
  };

  const saveFridgeItem = async () => {
    const index: number = isEditing
      ? item!.index
      : fridgeItems
        ? fridgeItems.length
        : 0;
    const fridgeItem: FridgeItem = {
      id: item?.id,
      name,
      quantity,
      index,
      description,
    };

    try {
      if (!isEditing) {
        await Api.addFridgeItem(fridgeItem);
      } else {
        await Api.updateFridgeItem(fridgeItem);
      }
      await loadData();
      resetForm();
      setIsEditing(false);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Errore durante il salvataggio del prodotto";
      toaster.create({
        title: message,
        type: "error",
      });
    }
  };

  const onQuantityChange = (value: number) => {
    const newValue: number = quantity + value;
    if (newValue < 1) {
      setQuantity(1);
    } else {
      setQuantity(newValue);
    }
  };

  return (
    <div>
      <Header />
      <div className="fridge-container">
        <Box
          marginTop={5}
          borderColor="gray.800"
          borderWidth={1.5}
          padding={5}
          borderRadius={8}
          className="fridge-form"
        >
          <VStack>
            <HStack gap={7} width={"100%"}>
              <Input
                placeholder="Nome prodotto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <HStack gap={5}>
                <FiMinusCircle
                  size={25}
                  onClick={() => onQuantityChange(-1)}
                  color={quantity === 1 ? "gray" : "white"}
                />
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  {quantity}
                </Text>
                <FiPlusCircle size={25} onClick={() => onQuantityChange(1)} />
              </HStack>
            </HStack>
            <HStack gap={10} width={"100%"}>
              <Input
                placeholder="Descrizione"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                colorPalette={isEditing ? "purple" : "cyan"}
                onClick={saveFridgeItem}
              >
                {isEditing ? "Modifica" : "Aggiungi"}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </div>
      <Box
        marginTop={5}
        borderRadius={8}
        borderColor="gray.800"
        borderWidth={1.5}
        borderLeftWidth={"1em"}
        borderLeftColor={"blue.500"}
      >
        {!fridgeItems.length && (
          <Text color="gray.500" fontStyle={"italic"} padding={5}>
            Non ci sono prodotti in frigo, aggiungine uno!
          </Text>
        )}
        {fridgeItems.map((item, index) => (
          <>
            <FridgeInfo
              key={item.index}
              item={item}
              onEdit={onIsEditingChange}
              onReload={loadData}
            />
            {index !== fridgeItems.length - 1 && <hr />}
          </>
        ))}
      </Box>
    </div>
  );
};

export default FridgePage;
