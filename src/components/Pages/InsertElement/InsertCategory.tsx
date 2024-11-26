import { Api } from "@/components/Api";
import { Button, FieldRoot, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { LuSave } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const InsertCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#B28DFF");
  const [nameError, setNameError] = useState(false);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setNameError(newName === "");
  };

  const saveCategory = async () => {
    if (!name) {
      setNameError(true);
      return;
    }
    await Api.addCategory({ name, color });
    navigate("/");
  };

  return (
    <div>
      <FieldRoot invalid={nameError}>
        <Text color={nameError ? "red" : "white"} fontWeight={"bold"}>
          Nome {nameError ? "(obbligatorio)" : ""}
        </Text>
        <Input
          value={name}
          onChange={onNameChange}
          placeholder="Nome della categoria"
        />
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
        <Button onClick={saveCategory} colorPalette="teal">
          <LuSave />
          Salva
        </Button>
      </div>
    </div>
  );
};

export default InsertCategory;
