// src/components/SearchFilterBar.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchFilterBarProps {
  onSearch: (query: string) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ onSearch}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (searchQuery: string) => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 p-4 bg-white rounded-md">
      {/* Search Input with FontAwesome Icon */}
      <div className="flex items-center flex-1">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Nhập tìm kiếm..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }
        }
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {/* Search and Filter Buttons */}
    </div>
  );
};

export default SearchFilterBar;
