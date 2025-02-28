import { VegetableParams } from "@/components/Api";
import { Box, Button, FieldRoot, HStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

interface VegetableFilterProps {
  onSubmit: (params: VegetableParams) => Promise<void>;
}

const VegetableFilter = (props: VegetableFilterProps) => {
  const { onSubmit } = props;
  const [name, setName] = useState("");
  const [recipe, setRecipe] = useState("");

  const onFilter = async () => {
    const params: VegetableParams = {
      name: name,
      recipeName: recipe,
    };
    await onSubmit(params);
  };

  return (
    <Box
      borderRadius={"8px"}
      margin={5}
      padding={5}
      borderWidth={"1.5px"}
      borderColor={"gray.800"}
    >
      <HStack>
        <FieldRoot>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome della Verdura"
          />
        </FieldRoot>
        <FieldRoot>
          <Input
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            placeholder="Nome della Ricetta"
          />
        </FieldRoot>
        <Button size={"sm"} colorPalette={"teal"} onClick={onFilter}>
          Filtra
        </Button>
      </HStack>
    </Box>
  );
};

export default VegetableFilter;
