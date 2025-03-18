module.exports = {
    extends: ["eslint:recommended", "plugin:svelte/recommended", "prettier"],
    plugins: ["svelte"],
    overrides: [{ files: ["*.svelte"], processor: "svelte/svelte" }],
    env: { es2021: true, browser: true },
  };