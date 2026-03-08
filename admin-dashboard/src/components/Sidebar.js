import Link from 'next/link';
import {
    Home,
    Calendar,
    Wrench,
    Users,
    Layers,
    CreditCard,
    BarChart2,
    Settings
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Bookings', href: '/bookings', icon: Calendar },
    { name: 'Technicians', href: '/technicians', icon: Wrench },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Services', href: '/services', icon: Layers },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-primary tracking-tight">Repargo<span className="text-secondary text-sm ml-1">Admin</span></h1>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-light hover:text-primary rounded-lg transition-colors group font-medium"
                        >
                            <Icon className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        A
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">Admin User</p>
                        <p className="text-gray-500">admin@repargo.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
