import { Api, Category } from "@/components/Api";
import CategoryInfo from "@/components/CategoryInfo/CategoryInfo";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import { Box, Icon, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./CategoryPage.scss";

const CategoryPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  const loadData = async () => {
    const categories = await Api.getCategories();
    setCategories(categories);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Header hideAddButton={true} />
      <div className="categories-list">
        {categories.map((category) => (
          <CategoryInfo key={category.id} category={category} />
        ))}
        <Box
          bgGradient="to-r"
          gradientFrom="teal.800"
          gradientTo="teal.700"
          className="view-all-category-container"
          onClick={() => navigate("/category/")}
        >
          <Text fontSize="2xl" fontWeight={"semibold"} color="whiteAlpha.700">
            Tutte
          </Text>
        </Box>
        <div
          className="add-category-container"
          onClick={() => navigate("/insert")}
        >
          <Icon fontSize={50} color="whiteAlpha.300">
            <LuPlusCircle size={50} />
          </Icon>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
