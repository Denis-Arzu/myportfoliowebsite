
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {

        transformStyle: {
          'preserve-3d': 'preserve-3d',
        },
        rotate: {
          'y-180': 'rotateY(180deg)',
        },
        perspective: {
          1000: '1000px',
        },
        
        fontSize: {
          'tiny': '2px',    // Custom extra small size
          'huge': '10px',     // Custom very large size
        },
      },
    },
    plugins: [plugins],
  };
  