export default {
  "*.{js,jsx}": ["eslint --fix"],
  "*.{ts,tsx}": [() => "tsc --project tsconfig.json", "eslint --fix"],
};
