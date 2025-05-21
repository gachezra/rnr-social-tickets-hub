
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

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
        <div className="flex gap-4 mb-3 justify-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="searchType"
              checked={searchType === 'email'}
              onChange={() => setSearchType('email')}
              className="mr-2"
            />
            Search by Email
          </label>
          <label className="flex items-center cursor-pointer">
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
          <Input
            type={searchType === 'email' ? 'email' : 'text'}
            placeholder={searchType === 'email' ? 'Enter your email address' : 'Enter your ticket ID'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pr-12"
            required
          />
          <Button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
            size="sm"
            aria-label="Search"
          >
            <Search size={18} className="mr-1" />
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TicketStatusSearch;
