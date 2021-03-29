import React from "react";
import { SelectChoice } from "./SelectMenu";

interface SelectMenuItemProps {
  choice: SelectChoice;
  isSelected?: boolean;
  onSelectChoice: (choice: SelectChoice) => void;
}

const SelectMenuItem: React.FC<SelectMenuItemProps> = ({
  choice,
  isSelected = false,
  onSelectChoice,
}) => {
  const defaultClass =
    "hover:bg-tertiary text-gray-900 hover:text-primary rounded-lg cursor-default select-none relative py-1 my-1 pl-2 ml-2 pr-9 mr-2";

  const selectedClass =
    "bg-tertiary text-primary rounded-lg cursor-default select-none relative py-1 my-1 pl-2 ml-2 pr-9 mr-2";
  return (
    <li
      id={choice.id}
      key={choice.id}
      className={isSelected ? selectedClass : defaultClass}
    >
      <span
        className="font-normal block truncate"
        onClick={() => onSelectChoice(choice)}
      >
        {choice.display}
      </span>
    </li>
  );
};

export default SelectMenuItem;
