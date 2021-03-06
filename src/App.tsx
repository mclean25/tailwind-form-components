import React from "react";
import "./App.css";
import MultiSelectMenu, { Search } from "./components/MultiSelectMenu";
import SelectMenu from "./components/SelectMenu";

const choices = [
  { display: "Framer", id: "framer" },
  { display: "Sketch", id: "sketch" },
  { display: "InVision Studio", id: "invision-studio" },
  { display: "Figma", id: "figma" },
  { display: "Adobe XD", id: "adobe-xd" },
];

function App() {
  return (
    <div className="container mx-auto pt-4">
      <div className="w-64">
        {/* <div className="mb-4">{<Search />}</div> */}
        <div className="mb-4">
          <SelectMenu choices={choices} />
        </div>
        <div>
          <MultiSelectMenu choices={choices} />
        </div>
      </div>
    </div>
  );
}

export default App;
