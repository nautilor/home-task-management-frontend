import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import "./FridgePage.scss";
import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import { Api, FridgeCategory, FridgeItem } from "@/components/Api";
import { toaster } from "@/components/ui/toaster";
import FridgeInfo from "@/components/FridgeInfo/FridgeInfo";
import { useNavigate } from "react-router-dom";
import { fridgePaths } from "@/components/Router";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { RiCloseLine } from "react-icons/ri";

const FridgePage = () => {
  const [fridgeCategories, setFridgeCategories] = useState<FridgeCategory[]>(
    [],
  );
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const categories: FridgeCategory[] = await Api.getFridgeCategories();
      setFridgeCategories(categories);
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

  const onEdit = (item: FridgeItem) => {
    console.log("IMPLEMENT ME", item);
  };

  const onCategoryDelete = async (categoryId: string) => {
    try {
      await Api.deleteFridgeCategory(categoryId);
      toaster.create({
        title: "Categoria eliminata",
        type: "success",
      });
      loadData();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Errore durante l'eliminazione della categoria";
      toaster.create({
        title: message,
        type: "error",
      });
    }
  };

  return (
    <div>
      <Header goBack={true} />
      {fridgeCategories?.map((category) => (
        <Box
          marginTop={5}
          borderRadius={8}
          borderColor="gray.800"
          borderWidth={1.5}
          borderLeftWidth={"1em"}
          borderLeftColor={category.color}
        >
          <Box padding={5} backgroundColor={"black"}>
            <HStack width={"100%"} justify="space-between">
              <HStack justifyContent={"flex-start"} />
              <HStack justifyContent={"center"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  {category.name}
                </Text>
              </HStack>
              <HStack justifyContent={"flex-end"}>
                <Icon
                  onClick={() => onCategoryDelete(category.id!)}
                  className="fridge-category-delete"
                  color="white"
                  fontSize={25}
                >
                  <RiCloseLine size={25} />
                </Icon>
              </HStack>
            </HStack>
          </Box>
          <hr />
          {!category.items?.length && (
            <Text color="gray.500" fontStyle={"italic"} padding={5}>
              Non ci sono prodotti in frigo, aggiungine uno!
            </Text>
          )}
          {category.items?.map((item, index) => (
            <>
              <FridgeInfo
                key={item.index}
                item={item}
                onReload={loadData}
                onEdit={onEdit}
              />
              {index !== category.items!.length - 1 && <hr />}
            </>
          ))}
        </Box>
      ))}
      <Box className="add-fridge" onClick={() => navigate(fridgePaths.insert)}>
        <Icon fontSize={50} color="whiteAlpha.300">
          <HiOutlinePlusCircle size={50} />
        </Icon>
      </Box>
    </div>
  );
};

export default FridgePage;
