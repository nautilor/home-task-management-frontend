import { Api, FridgeCategory, FridgeItem } from "@/components/Api";
import { fridgePaths } from "@/components/Router";
import {
  Button,
  createListCollection,
  FieldRoot,
  Input,
  ListCollection,
  NumberInput,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueChangeDetails,
  SelectValueText,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { LuSave } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const InsertFridgeProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<FridgeCategory | null>(null);
  const [categories, setCategories] = useState<FridgeCategory[]>([]);
  const [onError, setOnError] = useState<string[]>([]); // list containing the fields with errors
  const [collection, setCollection] = useState<ListCollection<FridgeCategory>>(
    createListCollection({ items: [] }),
  );

  const loadCategories = async () => {
    const response = await Api.getFridgeCategories();
    setCategories(response);
    setCollection(
      createListCollection({
        items: response.map((c) => {
          return { label: c.name, value: c.id, ...c };
        }),
      }),
    );
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (newName === "") {
      setOnError([...onError, "name"]);
    } else {
      setOnError(onError.filter((field: string) => field !== "name"));
    }
  };

  const onQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPoints = parseInt(e.target.value);
    setQuantity(newPoints);
    if (newPoints < 1) {
      setOnError([...onError, "quantity"]);
    } else {
      setOnError(onError.filter((field: string) => field !== "quantity"));
    }
  };

  const onCategoryChange = (e: SelectValueChangeDetails<FridgeCategory>) => {
    const categoryId = e.value.find(() => true);
    const selectedCategory: FridgeCategory = categories.find(
      (c) => c.id === categoryId,
    )!;
    setCategory(selectedCategory);
  };

  const saveItem = async () => {
    if (!name) {
      setOnError([...onError, "name"]);
      return;
    }
    if (!quantity) {
      setOnError([...onError, "points"]);
      return;
    }
    const item: FridgeItem = {
      name,
      quantity,
      description,
      index: 0,
      category: category!,
    };
    try {
      await Api.addFridgeItem(item);
      navigate(fridgePaths.home);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <FieldRoot invalid={onError.includes("name")}>
        <Text
          color={onError.includes("name") ? "red" : "white"}
          fontWeight={"bold"}
        >
          Nome {onError.includes("name") ? "(obbligatorio)" : ""}
        </Text>
        <Input
          value={name}
          onChange={onNameChange}
          placeholder="Nome del prodotto"
        />
      </FieldRoot>
      <FieldRoot
        style={{ marginTop: "1rem" }}
        invalid={onError.includes("points")}
      >
        <Text
          color={onError.includes("points") ? "red" : "white"}
          fontWeight={"bold"}
        >
          Quantità {onError.includes("quantity") ? "(obbligatorio)" : ""}
        </Text>
        <NumberInput.Root style={{ width: "100%" }}>
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
          <NumberInput.Input
            min={1}
            value={quantity || ""}
            onChange={onQuantityChange}
            placeholder="Punti"
          />
        </NumberInput.Root>
      </FieldRoot>
      <FieldRoot
        style={{ marginTop: "1rem" }}
        invalid={onError.includes("frequency")}
      >
        <Text color={"white"} fontWeight={"bold"}>
          Descrizione
        </Text>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrizione del prodotto"
        />
      </FieldRoot>
      <SelectRoot
        style={{ marginTop: "1rem", alignItems: "flex-start" }}
        collection={collection}
        onValueChange={onCategoryChange}
      >
        <Text
          style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
          fontWeight={"semibold"}
        >
          Categoria
        </Text>
        <SelectTrigger>
          <SelectValueText placeholder="Seleziona una categoria" />
        </SelectTrigger>
        <SelectContent style={{ width: "100%" }}>
          {collection.items.map((category) => (
            <SelectItem key={category.id} item={category}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <div className="insert-save-button">
        <Button onClick={saveItem} colorPalette="teal">
          <LuSave />
          Salva
        </Button>
      </div>
    </div>
  );
};

export default InsertFridgeProduct;
