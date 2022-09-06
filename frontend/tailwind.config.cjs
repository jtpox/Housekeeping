module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    plugins: [require('daisyui')],
    daisyui: {
      themes: [{
          mytheme: {
            "primary": "#967adc",
            "secondary": "#d770ad",
            "accent": "#37bc9b",
            "neutral": "#323133",
            "base-100": "#3c3b3d",
            "info": "#3bafda",
            "success": "#8cc152",
            "warning": "#f6bb42",
            "error": "#da4453",
          },
        }],
    },
  };
  