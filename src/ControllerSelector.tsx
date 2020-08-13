import React from 'react';
import { Input } from 'webmidi';

interface ControllerSelectorProps {
  midiControllers: Input[];
  onSelectController: (selectedController: Input) => void;
  selectedController: Input | null;
}

const ControllerSelector: React.FC<ControllerSelectorProps> = ({
  midiControllers,
  onSelectController,
  selectedController
}) => {
  return (
    <select
      onChange={(e) =>
        onSelectController(
          midiControllers.find((controller) => controller.id === e.target.value)
        )
      }
      value={selectedController?.id}
    >
      {midiControllers.map((controller) => (
        <option key={controller.id} value={controller.id}>
          {controller.name}
        </option>
      ))}
    </select>
  );
};

export default ControllerSelector;
