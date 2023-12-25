import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

interface AutocompleteProps {
  id: string;
  placeholder: string;
}

interface Ward {
  Name: string;
  Id: string;
}

interface District {
  Name: string;
  Id: string;
  Wards: Ward[];
}

interface City {
  Name: string;
  Id: string;
  Districts: District[];
}

interface AutocompletePropsWithAddress extends AutocompleteProps {
  fetchSuggestions: () => Promise<City[]>;
}

const Autocomplete: React.FC<AutocompletePropsWithAddress> = ({
  id,
  placeholder,
  fetchSuggestions,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const suggestions = await fetchSuggestions();

    const filtered = suggestions
      .flatMap((city) => city.Districts.flatMap((district) => district.Wards.map((ward) => ward.Name)))
      .filter((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase()));

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
      />
      {showSuggestions && (
        <ul>
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;