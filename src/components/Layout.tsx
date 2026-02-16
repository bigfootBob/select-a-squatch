import React, { type ReactNode } from 'react';
import sasquatchImg from '../assets/Sasquatch-CYOA.png';

interface LayoutProps {
    children: ReactNode;
    headerTitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, headerTitle = "Choose Your Own Squatch" }) => {
    return (
        <div className="min-h-screen bg-stone-900 text-amber-50 font-serif flex flex-col">
            <header className="p-4 bg-stone-800 border-b-4 border-amber-700 shadow-lg text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {/* Abstract forest pattern or texture could go here */}
                </div>
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <img src={sasquatchImg} alt="Sasquatch Silhouette" className="h-32 w-auto drop-shadow-md rounded-lg border-2 border-amber-900/50" />
                    <h1 className="text-3xl md:text-5xl font-bold tracking-wider text-amber-500 drop-shadow-lg">{headerTitle}</h1>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl flex flex-col gap-6">
                {children}
            </main>

            <footer className="p-4 text-center text-stone-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Sasquatch Labs. Proceed with caution.</p>
            </footer>
        </div>
    );
};

export default Layout;
