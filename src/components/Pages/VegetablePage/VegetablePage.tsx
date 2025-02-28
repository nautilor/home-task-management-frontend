import { Api, Vegetable, VegetableParams } from "@/components/Api";
import Header from "@/components/Header/Header";
import { genericPaths, vegetablePaths } from "@/components/Router";
import VegetableInfo from "@/components/VegetableInfo/VegetableInfo";
import { Box, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import "./VegetablePage.scss";
import VegetableFilter from "./VegetableFilter";

const VegetablePage = () => {
  const navigate = useNavigate();
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);

  const loadVegetables = async (params?: VegetableParams) => {
    const data: Vegetable[] = await Api.getVegetables(params);
    setVegetables(data);
  };

  useEffect(() => {
    loadVegetables();
  }, []);

  return (
    <div>
      <Header goBack={genericPaths.home} />
      <VegetableFilter onSubmit={loadVegetables} />
      <Box>
        {!vegetables?.length && (
          <Text color="gray.500" fontStyle={"italic"} padding={5}>
            Non ci sono verdure in frigo, aggiungine una!
          </Text>
        )}

        {vegetables.map((vegetable) => (
          <div key={vegetable.id}>
            <VegetableInfo
              key={vegetable.id}
              item={vegetable}
              onReload={loadVegetables}
              onEdit={() => console.log("Implement edit for vegetable")}
            />
          </div>
        ))}
        <Box
          className="add-vegetable"
          onClick={() => navigate(vegetablePaths.insert)}
        >
          <Icon fontSize={50} color="whiteAlpha.300">
            <HiOutlinePlusCircle size={50} />
          </Icon>
        </Box>
      </Box>
    </div>
  );
};

export default VegetablePage;
