import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const scrollTargetRef = useRef({ target: 0, current: 0 });

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let animationFrameId = null;

        // Linear interpolation function
        const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

        const handleScroll = () => {
            // Map scroll to fraction (0 → 1)
            const scrollPosition = window.scrollY;
            const animationScrollRange = 700; 
            const scrollFraction = Math.min(scrollPosition / animationScrollRange, 1);
            scrollTargetRef.current.target = scrollFraction;
        };

        const animateVideo = () => {
            const { target, current } = scrollTargetRef.current;
            const newCurrent = lerp(current, target, 0.12); // smoother & faster
            scrollTargetRef.current.current = newCurrent;

            if (video.duration) {
                video.currentTime = video.duration * newCurrent;
            }

            animationFrameId = requestAnimationFrame(animateVideo);
        };

        const onLoadedMetadata = () => {
            window.addEventListener('scroll', handleScroll, { passive: true });
            animateVideo();
        };

        video.addEventListener('loadedmetadata', onLoadedMetadata);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
        };
    }, []);

    const handleOrderNow = () => {
        navigate('/products');
    };

    return (
        <div className="flex items-center bg-orange-50/80 min-h-[70vh] py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                
                {/* Text */}
                <div className="md:col-span-2 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight mb-4">
                        The Perfect Baked Cake Everyday!
                    </h1>
                    <p className="text-lg text-slate-700 mb-8">
                        Freshly baked goods, crafted with passion and the finest ingredients to bring you a little slice of heaven.
                    </p>
                    <button
                        onClick={handleOrderNow}
                        className="bg-amber-500 text-white px-8 py-3 rounded-md hover:bg-amber-600 transition-colors duration-100 font-semibold shadow-lg text-lg"
                    >
                        Order Now
                    </button>
                </div>

                {/* Video */}
                <div className="md:col-span-3 flex justify-center items-center">
                    <video
                        ref={videoRef}
                        src="/videos/fasterone.mp4"
                        className="w-full h-auto rounded-lg shadow-2xl"
                        playsInline
                        muted
                        preload="auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
