import { Box, HStack, Icon } from "@chakra-ui/react";
import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import { householdPaths } from "@/components/Router";
import { FaHouseUser } from "react-icons/fa6";
import { FaSnowflake } from "react-icons/fa";
import { toaster } from "@/components/ui/toaster";
import Header from "@/components/Header/Header";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Box className="home-page-container">
        <HStack justifyContent="center" alignItems="center">
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
            onClick={() => {
              toaster.create({
                title: "Funzione non ancora implementata",
                type: "warning",
              });
            }}
          >
            <Icon color="black" fontSize={100}>
              <FaSnowflake />
            </Icon>
          </Box>
        </HStack>
      </Box>
    </div>
  );
};

export default HomePage;
