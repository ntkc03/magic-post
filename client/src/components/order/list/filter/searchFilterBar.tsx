// src/components/SearchFilterBar.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { employerInterface } from '../../../../types/EmployerInterface';

interface SearchFilterBarProps {
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
  employerRole: string;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ onSearch, onFilter, employerRole }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const handleSearch = (searchQuery: string) => {
    onSearch(searchQuery);
  };

  const handleFilter = (filter: string) => {
    onFilter(filter);
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
      <div className="flex items-center space-x-4">
        {/* Filter Input */}
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            handleFilter(e.target.value);
          }}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-500"
        >
          <option value="" hidden>Lọc trạng thái đơn hàng</option>
          {employerRole === "Nhân viên điểm giao dịch" && (
            <>
              <option value="Nhận đơn hàng">Nhận đơn hàng</option>
              <option value="Gửi đến điểm giao dịch đích">Gửi đến điểm giao dịch đích</option>
              <option value="Điểm giao dịch đích đã nhận">Điểm giao dịch đích đã nhận</option>
              <option value="Đang giao hàng">Đang giao hàng</option>
              <option value="Giao hàng thành công">Giao hàng thành công</option>
              <option value="Giao hàng không thành công">Giao hàng không thành công</option>
            </>
          )}

          {employerRole === "Nhân viên điểm tập kết" && (
            <>
            <option value="Gửi đến điểm tập kết">Gửi đến điểm tập kết</option>
            <option value="Điểm tập kết đã nhận">Điểm tập kết đã nhận</option>
            <option value="Gửi đến điểm tập kết đích">Gửi đến điểm tập kết đích</option>
            <option value="Điểm tập kết đích đã nhận">Điểm tập kết đích đã nhận</option>
            </>
          )}
          
          
          
          
        </select>
      </div>
    </div>
  );
};

export default SearchFilterBar;
