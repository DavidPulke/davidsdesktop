import { defineConfig } from 'vite';

export default defineConfig({
    define: {
        'process.env.VITE_API_CLIENT_ID': "",
        'process.env.VITE_API_CLIENT_KEY': "",
        'process.env.VITE_API_YOUTUBE_KEY': "",
        'process.env.VITE_WEATHER_KEY': "",
    },
});



