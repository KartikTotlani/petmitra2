// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this is correct
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#5f6FFF'
      }
    },
  },
  plugins: [],
};
