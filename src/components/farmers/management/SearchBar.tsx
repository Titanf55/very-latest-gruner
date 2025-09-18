import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search by name, mobile, or member ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[448px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
