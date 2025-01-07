import { Api, Reward } from "@/components/Api";
import { householdPaths } from "@/components/Router";
import { toaster } from "@/components/ui/toaster";
import { Button, FieldRoot, Input, Text, NumberInput } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { LuSave } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const InsertReward = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [points, setPoints] = useState(1);
  const [color, setColor] = useState("#B28DFF");
  const [onError, setOnError] = useState<string[]>([]); // list containing the fields with errors

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

  const saveReward = async () => {
    if (!name) {
      setOnError([...onError, "name"]);
      return;
    }
    if (!points) {
      setOnError([...onError, "points"]);
    }
    try {
      const reward: Reward = {
        name,
        color,
        points,
        rewarded: [],
      };
      await Api.addReward(reward);
      navigate(householdPaths.home);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Errore durante il salvataggio";
      toaster.create({
        title: message,
        type: "error",
      });
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
          placeholder="Nome della categoria"
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
      <FieldRoot style={{ marginTop: "1rem" }}>
        <Text fontWeight={"bold"}>Colore</Text>
        <Input
          className="input-color"
          variant={"flushed"}
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Inserisci il colore della categoria"
        />
      </FieldRoot>
      <div className="insert-save-button">
        <Button onClick={saveReward} colorPalette="teal">
          <LuSave />
          Salva
        </Button>
      </div>
    </div>
  );
};

export default InsertReward;
