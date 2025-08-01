import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { Toaster } from 'react-hot-toast'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
        <>
        <App {...props} />
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </>);
    },
    progress: {
        color: 'oklch(79.2% 0.209 151.711)',
        includeCSS: true,
        showSpinner: true,
    },
});

// This will set light / dark mode on load...
initializeTheme();
