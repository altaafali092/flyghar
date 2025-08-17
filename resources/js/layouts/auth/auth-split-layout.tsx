import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren, useState, useEffect } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array of professional background images related to login pages, authentication screens, and digital interfaces
    const backgroundImages = [
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Digital login form
        'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Login interface design
        'https://images.unsplash.com/photo-1586528116493-a029325540d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Secure login page
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Authentication interface
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Login screen design


    ];

    // Change background image on component mount
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        setCurrentImageIndex(randomIndex);
    }, []);

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Left Side - Branding with Dynamic Background Image */}
            <div className="relative hidden h-full flex-col p-10 text-white lg:flex overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000" style={{
                    backgroundImage: `url("${backgroundImages[currentImageIndex]}")`
                }} />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Logo and Brand */}
                <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium">
                    <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                    <span className="text-xl font-semibold text-white">{name}</span>
                </Link>

                {/* Welcome Message */}
                <div className="relative z-20 mt-16 flex-1 flex flex-col justify-center">
                    <div className="max-w-sm">
                        <h1 className="text-3xl font-bold leading-tight mb-4">
                            Welcome back
                        </h1>
                        <p className="text-lg text-gray-200 leading-relaxed">
                            Access your dashboard and manage your business operations efficiently.
                        </p>
                    </div>
                </div>

                {/* Quote Section */}
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:p-8 bg-white">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
                    {/* Mobile Logo */}
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
                        <AppLogoIcon className="h-10 fill-current text-gray-800" />
                        <span className="ml-2 text-lg font-semibold text-gray-900">{name}</span>
                    </Link>

                    {/* Form Header */}
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>

                    {/* Form Content */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
