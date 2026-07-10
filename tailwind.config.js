/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        amber: '#F2A104',
        body: '#5E5E5E',
        mute: '#AFAFAF',
        canvas: '#EFEFEF',
        error: '#BA1A1A',
      },
      fontFamily: {
        sans: ['Inter'],
        inter: ['Inter'],
        'inter-light': ['Inter-Light'],
        'inter-medium': ['Inter-Medium'],
        'inter-semibold': ['Inter-SemiBold'],
        'inter-bold': ['Inter-Bold'],
        'inter-extrabold': ['Inter-ExtraBold'],
        'inter-black': ['Inter-Black'],
      },
      borderRadius: {
        sm: '8px',
        DEFAULT: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
      },
    },
  },
  plugins: [],
};
