"use client";
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const revenueData = [
    { name: 'Mon', revenue: 4000, bookings: 24 },
    { name: 'Tue', revenue: 3000, bookings: 13 },
    { name: 'Wed', revenue: 5000, bookings: 40 },
    { name: 'Thu', revenue: 8780, bookings: 39 },
    { name: 'Fri', revenue: 5890, bookings: 48 },
    { name: 'Sat', revenue: 9390, bookings: 68 },
    { name: 'Sun', revenue: 10490, bookings: 85 },
];

export default function AnalyticsPage() {
    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-primary">
                    <option>Last 7 Days</option>
                    <option>This Month</option>
                    <option>This Year</option>
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Line Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-96">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Revenue Trend (INR)</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Line type="monotone" dataKey="revenue" stroke="#0066cc" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-96">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Bookings Volume</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} />
                            <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                            <Bar dataKey="bookings" fill="#00c853" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Service Performance Metrics */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Top Performing Services</h2>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <div className="w-32 text-sm font-medium text-gray-700">Screen Repair</div>
                        <div className="flex-1 bg-gray-100 rounded-full h-3 mx-4">
                            <div className="bg-primary h-3 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <div className="w-20 text-right text-sm font-bold text-gray-900">75%</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-32 text-sm font-medium text-gray-700">Battery Sync</div>
                        <div className="flex-1 bg-gray-100 rounded-full h-3 mx-4">
                            <div className="bg-blue-400 h-3 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <div className="w-20 text-right text-sm font-bold text-gray-900">45%</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-32 text-sm font-medium text-gray-700">Water Damage</div>
                        <div className="flex-1 bg-gray-100 rounded-full h-3 mx-4">
                            <div className="bg-blue-300 h-3 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <div className="w-20 text-right text-sm font-bold text-gray-900">20%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
