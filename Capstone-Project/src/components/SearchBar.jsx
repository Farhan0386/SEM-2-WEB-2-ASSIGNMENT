import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCity } from '../store/weatherSlice';
import { useDebounce } from '../hooks/useDebounce';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const dispatch = useDispatch();
  const currentCity = useSelector(s => s.weather.city);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 500);
  const inputRef = useRef(null);

  useEffect(() => {
    if (debouncedInput && debouncedInput.trim() !== '' && debouncedInput.trim() !== currentCity) {
      dispatch(setCity(debouncedInput.trim()));
      setIsOpen(false);
      setInput('');
    }
  }, [debouncedInput, dispatch, currentCity]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  return (
    <div className="relative">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)}
          className="glass px-5 py-3 flex items-center gap-2.5 text-white/50 hover:text-white hover:border-white/20 transition-all cursor-pointer group"
        >
          <Search className="w-4 h-4 group-hover:text-indigo-400 transition-colors" />
          <span className="text-sm font-medium hidden md:inline">Search city...</span>
        </button>
      ) : (
        <div className="glass flex items-center gap-3 px-5 py-3 min-w-[320px] border-indigo-500/30">
          <Search className="w-4 h-4 text-indigo-400" />
          <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') { setIsOpen(false); setInput(''); } }}
            placeholder="Type a city name..."
            className="bg-transparent text-white placeholder-white/25 focus:outline-none text-sm flex-1 font-medium"
          />
          <button onClick={() => { setIsOpen(false); setInput(''); }} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-4 h-4 text-white/40" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
