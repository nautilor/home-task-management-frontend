import { Api, Category, Task } from "@/components/Api";
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

const InsertTask = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [points, setPoints] = useState(1);
  const [frequency, setFrequency] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [onError, setOnError] = useState<string[]>([]); // list containing the fields with errors
  const [collection, setCollection] = useState<ListCollection<Category>>(
    createListCollection({ items: [] }),
  );

  const loadCategories = async () => {
    const response = await Api.getCategories();
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

  const onPointsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPoints = parseInt(e.target.value);
    setPoints(newPoints);
    if (newPoints < 1) {
      setOnError([...onError, "points"]);
    } else {
      setOnError(onError.filter((field: string) => field !== "points"));
    }
  };

  const onFrequencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFrequency = e.target.value;
    setFrequency(newFrequency);
    if (newFrequency === "") {
      setOnError([...onError, "frequency"]);
    } else {
      setOnError(onError.filter((field: string) => field !== "frequency"));
    }
  };

  const onCategoryChange = (e: SelectValueChangeDetails<Category>) => {
    const categoryId = e.value.find(() => true);
    const selectedCategory: Category = categories.find(
      (c) => c.id === categoryId,
    )!;
    setCategory(selectedCategory);
    console.log(selectedCategory);
  };

  const saveTask = async () => {
    if (!name) {
      setOnError([...onError, "name"]);
      return;
    }
    if (!points) {
      setOnError([...onError, "points"]);
      return;
    }
    if (!frequency) {
      setOnError([...onError, "frequency"]);
      return;
    }
    const task: Task = {
      name,
      points,
      frequency,
      category: category!,
    };
    try {
      await Api.addTask(task);
      navigate("/");
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
          placeholder="Nome del task"
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
          Punti {onError.includes("points") ? "(obbligatorio)" : ""}
        </Text>
        <NumberInput.Root style={{ width: "100%" }}>
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
          <NumberInput.Input
            min={1}
            value={points || ""}
            onChange={onPointsChange}
            placeholder="Punti"
          />
        </NumberInput.Root>
      </FieldRoot>
      <FieldRoot
        style={{ marginTop: "1rem" }}
        invalid={onError.includes("frequency")}
      >
        <Text
          color={onError.includes("frequency") ? "red" : "white"}
          fontWeight={"bold"}
        >
          Frequenza {onError.includes("frequency") ? "(obbligatorio)" : ""}
        </Text>
        <Input
          value={frequency}
          onChange={onFrequencyChange}
          placeholder="Frequenza del task"
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
        <Button onClick={saveTask} colorPalette="teal">
          <LuSave />
          Salva
        </Button>
      </div>
    </div>
  );
};

export default InsertTask;
