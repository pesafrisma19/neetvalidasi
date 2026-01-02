"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";

interface Option {
    name: string;
    code: string;
}

interface SearchableSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
}

export function SearchableSelect({
    options,
    value,
    onChange,
    placeholder = "Pilih...",
    label,
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = useMemo(() => {
        return options.filter((option) =>
            option.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [options, search]);

    const selectedOption = options.find((opt) => opt.code === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col gap-1.5 w-full" ref={dropdownRef}>
            {label && <label className="text-sm font-medium text-gray-500 ml-1">{label}</label>}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full rounded-xl bg-ios-gray-100/50 p-4 text-[17px] text-left outline-none transition-all focus:bg-ios-gray-100 focus:ring-2 focus:ring-ios-blue/20 flex items-center justify-between"
                >
                    <span className={!selectedOption ? "text-gray-400" : "text-black"}>
                        {selectedOption ? selectedOption.name : placeholder}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                    <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl max-h-[300px] flex flex-col overflow-hidden">
                        <div className="p-2 border-b border-gray-100 sticky top-0 bg-white/50 backdrop-blur-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari bank..."
                                    className="w-full bg-ios-gray-100 rounded-lg py-2 pl-9 pr-8 text-sm outline-none"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoFocus
                                />
                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="overflow-y-auto flex-1 p-1">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <button
                                        key={option.code}
                                        onClick={() => {
                                            onChange(option.code);
                                            setIsOpen(false);
                                            setSearch("");
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-colors ${value === option.code ? "bg-ios-blue/10 text-ios-blue font-medium" : "hover:bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {option.name}
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-sm text-gray-400">
                                    Tidak ditemukan
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
