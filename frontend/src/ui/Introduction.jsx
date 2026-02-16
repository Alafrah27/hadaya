import { Gift, Share2, Heart } from "lucide-react";
import React from "react";
import { useLanguage } from "../context/LanguageContext";

function Introduction() {
    const { t } = useLanguage();

    const steps = [
        {
            id: 1,
            title: t('intro_step1_title'),
            description: t('intro_step1_desc'),
            icon: Gift,
            color: "text-rose-500",
            bg: "bg-rose-100",
        },
        {
            id: 2,
            title: t('intro_step2_title'),
            description: t('intro_step2_desc'),
            icon: Share2,
            color: "text-blue-500",
            bg: "bg-blue-100",
        },
        {
            id: 3,
            title: t('intro_step3_title'),
            description: t('intro_step3_desc'),
            icon: Heart,
            color: "text-pink-500",
            bg: "bg-pink-100",
        },
    ];

    return (
        <section className="w-full mt-32 bg-gradient-to-b from-white to-gray-50 py-20">
            <div className="w-full px-0 md:px-6">
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-rose-200 rounded-full blur-3xl opacity-30"></div>

                {/* Header */}
                <div className="text-center mb-16 px-4">
                    <h2 className="text-4xl font-bold text-gray-900">
                        {t('intro_title')}
                    </h2>
                    <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
                        {t('intro_subtitle')}
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid gap-8 md:grid-cols-3 w-full px-3">
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.id}
                                className="w-full group flex items-start gap-4 bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                            >
                                {/* Icon */}
                                <div
                                    className={`w-18 h-18 ${step.bg} rounded-full p-2 flex items-center justify-center`}
                                >
                                    <Icon className={`w-6 h-6 ${step.color}`} />
                                </div>

                                {/* Title */}
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Introduction;
