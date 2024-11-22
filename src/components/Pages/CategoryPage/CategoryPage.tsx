import { Api, Category } from "@/components/Api";
import CategoryInfo from "@/components/CategoryInfo/CategoryInfo";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import "./CategoryPage.scss";
import { LuPlusCircle } from "react-icons/lu";
import { Icon } from "@chakra-ui/react";

const CategoryPage = () => {
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
        <div className="add-category-container">
          <Icon fontSize={50} color="whiteAlpha.300">
            <LuPlusCircle size={50} />
          </Icon>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
