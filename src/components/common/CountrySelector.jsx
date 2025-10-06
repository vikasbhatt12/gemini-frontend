import { useState, useMemo } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Search, X } from 'lucide-react';

export function CountrySelector({ countries, selectedCountry, onSelect, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries;
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm)
    );
  }, [countries, searchTerm]);

  const handleSelect = (country) => {
    onSelect(country);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-28 bg-transparent border-gray-300 dark:border-gray-700 justify-start"
        disabled={disabled || !selectedCountry}
      >
        {selectedCountry ? (
          <div className="flex items-center gap-2 truncate">
            <span className="text-xl">{selectedCountry.flag}</span>
            <span>{selectedCountry.dialCode}</span>
          </div>
        ) : (
          <span>...</span>
        )}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col h-[80vh]">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h3 className="font-semibold text-lg">Select a Country</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full w-8 h-8">
                <X size={20} />
              </Button>
            </div>
            <div className="p-4 border-b dark:border-gray-700">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name or dial code"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <ul className="flex-1 overflow-y-auto p-2">
              {filteredCountries.map(country => (
                <li
                  key={country.code}
                  onClick={() => handleSelect(country)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                >
                  <span className="text-2xl">{country.flag}</span>
                  <span className="flex-1">{country.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{country.dialCode}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}