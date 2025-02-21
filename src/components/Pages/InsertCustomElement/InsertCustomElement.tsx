import { Api, CustomElement } from "@/components/Api";
import Header from "@/components/Header/Header";
import { genericPaths } from "@/components/Router";
import { toaster } from "@/components/ui/toaster";
import { FieldRoot, Input, Text, Box, Button } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { LuSave } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const InsertCustomElement = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#B28DFF");
  const [nameError, setNameError] = useState(false);
  const [action, setAction] = useState("");
  const [actionError, setActionError] = useState(false);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setNameError(newName === "");
  };

  const onActionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newAction = e.target.value;
    setAction(newAction);
    setActionError(newAction === "");
  };

  const onSave = async () => {
    if (!name || !action) {
      setNameError(!name);
      setActionError(!action);
      return;
    }
    try {
      await Api.addCustomElement({ name, color, action } as CustomElement);
      navigate(genericPaths.home);
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
      <Header goBack={genericPaths.home} />
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        Inserisci un nuovo elemento personalizzato
      </Text>
      <Box marginTop={10}>
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
        <FieldRoot marginTop={"1em"}>
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

        <FieldRoot marginTop={"1em"} invalid={actionError}>
          <Text color={actionError ? "red" : "white"} fontWeight={"bold"}>
            Azione {actionError ? "(obbligatorio)" : ""}
          </Text>
          <Input
            value={action}
            onChange={onActionChange}
            placeholder="Azione"
          />
        </FieldRoot>
        <Box display={"flex"} justifyContent={"flex-end"} marginTop={"2em"}>
          <Button onClick={onSave} colorPalette="teal">
            <LuSave />
            Salva
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default InsertCustomElement;
