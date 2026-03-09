import React from 'react';
import sasquatchImg from '../assets/Sasquatch-CYOA.png';
import backgroundImageJpg from '../assets/images/sas-back.jpg';

const Layout = ({ children, headerTitle = "Select A Squatch" }) => {
    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(12, 10, 9, 0.88), rgba(12, 10, 9, 0.88)), url(${backgroundImageJpg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#0c0a09'
    };

    return (
        <div
            className="min-h-screen text-amber-50 font-serif flex flex-col"
            style={backgroundStyle}
        >
            {/* Global bigfooterotica.pro Navigation */}
            <nav className="bg-black text-amber-500 py-3 px-6 flex justify-between items-center border-b border-amber-900/50">
                <div className="font-bold text-xl tracking-widest font-sans">
                    <a href="/" className="hover:text-amber-400 transition-colors">
                        BIGFOOT<span className="text-stone-400">EROTICA</span>.PRO
                    </a>
                </div>
                <div className="text-sm font-sans text-stone-400">
                    <span className="hidden sm:inline">Current Activity: </span>
                    <span className="text-amber-200">Select-a-Squatch</span>
                </div>
            </nav>

            <header className="p-4 bg-stone-900/80 backdrop-blur-md border-b-4 border-amber-700/40 shadow-xl text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {/* Abstract forest pattern or texture could go here */}
                </div>
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <img src={sasquatchImg} alt="Sasquatch Silhouette" className="h-32 w-auto drop-shadow-md rounded-lg border-2 border-amber-900/50" />
                    <h1 className="text-3xl md:text-5xl font-bold tracking-wider text-amber-500 drop-shadow-lg">{headerTitle}</h1>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl flex flex-col gap-6 relative z-10">
                {children}
            </main>

            <footer className="p-4 text-center text-stone-500 text-sm bg-black/60 mt-auto">
                <p>&copy; {new Date().getFullYear()} <a href="/" className="hover:text-amber-400 transition-colors">bigfooterotica.pro</a>. Proceed with caution.</p>
                <div className="mt-2 space-x-4">
                    <a href="#" className="hover:text-amber-300 transition-colors">All Activities</a>
                    <a href="#" className="hover:text-amber-300 transition-colors">About</a>
                    <a href="#" className="hover:text-amber-300 transition-colors">Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
