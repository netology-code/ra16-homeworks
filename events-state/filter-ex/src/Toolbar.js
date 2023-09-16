import React from "react";
import { v4 as uuidv4 } from "uuid";

function Toolbar({ handleSelectFilter }) {


  return (
    <div className="toolbar">
      {["All", "Websites", "Flayers", "Business Cards"].map((filter) => (
        <button
          key={uuidv4()}
          className={filter}
          onClick={() => handleSelectFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default Toolbar;

