import React, { lazy, Suspense, useEffect } from 'react'
import HeroSection from '../ui/HeroSection'
import Introduction from '../ui/Introduction'
import Header from '../components/Header';
import EmotionalAttachPage from '../ui/EmotionalAttachPage';
import AboutUs from '../ui/AboutUs';
import LoadingApp from '../ui/LoadingApp';

const herosection = lazy(() => import('../ui/HeroSection'));
const introduction = lazy(() => import('../ui/Introduction'));
const emotionalattachpage = lazy(() => import('../ui/EmotionalAttachPage'));
const aboutus = lazy(() => import('../ui/AboutUs'));
function HomePage() {
    useEffect(() => {
        const container = document.getElementById('confetti');
        const colors = ['#ff0055', '#00ff7f', '#00ccff', '#ffcc00', '#ff00ff', '#ff6600'];

        const timeoutId = setTimeout(() => {
            for (let i = 0; i < 30; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 5 + 's';
                confetti.style.animationDuration = (3 + Math.random() * 3) + 's';
                container.appendChild(confetti);
            }
        }, 100);
        return () => {
            container.innerHTML = '';
            clearTimeout(timeoutId);
        }
    }, []);
    return (
        <>
            <section className='bg-primary-bg w-full h-screen '>
                <Header />
                <div className="confetti-container mt-4 " id="confetti"></div>
                <Suspense fallback={<LoadingApp />}>
                    <HeroSection />
                    <Introduction />
                    <EmotionalAttachPage />
                    <AboutUs />
                </Suspense>
            </section>
        </>
    )
}

export default HomePage
