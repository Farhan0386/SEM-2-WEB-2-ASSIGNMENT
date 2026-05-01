import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCity } from '../store/weatherSlice';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const dispatch = useDispatch();
  const currentCity = useSelector(s => s.weather.city);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (trimmed && trimmed !== currentCity) {
      dispatch(setCity(trimmed));
    }
    setIsOpen(false);
    setInput('');
  };

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  return (
    <div className="relative">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)}
          className="glass px-5 py-3 flex items-center gap-2.5 text-slate-500 dark:text-white/50 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer group"
        >
          <Search className="w-4 h-4 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
          <span className="text-sm font-medium hidden md:inline">Search city...</span>
        </button>
      ) : (
        <div className="glass flex items-center gap-3 px-5 py-3 min-w-[320px] border-indigo-500/30">
          <button onClick={handleSubmit} className="p-0 flex items-center" aria-label="Submit search">
            <Search className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          </button>
          <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSubmit();
              if (e.key === 'Escape') { setIsOpen(false); setInput(''); }
            }}
            placeholder="Type a city name..."
            className="bg-transparent text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/25 focus:outline-none text-sm flex-1 font-medium"
          />
          <button onClick={() => { setIsOpen(false); setInput(''); }} className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-400 dark:text-white/40" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
