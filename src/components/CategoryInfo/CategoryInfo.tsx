import { Box, Text } from "@chakra-ui/react";
import { Category } from "../Api";
import "./CategoryInfo.scss";
import { useNavigate } from "react-router-dom";

interface CategoryInfoProps {
  category: Category;
}

const CategoryInfo = (props: CategoryInfoProps) => {
  const { category } = props;
  const navigate = useNavigate();
  return (
    <Box
      bgGradient="to-r"
      gradientFrom={category.color.concat("11")}
      gradientTo={category.color.concat("AA")}
      onClick={() => navigate(`/category/${category.id}`)}
      className="category-container"
      style={{ backgroundColor: category.color.concat("AA") }}
    >
      <Text fontSize={"2xl"} fontWeight={"semibold"} color="whiteAlpha.700">
        {category.name}
      </Text>
    </Box>
  );
};

export default CategoryInfo;
