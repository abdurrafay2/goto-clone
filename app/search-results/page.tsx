'use client'

import { useState } from 'react'
import { FaPlane } from 'react-icons/fa'

// Dummy flight data
const DUMMY_FLIGHTS = [
  {
    id: 1,
    airline: 'Emirates',
    flightNumber: 'EK123',
    departure: 'London (LHR)',
    arrival: 'Dubai (DXB)',
    departureTime: '10:00',
    arrivalTime: '20:00',
    duration: '10h 00m',
    price: 599,
    stops: 0,
    logo: '/emirates-logo.png'
  },
  {
    id: 2,
    airline: 'British Airways',
    flightNumber: 'BA456',
    departure: 'London (LHR)',
    arrival: 'Dubai (DXB)',
    departureTime: '14:30',
    arrivalTime: '00:30',
    duration: '10h 00m',
    price: 549,
    stops: 1,
    logo: '/ba-logo.png'
  },
  // Add more dummy flights as needed
]

export default function SearchResults() {
  const [sortBy, setSortBy] = useState('price')
  const [filters, setFilters] = useState({
    maxPrice: 1000,
    stops: 'all',
    airlines: [] as string[]
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span>$0</span>
                  <span>${filters.maxPrice}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Stops</h3>
                <select
                  className="input-primary"
                  value={filters.stops}
                  onChange={(e) => setFilters({...filters, stops: e.target.value})}
                >
                  <option value="all">All Flights</option>
                  <option value="0">Non-stop only</option>
                  <option value="1">1 stop max</option>
                </select>
              </div>

              <div>
                <h3 className="font-medium mb-2">Airlines</h3>
                <div className="space-y-2">
                  {['Emirates', 'British Airways', 'Qatar Airways', 'Etihad'].map((airline) => (
                    <label key={airline} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters.airlines.includes(airline)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({...filters, airlines: [...filters.airlines, airline]})
                          } else {
                            setFilters({...filters, airlines: filters.airlines.filter(a => a !== airline)})
                          }
                        }}
                      />
                      {airline}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Flight Results */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Flight Results</h1>
              <select
                className="input-primary max-w-xs"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="price">Price: Low to High</option>
                <option value="duration">Duration: Shortest</option>
                <option value="departure">Departure: Earliest</option>
              </select>
            </div>

            <div className="space-y-4">
              {DUMMY_FLIGHTS.map((flight) => (
                <div key={flight.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaPlane className="text-2xl text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-bold">{flight.airline}</h3>
                        <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${flight.price}</p>
                      <button className="btn-primary mt-2">Select</button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-bold">{flight.departureTime}</p>
                      <p className="text-sm text-gray-500">{flight.departure}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">{flight.duration}</p>
                      <div className="border-t border-gray-300 my-2"></div>
                      <p className="text-sm text-gray-500">{flight.stops} stop(s)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{flight.arrivalTime}</p>
                      <p className="text-sm text-gray-500">{flight.arrival}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}