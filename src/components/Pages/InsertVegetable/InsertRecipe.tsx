import { Api, Vegetable, Recipe } from "@/components/Api";
import { vegetablePaths } from "@/components/Router";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Button,
  createListCollection,
  FieldRoot,
  Input,
  ListCollection,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { LuSave } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

interface InsertRecipeProps {
  vegetable?: Vegetable;
}

const InsertRecipe = (props: InsertRecipeProps) => {
  const { vegetable } = props;
  const navigate = useNavigate();
  const [name, setName] = useState(vegetable?.name || "");
  const [vegetables, setVegetables] = useState<Vegetable[] | null>([]);
  const [description, setDescription] = useState("");
  const [extra, setExtra] = useState(false);
  const [selected, setSelected] = useState<Vegetable[]>([]);
  const [onError, setOnError] = useState<string[]>([]); // list containing the fields with errors
  const [collection, setCollection] = useState<ListCollection<Vegetable>>(
    createListCollection({ items: [] }),
  );

  const loadVegetables = useCallback(async () => {
    const response = await Api.getVegetables();
    setVegetables(response);
    setCollection(
      createListCollection({
        items: response.map((c) => {
          return { label: c.name, value: c.id, ...c };
        }),
      }),
    );
    if (vegetable) {
      setSelected([vegetable]);
    }
  }, [vegetable]);

  useEffect(() => {
    loadVegetables();
  }, [loadVegetables]);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (newName === "") {
      setOnError([...onError, "name"]);
    } else {
      setOnError(onError.filter((field: string) => field !== "name"));
    }
  };

  const saveTask = async () => {
    if (!name) {
      setOnError([...onError, "name"]);
      return;
    }
    if (!selected) {
      setOnError([...onError, "vegetables"]);
    }
    const recipe: Recipe = {
      name,
      description,
      extra,
      vegetables: selected!,
    };
    try {
      await Api.addRecipe(recipe);
      navigate(vegetablePaths.home);
    } catch (e) {
      console.error(e);
    }
  };

  const onVegetableChange = (values: Vegetable[]) => {
    setSelected(values);
    if (values.length > 0) {
      setOnError(onError.filter((field: string) => field !== "vegetables"));
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
          placeholder="Nome della ricetta"
        />
      </FieldRoot>
      {vegetables && (
        <SelectRoot
          multiple
          style={{ marginTop: "1rem", alignItems: "flex-start" }}
          collection={collection}
          value={selected.map((s) => s.id!)}
          onValueChange={(e) => onVegetableChange(e.items)}
        >
          <Text
            style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
            fontWeight={"semibold"}
          >
            Verdure
          </Text>
          <SelectTrigger>
            <SelectValueText placeholder="Seleziona le verdure" />
          </SelectTrigger>
          <SelectContent style={{ width: "100%" }}>
            {collection.items.map((category) => (
              <SelectItem key={category.id} item={category}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      )}
      <FieldRoot style={{ marginTop: "1rem", alignItems: "flex-start" }}>
        <Text aria-multiline color={"white"} fontWeight={"bold"}>
          Descrizione
        </Text>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrizione"
        />
      </FieldRoot>
      <FieldRoot
        style={{
          marginTop: "1rem",
          borderRadius: "8px",
          borderColor: "gray.800",
          padding: "1em",
          width: "fit-content",
          alignItems: "flex-start",
        }}
      >
        <Checkbox
          checked={extra}
          colorPalette={"teal"}
          onCheckedChange={(e) => setExtra(!!e.checked)}
        >
          Schermata extra per la ricetta
        </Checkbox>
      </FieldRoot>

      <div className="insert-save-button">
        <Button onClick={saveTask} colorPalette="teal">
          <LuSave />
          Salva
        </Button>
      </div>
    </div>
  );
};

export default InsertRecipe;
