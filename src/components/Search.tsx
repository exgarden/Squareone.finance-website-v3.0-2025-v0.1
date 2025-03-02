import { useState } from 'react';
import {  } from 'lucide-react';

const Search = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center mb-4">
        <SearchIcon className="w-5 h-5 mr-2 text-slate-600" />
        <h2 className="text-lg font-semibold text-slate-700">Search</h2>
      </div>
      
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Google..."
          className="w-full px-4 py-3 pl-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
        >
          <SearchIcon size={18} />
        </button>
      </form>
    </div>
  );
};

export default Search;
