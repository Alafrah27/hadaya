import { Gift, QrCode, Sparkles } from "lucide-react";

const FloatingGiftCard = () => (
    <div className="relative w-full animate-fade-scale animate-float">
        <div className="relative w-full h-56 rounded-3xl bg-card shadow-xl border border-border overflow-hidden">

            {/* Card gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 via-transparent to-pink-200/30" />

            {/* Gift icon */}
            <div className="absolute top-4 left-4">
                <Gift className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>

            {/* QR code area */}
            <div className="absolute bottom-4 right-4 w-16 h-16 rounded-2xl bg-white flex items-center justify-center animate-glow-pulse">
                <QrCode className="w-10 h-10 text-primary" aria-hidden="true" />
            </div>

            {/* Text */}
            <div className="absolute bottom-4 left-4">
                <p className="text-xs text-gray-500">From Sarah</p>
                <p className="text-sm font-semibold text-gray-900">With Love ❤️</p>
            </div>

            {/* Sparkle */}
            <Sparkles className="absolute top-3 right-3 w-5 h-5 text-yellow-400 animate-sparkle" />
        </div>
    </div>
);


export default FloatingGiftCard;
