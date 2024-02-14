import { defineStyleConfig, extendTheme } from '@chakra-ui/react';
import { Montserrat } from 'next/font/google';

const montSerrat = Montserrat({
  weight: ['700', '400'],
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
  preload: true,
  subsets: ['latin'],
});

export const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: 'white',
      },
    }),
  },
  colors: {
    white: '#EFEDEA',
    black: '#9A999E',
    red: '#e83b31',
    blue: '#1E90FF',
  },
  fonts: {
    heading: montSerrat.style.fontFamily,
    body: montSerrat.style.fontFamily,
    mono: montSerrat.style.fontFamily,
  },
  components: {
    Button: defineStyleConfig({
      variants: {
        primary: {
          bg: 'blue',
          color: 'white',
        },
        secondary: {
          bg: 'white',
          color: 'blue',
          border: '1px solid',
          borderColor: 'blue',
        },
      },
    }),
  },
});
