import React, { useState } from "react";
import { Group, SegmentedControl } from "@mantine/core";
import { Game, Week } from "@app/types";
import { GameNormal, JsonForm } from "@app/views";
import { ModalBase } from "@app/components";

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

const AddQuestion = (props: AddQuestionProps): JSX.Element => {
  const { isOpen, onClose, selectedWeek, selectedGame } = props;

  const [editType, setEditType] = useState("normal");

  const isNormal = editType === "normal";

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Legg til spørsmål">
      <Group position="right" mt="sm">
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
