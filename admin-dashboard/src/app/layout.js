import './globals.css';
import Sidebar from '../components/Sidebar';

export const metadata = {
    title: 'Repairgo Admin Dashboard',
    description: 'Manage bookings, technicians, users, and analytics.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="flex h-screen bg-gray-100 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </body>
        </html>
    );
}
