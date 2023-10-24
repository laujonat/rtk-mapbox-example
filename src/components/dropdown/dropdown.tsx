import React, { useState } from "react";

import "./dropdown.css";

interface DropdownProps {
  options: Record<string, string>;
  onSelect: (selectedOption: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedOption ? (
          <div className="selected-option">
            <img src={options[selectedOption]} alt={selectedOption} />
            <span>{selectedOption}</span>
          </div>
        ) : (
          "Select Annotation"
        )}
      </button>
      {isOpen && (
        <ul className="dropdown-options">
          {Object.keys(options).map((option) => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              <div className="option">
                <img src={options[option]} alt={option} />
                <span>{option}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
