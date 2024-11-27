import React, { useState } from "react";
import { SearchOptions } from "../../../models/types";
import './movie-search.component.css'

type DropdownKey = "originalLanguage" | "translationLanguage" | "sorting";

interface MovieSearchProps {
  onChangeOptions: (options: SearchOptions) => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onChangeOptions }) => {
  const dropdowns: Record<DropdownKey, string[]> = {
    originalLanguage: ["장르 (전체)", "Action", "Adventure", "Comedy", "Crime", "Family"],
    translationLanguage: ["평점 (전체)", "9~10", "8~9", "7~8", "6~7", "5~6", "4~5", "4점 이하"],
    sorting: ["언어 (전체)", "영어", "한국어"],
  };

  const DEFAULT_OPTIONS: SearchOptions = {
    originalLanguage: "장르 (전체)",
    translationLanguage: "평점 (전체)",
    sorting: "언어 (전체)",
  };

  const [selectedOptions, setSelectedOptions] = useState<SearchOptions>({ ...DEFAULT_OPTIONS });
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);

  const toggleDropdown = (key: DropdownKey) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const selectOption = (key: DropdownKey, option: string) => {
    const updatedOptions = {
      ...selectedOptions,
      [key]: option,
    };
    console.log("Selected Option Updated:", updatedOptions); // 디버깅
    setSelectedOptions(updatedOptions);
    setActiveDropdown(null);
    onChangeOptions(updatedOptions);
  };

  const clearOptions = () => {
    setSelectedOptions({ ...DEFAULT_OPTIONS });
    onChangeOptions({ ...DEFAULT_OPTIONS });
  };

  return (
    <div className="dropdown-container">
      <label>선호하는 설정을 선택하세요</label>
      {Object.entries(dropdowns).map(([key, options]) => (
        <div key={key} className="custom-select">
          <div className="select-selected" onClick={() => toggleDropdown(key as DropdownKey)}>
            {selectedOptions[key as DropdownKey]}
          </div>
          {activeDropdown === key && (
            <div className="select-items">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => selectOption(key as DropdownKey, option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <button className="clear-options" onClick={clearOptions}>
        초기화
      </button>
    </div>
  );
};

export default MovieSearch;