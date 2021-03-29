import React, { useEffect, useRef, useState } from "react";
import SelectMenuItem from "./SelectMenuItems";
import { ReactComponent as ChevronDown } from "../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../assets/icons/chevron-up.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";

interface SelectChoice {
  display: string;
  id: string;
}

interface MultiSelectMenuProps {
  choices: SelectChoice[];
}

interface BadgeProps {
  choice: SelectChoice;
}
const Badge: React.FC<BadgeProps> = ({ choice }) => {
  return (
    <span className="inline-flex rounded-full items-center mr-1 mb-1 py-0.5 pl-2.5 pr-1 text-sm font-medium bg-tertiary text-primary">
      {choice.display}
      <button
        type="button"
        className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
      >
        <svg
          className="h-2 w-2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 8 8"
        >
          <path
            stroke-linecap="round"
            stroke-width="1.5"
            d="M1 1l6 6m0-6L1 7"
          />
        </svg>
      </button>
    </span>
  );
};

export const Search: React.FC = () => {
  return (
    <div className="max-w-lg w-full lg:max-w-xs">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full pl-10 pr-3 py-2 bg-tertiary rounded-md leading-5 text-gray placeholder-gray-400 focus:outline-none focus:border-white focus:ring-secondary focus:text-black sm:text-sm"
          placeholder="Search"
          type="search"
        />
      </div>
    </div>
  );
};

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
    if (choiceIsSelected(selectedChoice)) {
      setSelectedChoices((selectedChoices) =>
        selectedChoices.filter((choice) => choice.id !== selectedChoice.id)
      );
    } else {
      setSelectedChoices((selectedChoices) => [
        ...selectedChoices,
        selectedChoice,
      ]);
    }
  };

  const selectMenuItems = choices.map((value) => {
    return (
      <SelectMenuItem
        choice={{ display: value.display, id: value.id }}
        onSelectChoice={onSelectChoice}
        isSelected={choiceIsSelected(value)}
        key={value.id}
      />
    );
  });

  const selectedItemBadges = selectedChoices.map((value) => {
    return <Badge key={value.id} choice={value} />;
  });

  const focusStyles =
    "focus:outline-none focus:border-primary focus:ring-2 focus:ring-secondary";

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
          {selectedChoices.length > 0 ? (
            <div className="relative">{selectedItemBadges}</div>
          ) : (
            <span className="block truncate">Designers</span>
          )}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {showDropdown ? <ChevronDown /> : <ChevronUp />}
          </span>
        </button>
        {showDropdown && (
          <div className="absolute max-h-60 mt-2 z-50 py-1 w-full ring-1 ring-black ring-opacity-5 overflow-auto rounded-md bg-white shadow-lg focus:outline-none sm:text-sm">
            <div className="p-2">
              <Search />
            </div>
            <ul
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-60 text-base overflow-auto focus:outline-none sm:text-sm"
            >
              {selectMenuItems}
            </ul>
          </div>
        )}
      </div>
      {/* <div className="mt-2 relative">{selectedItemBadges}</div> */}
    </div>
  );
};

export default MultiSelectMenu;
