import { Api, Vegetable } from "@/components/Api";
import Header from "@/components/Header/Header";
import { genericPaths } from "@/components/Router";
import VegetableInfo from "@/components/VegetableInfo/VegetableInfo";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const VegetablePage = () => {
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);

  const loadVegetables = async () => {
    const data: Vegetable[] = await Api.getVegetables();
    setVegetables(data);
  };

  useEffect(() => {
    loadVegetables();
  }, []);

  return (
    <div>
      <Header goBack={genericPaths.home} />
      <Box
        marginTop={5}
        borderRadius={8}
        borderColor="gray.800"
        borderWidth={1.5}
        borderLeftWidth={"1em"}
        borderLeftColor={"green.500"}
      >
        <Box padding={5} backgroundColor={"black"} justifyContent={"center"}>
          <Text fontSize={"xl"} fontWeight={"semibold"}>
            Verdure
          </Text>
        </Box>
        <hr />
        {!vegetables?.length && (
          <Text color="gray.500" fontStyle={"italic"} padding={5}>
            Non ci sono verdure in frigo, aggiungine una!
          </Text>
        )}

        {vegetables.map((vegetable, index) => (
          <>
            <VegetableInfo
              key={vegetable.id}
              item={vegetable}
              onReload={loadVegetables}
              onEdit={() => {}}
            />
            {index !== vegetables!.length - 1 && <hr />}
          </>
        ))}
      </Box>
    </div>
  );
};

export default VegetablePage;
