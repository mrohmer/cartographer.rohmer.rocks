/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'forest': '#186f3a',
        'village': '#6a1e09',
        'farm': '#9a6533',
        'water': '#005690',
        'monster': '#611e7f',
        'mountain': '#A4918A',
        'wasteland': '#555',
      },
      transitionProperty: {
        'border-width': 'border-width',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
      },
    }
  },
  plugins: [
    ({addBase, theme}) => {
      const extractColorVars = (colorObj, colorGroup = '') => {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === 'string'
              ? {[`--color${colorGroup}-${colorKey}`]: value}
              : extractColorVars(value, `-${colorKey}`);

          return {...vars, ...newVars};
        }, {});
      };

      addBase({
        ':root': extractColorVars(theme('colors'))
      });
    }
  ],
}
