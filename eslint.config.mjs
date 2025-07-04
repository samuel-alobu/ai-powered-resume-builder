import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 1) Bring in the Next / Prettier presets
  ...compat.extends(
    "next/core-web-vitals", // Next.js strict rules
    "next/typescript", // TS rules if you’re using TS
    "prettier", // Disables stylistic rules that clash with Prettier
  ),

  // 2) Your own tweaks
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
    },
  },
];
