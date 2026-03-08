export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Metric Cards */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Today's Revenue</h3>
                    <p className="text-3xl font-bold text-gray-900">₹12,450</p>
                    <p className="text-sm text-secondary mt-2 flex items-center">
                        <span>↑ 14% vs yesterday</span>
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Active Bookings</h3>
                    <p className="text-3xl font-bold text-gray-900">28</p>
                    <p className="text-sm text-gray-500 mt-2">12 Matching, 16 In Progress</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Technicians Online</h3>
                    <p className="text-3xl font-bold text-gray-900">45 / 112</p>
                    <p className="text-sm text-secondary mt-2 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-secondary mr-2"></span> Active
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Users</h3>
                    <p className="text-3xl font-bold text-gray-900">1,240</p>
                    <p className="text-sm text-primary mt-2">
                        <span>+24 new today</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Feed */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                        <button className="text-sm text-primary font-medium">View all</button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                        IP
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Screen Repair - iPhone {12 + i}</p>
                                        <p className="text-sm text-gray-500">Customer: Rahul S. • 10 mins ago</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                                    Matching
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">System Status</h2>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">API Gateway</span>
                                <span className="text-sm font-medium text-secondary">Operational</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-secondary h-2 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Matching Engine (Redis)</span>
                                <span className="text-sm font-medium text-secondary">98% Success</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-secondary h-2 rounded-full" style={{ width: '98%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Avg match time: 4.2s</p>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">MongoDB Cluster</span>
                                <span className="text-sm font-medium text-blue-600">35% Load</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
