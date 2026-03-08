"use client";
import { useState } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';

export default function TechniciansPage() {
    const techs = [
        { id: 1, name: 'Suresh Kumar', phone: '+91 9876543210', status: 'Online', rating: 4.8, jobs: 142, approved: true },
        { id: 2, name: 'Ravi Verma', phone: '+91 8765432109', status: 'Offline', rating: 4.5, jobs: 89, approved: true },
        { id: 3, name: 'Mohammed Ali', phone: '+91 7654321098', status: 'Busy', rating: 4.9, jobs: 215, approved: true },
        { id: 4, name: 'John Doe', phone: '+91 6543210987', status: 'New', rating: 0, jobs: 0, approved: false }, // Pending approval
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Technician Fleet</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    Add/Invite Technician
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 font-medium text-sm">Total Fleet</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">112</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">112</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 font-medium text-sm">Pending Approvals</p>
                        <p className="text-2xl font-bold text-yellow-600 mt-1">4</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-lg">4</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 font-medium text-sm">Average Rating</p>
                        <p className="text-2xl font-bold text-green-600 mt-1">4.6 ★</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-lg">★</div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search technicians..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 bg-white">
                            <th className="p-4 font-semibold">Tech Name</th>
                            <th className="p-4 font-semibold">Phone</th>
                            <th className="p-4 font-semibold">Performance</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Verification</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {techs.map(tech => (
                            <tr key={tech.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-900">{tech.name}</td>
                                <td className="p-4 text-gray-600 font-mono text-sm">{tech.phone}</td>
                                <td className="p-4">
                                    <div className="text-sm font-bold text-gray-900">{tech.rating} ★</div>
                                    <div className="text-xs text-gray-500">{tech.jobs} Jobs completed</div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${tech.status === 'Online' ? 'bg-green-100 text-green-800' :
                                            tech.status === 'Busy' ? 'bg-yellow-100 text-yellow-800' :
                                                tech.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                        }`}>
                                        {tech.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {tech.approved ? (
                                        <span className="flex items-center text-green-600 text-sm font-medium"><CheckCircle className="w-4 h-4 mr-1" /> Approved</span>
                                    ) : (
                                        <span className="flex items-center text-red-600 text-sm font-medium"><XCircle className="w-4 h-4 mr-1" /> Pending Auth</span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    {!tech.approved ? (
                                        <button className="bg-green-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-green-700">Approve</button>
                                    ) : (
                                        <button className="border border-red-300 text-red-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-50">Suspend</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
