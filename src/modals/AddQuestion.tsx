import React, { FC, useState } from "react";
import { Group, SegmentedControl, Title } from "@mantine/core";
import { Game } from "@/types/game";
import { Week } from "@/types/week";
import { GameNormal, JsonForm } from "@/views";
import { ModalBase } from "@/components/Wrappers";

interface AddQuestionProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGame: Game;
  selectedWeek: Week;
}

export interface FormProps {
  onClose: () => void;
  selectedGame: Game;
  selectedWeek: Week;
}

const AddQuestion: FC<AddQuestionProps> = (props) => {
  const { isOpen, onClose, selectedWeek, selectedGame } = props;

  const [editType, setEditType] = useState("normal");

  const isNormal = editType === "normal";

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Legg til spørsmål">
      <Group position="apart" mt="sm">
        <Title order={3}>Legg til spørsmål</Title>
        <SegmentedControl
          data={[
            {
              label: "Normal",
              value: "normal"
            },
            {
              label: "JSON",
              value: "json"
            }
          ]}
          value={editType}
          onChange={setEditType}
        />
      </Group>
      {isNormal ? (
        <GameNormal
          onClose={onClose}
          selectedGame={selectedGame}
          selectedWeek={selectedWeek}
        />
      ) : (
        <JsonForm
          selectedWeek={selectedWeek}
          selectedGame={selectedGame}
          onClose={onClose}
        />
      )}
    </ModalBase>
  );
};

export default AddQuestion;
