import React, { useEffect, useRef, useState } from "react";
import SelectMenuItem from "./SelectMenuItems";

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
            {showDropdown ? (
              <svg
                className="-mr-1 ml-2 h-5 w-5 fill-current text-text"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="-mr-1 ml-2 h-5 w-5 fill-current text-text"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
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

export default SelectMenu;
