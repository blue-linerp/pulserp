'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

type SelectOption = string | { label: string; value: string };

export function CustomSelect({ options, value = '', onChange }: { options: SelectOption[]; value?: string; onChange?: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const normalizedOptions = options.map((option) => typeof option === 'string' ? { label: option, value: option } : option);
  const selectedLabel = normalizedOptions.find((option) => option.value === selected)?.label || selected;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-white/65 bg-[#080808] px-4 text-sm font-bold text-white transition hover:border-white focus:border-white"
      >
        <span className={selected ? 'text-white' : 'text-white/30'}>{selectedLabel || ''}</span>
        <ChevronDown size={13} className={`text-white/45 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 overflow-hidden rounded-b-md border border-white/10 bg-[#080808] p-1 shadow-[0_12px_30px_rgba(0,0,0,0.65)]">
          {normalizedOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => { setSelected(option.value); onChange?.(option.value); setOpen(false); }}
              className={`block w-full rounded-md px-3 py-2.5 text-left text-sm font-black transition hover:bg-[var(--red-primary)] hover:text-white ${selected === option.value ? 'bg-[var(--red-primary)] text-white' : 'text-white'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
