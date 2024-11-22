import { Text } from "@chakra-ui/react";
import { Category } from "../Api";
import "./CategoryInfo.scss";

interface CategoryInfoProps {
  category: Category;
}

const CategoryInfo = (props: CategoryInfoProps) => {
  const { category } = props;
  return (
    <div
      onClick={() => console.log(`Category ${category.name} clicked`)}
      className="category-container"
      style={{ backgroundColor: category.color.concat("AA") }}
    >
      <Text
        fontSize={"2xl"}
        fontWeight={"semibold"}
        style={{ color: category.color }}
      >
        {category.name}
      </Text>
    </div>
  );
};

export default CategoryInfo;
