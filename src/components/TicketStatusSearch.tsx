
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface TicketStatusSearchProps {
  onSearch: (query: string, type: 'email' | 'ticketId') => void;
}

const TicketStatusSearch: React.FC<TicketStatusSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'email' | 'ticketId'>('email');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, searchType);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <div className="flex gap-4 mb-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="searchType"
              checked={searchType === 'email'}
              onChange={() => setSearchType('email')}
              className="mr-2"
            />
            Search by Email
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="searchType"
              checked={searchType === 'ticketId'}
              onChange={() => setSearchType('ticketId')}
              className="mr-2"
            />
            Search by Ticket ID
          </label>
        </div>
        <form 
          onSubmit={handleSubmit}
          className="relative"
        >
          <input
            type={searchType === 'email' ? 'email' : 'text'}
            placeholder={searchType === 'email' ? 'Enter your email address' : 'Enter your ticket ID'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-background border border-input rounded-md py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-1 rounded-md"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketStatusSearch;
