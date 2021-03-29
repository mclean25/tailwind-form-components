import React, { useEffect, useRef, useState } from "react";
import SelectMenuItem from "./SelectMenuItems";
import { ReactComponent as ChevronDown } from "../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../assets/icons/chevron-up.svg";

interface SelectChoice {
  display: string;
  id: string;
}

interface MultiSelectMenuProps {
  choices: SelectChoice[];
}

const MultiSelectMenu: React.FC<MultiSelectMenuProps> = ({ choices }) => {
  const [selectedChoices, setSelectedChoices] = useState<SelectChoice[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const selectMenuNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (
        !(selectMenuNode.current as HTMLDivElement).contains(
          event.target as Node
        )
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [selectMenuNode]);

  const choiceIsSelected = (choice: SelectChoice): boolean => {
    return (
      selectedChoices.filter((selected) => selected.id === choice.id).length > 0
    );
  };

  const onSelectChoice = (selectedChoice: SelectChoice) => {
    console.log(`selected choices before: ${selectedChoices}`);
    if (choiceIsSelected(selectedChoice)) {
      setSelectedChoices((selectedChoices) =>
        selectedChoices.filter((choice) => choice !== selectedChoice)
      );
    } else {
      setSelectedChoices((selectedChoices) => [
        ...selectedChoices,
        selectedChoice,
      ]);
    }
    console.log(`selected choices after: ${selectedChoices}`);
  };

  const selectMenuItems = choices.map((value) => {
    if (value.id === "figma") {
      console.log(`Figman is selected: ${choiceIsSelected(value)}`);
    }
    return (
      <SelectMenuItem
        choice={{ display: value.display, id: value.id }}
        onSelectChoice={onSelectChoice}
        isSelected={choiceIsSelected(value)}
        key={value.id}
      />
    );
  });

  const focusStyles =
    "focus:outline-none focus:border-primary focus:ring-2 focus:ring-secondary";

  console.log("Render");

  return (
    <div ref={selectMenuNode}>
      <label
        id="listbox-label"
        className="block text-sm font-medium text-gray-700"
      >
        Multi-Select
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          className={`bg-white relative w-full border border-gray rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer ${focusStyles} sm:text-sm`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="block truncate">
            {selectedChoices.length > 0
              ? selectedChoices.length
              : "Select one..."}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {showDropdown ? <ChevronDown /> : <ChevronUp />}
          </span>
        </button>
        {showDropdown && (
          <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg">
            <ul
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              {selectMenuItems}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectMenu;
