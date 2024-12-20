import { Api, Category } from "@/components/Api";
import CategoryInfo from "@/components/CategoryInfo/CategoryInfo";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi2";
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
      <Header hideRewards={false} />

      <div className="categories-list">
        {categories.map((category) => (
          <CategoryInfo key={category.id} category={category} />
        ))}
        {categories.length > 1 && (
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
        )}
        <div
          className="add-category-container"
          onClick={() => navigate("/insert")}
        >
          <Icon fontSize={50} color="whiteAlpha.300">
            <HiOutlinePlusCircle size={50} />
          </Icon>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
