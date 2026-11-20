// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    adapter: cloudflare(),
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: "Google Sans Code",
            cssVariable: "--font-google-sans-code",
        },
    ],
});
