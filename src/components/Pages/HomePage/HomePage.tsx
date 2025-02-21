import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import { elementPaths, fridgePaths, householdPaths } from "@/components/Router";
import { FaHouseUser } from "react-icons/fa6";
import { FaSnowflake } from "react-icons/fa";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { Api, CustomElement } from "@/components/Api";
import { HiOutlinePlusCircle } from "react-icons/hi2";

const HomePage = () => {
  const navigate = useNavigate();

  const [elements, setElements] = useState<CustomElement[]>([]);

  const loadCustomElements = async () => {
    const data: CustomElement[] = await Api.getCustomElements();
    setElements(data);
  };

  useEffect(() => {
    loadCustomElements();
  }, []);

  return (
    <div>
      <Header />
      <Box gapY={10} className="home-page-container">
        <HStack
          justifyContent="center"
          alignItems="center"
          wrap={"wrap"}
          flexDirection={"row"}
        >
          <Box
            bgGradient="to-br"
            gradientFrom="pink.700"
            gradientTo="pink.100"
            className="home-function-button"
            onClick={() => navigate(householdPaths.home)}
          >
            <Icon color="black" fontSize={100}>
              <FaHouseUser />
            </Icon>
          </Box>
          <Box
            bgGradient="to-tl"
            gradientFrom="blue.700"
            gradientTo="blue.100"
            className="home-function-button"
            onClick={() => navigate(fridgePaths.home)}
          >
            <Icon color="black" fontSize={100}>
              <FaSnowflake />
            </Icon>
          </Box>
        </HStack>
        <Box
          borderRadius={8}
          padding={4}
          borderColor="gray.800"
          borderWidth={1.5}
          width={"50em"}
        >
          {elements.length > 0 && (
            <HStack
              justifyContent={"center"}
              alignItems={"center"}
              wrap={"wrap"}
              flexDirection={"row"}
              marginBottom={4}
            >
              {elements.map((element) => (
                <Box
                  position="relative"
                  className="home-function-custom-button"
                  onClick={() => window.open(element.action, "_blank")}
                  borderRadius={8}
                  borderColor="gray.800"
                  borderWidth={1.5}
                  borderLeftWidth={"1em"}
                  borderLeftColor={element.color}
                >
                  <Text color="white" fontSize={"l"} fontWeight={"semibold"}>
                    {element.name}
                  </Text>
                </Box>
              ))}
            </HStack>
          )}
          <Box
            className="add-custom-element"
            onClick={() => navigate(elementPaths.insert)}
          >
            <Icon fontSize={40} color="whiteAlpha.300">
              <HiOutlinePlusCircle size={40} />
            </Icon>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
