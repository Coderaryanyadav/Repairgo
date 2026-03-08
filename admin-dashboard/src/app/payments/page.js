"use client";
import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';

export default function PaymentsPage() {
    const [payments] = useState([
        { id: 'PAY-8921A', orderId: 'order_LMg...', amount: '₹1499', status: 'Captured', method: 'UPI', date: 'Oct 12, 4:00 PM' },
        { id: 'PAY-8922B', orderId: 'order_LMh...', amount: '₹4999', status: 'Captured', method: 'Credit Card', date: 'Oct 12, 3:30 PM' },
        { id: 'PAY-8923C', orderId: 'order_LMi...', amount: '₹899', status: 'Failed', method: 'Net Banking', date: 'Oct 12, 1:15 PM' },
        { id: 'PAY-8924D', orderId: 'order_LMj...', amount: '₹2499', status: 'Refunded', method: 'UPI', date: 'Oct 11, 2:00 PM' },
    ]);

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Financial Reconciliation</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input type="text" placeholder="Search Txn ID..." className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 bg-white">
                            <th className="p-4 font-semibold">Txn ID</th>
                            <th className="p-4 font-semibold">Razorpay Order</th>
                            <th className="p-4 font-semibold">Amount</th>
                            <th className="p-4 font-semibold">Method</th>
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-right">Receipt</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {payments.map(tx => (
                            <tr key={tx.id} className="hover:bg-gray-50">
                                <td className="p-4 font-mono text-sm text-gray-900 font-bold">{tx.id}</td>
                                <td className="p-4 text-gray-500 font-mono text-xs">{tx.orderId}</td>
                                <td className="p-4 font-medium text-gray-900">{tx.amount}</td>
                                <td className="p-4 text-gray-600">{tx.method}</td>
                                <td className="p-4 text-sm text-gray-500">{tx.date}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${tx.status === 'Captured' ? 'bg-green-100 text-green-800' :
                                            tx.status === 'Refunded' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>{tx.status}</span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-primary hover:text-blue-800 font-medium text-sm flex items-center justify-end space-x-1">
                                        <span>View</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
