import React from "react";

const FilterButton = ({ handleFilterTasksCheck }) => {
  return (
    <div>
      <button
        onClick={handleFilterTasksCheck}
        className="btn btn-sm btn-primary"
      >
        Filter Priority
      </button>
    </div>
  );
};

export default FilterButton;
