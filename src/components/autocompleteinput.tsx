'use client'

import { useState, useEffect, useRef } from 'react'
import { FaPlane } from 'react-icons/fa'

interface Airport {
  code: string
  city: string
  country: string
}

// Dummy airports data
const DUMMY_AIRPORTS: Airport[] = [
  { code: 'LHR', city: 'London', country: 'United Kingdom' },
  { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates' },
  { code: 'JFK', city: 'New York', country: 'United States' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore' },
  { code: 'LAX', city: 'Los Angeles', country: 'United States' },
  { code: 'CDG', city: 'Paris', country: 'France' },
  { code: 'FRA', city: 'Frankfurt', country: 'Germany' },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'IST', city: 'Istanbul', country: 'Turkey' },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand' },
  { code: 'SYD', city: 'Sydney', country: 'Australia' },
  { code: 'HKG', city: 'Hong Kong', country: 'China' },
]

interface AutocompleteInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
}

export default function AutocompleteInput({ value, onChange, placeholder, label }: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<Airport[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const filtered = DUMMY_AIRPORTS.filter(
      airport =>
        airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.country.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSuggestions(filtered)
  }, [searchTerm])

  const handleSelect = (airport: Airport) => {
    onChange(`${airport.city} (${airport.code})`)
    setSearchTerm(`${airport.city} (${airport.code})`)
    setIsOpen(false)
  }

  return (
    <div className="space-y-2" ref={wrapperRef}>
      <label className="block text-sm font-medium">{label}</label>
      <div className="relative">
        <FaPlane className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          className="input-primary pl-10"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
        />

        {isOpen && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((airport, index) => (
              <div
                key={airport.code}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onClick={() => handleSelect(airport)}
              >
                <div>
                  <div className="font-medium">{airport.city}</div>
                  <div className="text-sm text-gray-500">{airport.country}</div>
                </div>
                <div className="text-gray-400 text-sm">{airport.code}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}