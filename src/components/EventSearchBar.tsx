
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface EventSearchBarProps {
  onSearch: (query: string) => void;
}

const EventSearchBar: React.FC<EventSearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative w-full max-w-lg mx-auto mb-8"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search for events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-background border border-input rounded-full py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default EventSearchBar;
