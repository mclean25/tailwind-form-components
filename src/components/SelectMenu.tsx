import React, { useEffect, useRef, useState } from "react";
import SelectMenuItem from "./SelectMenuItems";
import { ReactComponent as ChevronDown } from "../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../assets/icons/chevron-up.svg";

export interface SelectChoice {
  display: string;
  id: string;
}

interface SelectMenuProps {
  choices: SelectChoice[];
}

const SelectMenu: React.FC<SelectMenuProps> = ({ choices }) => {
  const [selectedChoice, setSelectedChoice] = useState<
    SelectChoice | undefined
  >(undefined);
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

  const onSelectChoice = (selectedChoice: SelectChoice) => {
    setSelectedChoice(selectedChoice);
    setShowDropdown(false);
  };

  const selectMenuItems = choices.map((value) => {
    return (
      <SelectMenuItem
        choice={{ display: value.display, id: value.id }}
        onSelectChoice={onSelectChoice}
      />
    );
  });

  const focusStyles =
    "focus:outline-none focus:border-primary focus:ring-2 focus:ring-secondary";

  return (
    <div ref={selectMenuNode}>
      <label
        id="listbox-label"
        className="block text-sm font-medium text-gray-700"
      >
        Single Select
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
            {selectedChoice ? selectedChoice.display : "Select one..."}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {showDropdown ? <ChevronDown /> : <ChevronUp />}
          </span>
        </button>
        {showDropdown && (
          <div className="absolute mt-2 z-50 w-full rounded-md bg-white shadow-lg">
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

export default SelectMenu;
