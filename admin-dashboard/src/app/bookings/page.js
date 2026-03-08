"use client";
import { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';

export default function BookingsPage() {
    const [filter, setFilter] = useState('All');

    // Dummy Data
    const bookings = [
        { id: 'BKG-001', customer: 'Amit Kumar', device: 'Samsung S21', issue: 'Battery replacement', status: 'Completed', amount: '₹1499', date: 'Oct 12, 2:30 PM' },
        { id: 'BKG-002', customer: 'Priya S.', device: 'iPhone 13', issue: 'Screen cracked', status: 'En_Route', amount: '₹4999', date: 'Oct 12, 3:15 PM' },
        { id: 'BKG-003', customer: 'Vikram', device: 'OnePlus 9', issue: 'Charging port', status: 'Finding_Technician', amount: '₹899', date: 'Oct 12, 3:45 PM' },
        { id: 'BKG-004', customer: 'Neha G.', device: 'Google Pixel 6', issue: 'Water damage', status: 'In_Progress', amount: '₹2499', date: 'Oct 12, 2:00 PM' },
        { id: 'BKG-005', customer: 'Rohan M.', device: 'iPhone 11', issue: 'Camera repair', status: 'Cancelled', amount: '₹1200', date: 'Oct 11, 4:00 PM' },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    Export CSV
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search booking ID or customer..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div className="flex space-x-2">
                        {['All', 'Active', 'Completed', 'Cancelled'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md ${filter === f ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
                            >
                                {f}
                            </button>
                        ))}
                        <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium">
                            <Filter className="w-4 h-4" />
                            <span>More Filters</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                <th className="p-4">Booking ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Device & Issue</th>
                                <th className="p-4">Date & Time</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bookings.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 font-medium text-gray-900">{b.id}</td>
                                    <td className="p-4 text-gray-700">{b.customer}</td>
                                    <td className="p-4">
                                        <p className="text-sm font-medium text-gray-900">{b.device}</p>
                                        <p className="text-xs text-gray-500">{b.issue}</p>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">{b.date}</td>
                                    <td className="p-4 font-medium text-gray-900">{b.amount}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full
                      ${b.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                b.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                    b.status === 'Finding_Technician' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-blue-100 text-blue-800'}`}
                                        >
                                            {b.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination mock */}
                <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500 bg-white">
                    <span>Showing 1 to 5 of 124 entries</span>
                    <div className="flex space-x-1">
                        <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1 bg-primary text-white rounded-md">1</button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
