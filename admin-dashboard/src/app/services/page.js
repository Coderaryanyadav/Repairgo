"use client";
import { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

export default function ServicesPage() {
    const [services] = useState([
        { id: 1, category: 'Smartphone Repair', name: 'Screen Replacement', basePrice: '₹1499', estTime: '45 mins', active: true },
        { id: 2, category: 'Smartphone Repair', name: 'Battery Replacement', basePrice: '₹899', estTime: '30 mins', active: true },
        { id: 3, category: 'Smartphone Repair', name: 'Charging Port Repair', basePrice: '₹599', estTime: '40 mins', active: true },
        { id: 4, category: 'Tablet Repair', name: 'iPad Glass Replacement', basePrice: '₹2999', estTime: '90 mins', active: true },
    ]);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Service Pricing Editor</h1>
                <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    <Plus className="w-5 h-5" />
                    <span>Add New Service</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input type="text" placeholder="Search services..." className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 bg-white">
                            <th className="p-4 font-semibold">Service Name</th>
                            <th className="p-4 font-semibold">Category</th>
                            <th className="p-4 font-semibold">Base Price</th>
                            <th className="p-4 font-semibold">Est. duration</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {services.map(svc => (
                            <tr key={svc.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-900">{svc.name}</td>
                                <td className="p-4 text-gray-600">{svc.category}</td>
                                <td className="p-4 font-bold text-primary">{svc.basePrice}</td>
                                <td className="p-4 text-gray-600 font-mono text-sm">{svc.estTime}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                </td>
                                <td className="p-4 flex justify-end space-x-3">
                                    <button className="text-blue-600 hover:text-blue-800"><Edit className="w-5 h-5" /></button>
                                    <button className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
