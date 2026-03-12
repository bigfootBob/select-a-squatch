import React from 'react';
import sasquatchImg from '../assets/Sasquatch-CYOA.png';
import backgroundImageJpg from '../assets/images/sas-back.jpg';
import styles from './Layout.module.scss';

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
            className={styles.layoutWrapper}
            style={backgroundStyle}
        >
            {/* Global bigfooterotica.pro Navigation */}
            <nav className={styles.globalNav} aria-label="Main Navigation">
                <div className={styles.navLogo}>
                    <a href="/" aria-label="Bigfoot Erotica Pro Home">
                        BIGFOOT<span>EROTICA</span>.PRO
                    </a>
                </div>
                <div className={styles.navStatus}>
                    <span className="hidden-mobile">Current Activity: </span>
                    <span className={styles.highlight}>Select-a-Squatch</span>
                </div>
            </nav>

            <header className={styles.header}>
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {/* Abstract forest pattern or texture could go here */}
                </div>
                <div className={styles.headerContent}>
                    <img src={sasquatchImg} alt="Sasquatch Silhouette" className={styles.headerImg} />
                    <h1 className={styles.headerTitle}>{headerTitle}</h1>
                </div>
            </header>

            <main className={styles.mainContent}>
                {children}
            </main>

            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} <a href="/">bigfooterotica.pro</a>. Proceed with caution.</p>
                <div className={styles.footerLinks} aria-label="Footer Links">
                    <a href="/activities" rel="noopener noreferrer">All Activities</a>
                    <a href="/about" rel="noopener noreferrer">About</a>
                    <a href="/contact" rel="noopener noreferrer">Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
