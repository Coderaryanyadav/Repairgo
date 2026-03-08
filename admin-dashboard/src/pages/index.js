import React from 'react';

export default function AdminDashboardPage() {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <aside className="w-64 bg-white p-5 shadow-lg">
                <h1 className="text-2xl font-bold mb-10 text-blue-600">Repargo Admin</h1>
                <nav className="flex flex-col space-y-4">
                    <a href="#" className="font-semibold text-gray-700 hover:text-blue-500">Dashboard</a>
                    <a href="#" className="font-semibold text-gray-700 hover:text-blue-500">Bookings Management</a>
                    <a href="#" className="font-semibold text-gray-700 hover:text-blue-500">Technician Management</a>
                    <a href="#" className="font-semibold text-gray-700 hover:text-blue-500">User Management</a>
                    <a href="#" className="font-semibold text-gray-700 hover:text-blue-500">Services Management</a>
                    <a href="#" className="font-semibold text-gray-700 hover:text-blue-500">Revenue Analytics</a>
                    <a href="#" className="font-semibold text-gray-700 hover:text-blue-500">System Logs</a>
                </nav>
            </aside>
            <main className="flex-1 p-10">
                <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 shadow rounded-xl border border-gray-200">
                        <h3 className="text-gray-500 mb-2">Total Revenue</h3>
                        <p className="text-3xl font-bold">₹24,500</p>
                    </div>
                    <div className="bg-white p-6 shadow rounded-xl border border-gray-200">
                        <h3 className="text-gray-500 mb-2">Active Jobs</h3>
                        <p className="text-3xl font-bold">12</p>
                    </div>
                    <div className="bg-white p-6 shadow rounded-xl border border-gray-200">
                        <h3 className="text-gray-500 mb-2">Technicians Online</h3>
                        <p className="text-3xl font-bold">45</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
