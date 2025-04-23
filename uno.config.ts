import { defineConfig, presetIcons, presetWind3 } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["src/**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}"],
  },
  presets: [presetWind3(), presetIcons()],
});
