
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontSize: {
          'tiny': '2px',    // Custom extra small size
          'huge': '10px',     // Custom very large size
        },
      },
    },
    plugins: [plugins],
  };
  