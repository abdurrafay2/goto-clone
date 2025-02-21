'use client'

import { useState } from 'react'
import { FaPlane, FaCalendar, FaUser, FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import AutocompleteInput from './autocompleteinput'

interface FlightRoute {
  from: string;
  to: string;
  date: string;
}

export default function SearchForm() {
  const router = useRouter()
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway' | 'multicity'>('roundtrip')
  const [showPassengers, setShowPassengers] = useState(false)
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  })
  const [cabinClass, setCabinClass] = useState('economy')
  const [multiCityFlights, setMultiCityFlights] = useState<FlightRoute[]>([
    { from: '', to: '', date: '' },
    { from: '', to: '', date: '' }
  ])

  const handleAddFlight = () => {
    setMultiCityFlights([...multiCityFlights, { from: '', to: '', date: '' }])
  }

  const handleRemoveFlight = (index: number) => {
    if (multiCityFlights.length > 2) {
      const newFlights = multiCityFlights.filter((_, i) => i !== index)
      setMultiCityFlights(newFlights)
    }
  }

  const updateMultiCityFlight = (index: number, field: keyof FlightRoute, value: string) => {
    const newFlights = [...multiCityFlights]
    newFlights[index] = { ...newFlights[index], [field]: value }
    setMultiCityFlights(newFlights)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/search-results')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 -mt-24 relative z-20">
      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          className={`px-4 py-2 rounded ${
            tripType === 'roundtrip' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setTripType('roundtrip')}
        >
          Round Trip
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tripType === 'oneway' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setTripType('oneway')}
        >
          One Way
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tripType === 'multicity' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setTripType('multicity')}
        >
          Multi-City
        </button>
      </div>

      <form onSubmit={handleSearch} className="space-y-6">
        {tripType === 'multicity' ? (
          <div className="space-y-4">
            {multiCityFlights.map((flight, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 relative border p-4 rounded-lg">
                <AutocompleteInput
                  value={flight.from}
                  onChange={(value) => updateMultiCityFlight(index, 'from', value)}
                  placeholder="Departure City"
                  label="From"
                />

                <AutocompleteInput
                  value={flight.to}
                  onChange={(value) => updateMultiCityFlight(index, 'to', value)}
                  placeholder="Arrival City"
                  label="To"
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Date</label>
                  <div className="relative">
                    <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      className="input-primary pl-10"
                      value={flight.date}
                      onChange={(e) => updateMultiCityFlight(index, 'date', e.target.value)}
                    />
                  </div>
                </div>

                {index >= 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFlight(index)}
                    className="absolute -right-2 -top-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FaTrash size={12} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddFlight}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <FaPlus /> Add Another Flight
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AutocompleteInput
              value=""
              onChange={(value) => console.log(value)}
              placeholder="Departure City"
              label="From"
            />

            <AutocompleteInput
              value=""
              onChange={(value) => console.log(value)}
              placeholder="Arrival City"
              label="To"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium">Departure</label>
              <div className="relative">
                <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  className="input-primary pl-10"
                />
              </div>
            </div>

            {tripType === 'roundtrip' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Return</label>
                <div className="relative">
                  <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    className="input-primary pl-10"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 relative">
            <label className="block text-sm font-medium">Passengers & Class</label>
            <div className="relative">
              <button
                type="button"
                className="input-primary pl-10 text-left flex justify-between items-center"
                onClick={() => setShowPassengers(!showPassengers)}
              >
                <span>
                  {passengers.adults + passengers.children + passengers.infants} Passenger(s)
                </span>
                <FaChevronDown className="text-gray-400" />
              </button>
              <FaUser className="absolute left-3 top-3 text-gray-400" />
            </div>

            {showPassengers && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg p-4 z-50">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Adults</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="px-2 py-1 border rounded"
                        onClick={() => setPassengers(prev => ({...prev, adults: Math.max(1, prev.adults - 1)}))}
                      >-</button>
                      <span>{passengers.adults}</span>
                      <button
                        type="button"
                        className="px-2 py-1 border rounded"
                        onClick={() => setPassengers(prev => ({...prev, adults: prev.adults + 1}))}
                      >+</button>
                    </div>
                  </div>
                  
                  <select
                    className="input-primary"
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value)}
                  >
                    <option value="economy">Economy</option>
                    <option value="premium">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary"
        >
          Search Flights
        </button>
      </form>
    </div>
  )
}