import { defineConfig } from 'vite';

export default defineConfig({
    define: {
        'process.env': {
            VITE_WEATHER_KEY: JSON.stringify(process.env.VITE_WEATHER_KEY),
            VITE_API_CLIENT_ID: JSON.stringify(process.env.VITE_API_CLIENT_ID),
            VITE_API_CLIENT_KEY: JSON.stringify(process.env.VITE_API_CLIENT_KEY),
            VITE_API_YOUTUBE_KEY: JSON.stringify(process.env.VITE_API_YOUTUBE_KEY),
        },
    },
});


