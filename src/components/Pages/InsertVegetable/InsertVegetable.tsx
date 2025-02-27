import { Api } from "@/components/Api";
import { vegetablePaths } from "@/components/Router";
import { toaster } from "@/components/ui/toaster";
import { Button, FieldRoot, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { LuSave } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const InsertVegetable = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
    try {
      await Api.addVegetable({ name });
      navigate(vegetablePaths.home);
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
      <FieldRoot invalid={nameError}>
        <Text color={nameError ? "red" : "white"} fontWeight={"bold"}>
          Nome {nameError ? "(obbligatorio)" : ""}
        </Text>
        <Input
          value={name}
          onChange={onNameChange}
          placeholder="Nome della Verdura"
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

export default InsertVegetable;
