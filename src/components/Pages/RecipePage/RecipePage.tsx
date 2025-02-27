import { Api, Recipe, Vegetable } from "@/components/Api";
import Header from "@/components/Header/Header";
import { vegetablePaths } from "@/components/Router";
import { toaster } from "@/components/ui/toaster";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const loadRecipe = useCallback(async () => {
    if (!recipeId) {
      toaster.create({
        title: "Indicativo della ricetta non trovato",
        type: "error",
        duration: 1500,
      });
      return;
    }
    try {
      const recipe = await Api.getRecipe(recipeId);
      setRecipe(recipe);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Errore durante il caricamento della ricetta";
      toaster.create({
        title: message,
        type: "error",
        duration: 1500,
      });
    }
  }, [recipeId]);

  useEffect(() => {
    loadRecipe();
  }, [loadRecipe]);

  return (
    <div>
      <Header goBack={vegetablePaths.home} />
      {recipe && (
        <Stack borderRadius={8} borderWidth={"1.5px"} borderColor="gray.800">
          <HStack padding={5} justify="flex-start">
            <Text fontSize={"3xl"} fontWeight={"semibold"}>
              {recipe?.name}
            </Text>
          </HStack>
          <hr />
          <HStack padding={5} justify="flex-start">
            {recipe?.vegetables.map((vegetable: Vegetable, index: number) => (
              <>
                <Box
                  padding={2}
                  marginRight={2}
                  borderRadius={8}
                  borderWidth={"1.5px"}
                  borderColor={"gray.800"}
                  borderLeftWidth={"1em"}
                  borderLeftColor={"green.500"}
                >
                  <Text key={index} fontSize={"large"}>
                    {vegetable.name}
                  </Text>
                </Box>
              </>
            ))}
          </HStack>
          <hr />
          <HStack
            padding={5}
            justify="flex-start"
            textAlign={"start"}
            whiteSpace={"pre-line"}
          >
            <Text fontSize={"large"}>{recipe?.description}</Text>
          </HStack>
          <hr />
        </Stack>
      )}
    </div>
  );
};

export default RecipePage;
