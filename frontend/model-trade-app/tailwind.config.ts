import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // theme: {
  //   extend: {
  //     screens: {


  //       'md':'100px',
        

  //     },
   
  //     colors:{
  //       chocolate:'var(--chocolate)',
  //       blue: {
  //         600: '#FF00FF', // Điều chỉnh màu xanh chính xác
  //       },
  //       'bg-custom': '#F0F0F0', // Thêm màu nền tùy chỉnh
  //     },
  //     backgroundImage: {
        
  //     },
  //     keyframes: {
  //       slideInFromLeft: {
  //         '0%': { transform: 'translateX(-100%)' },
  //         '100%': { transform: 'translateX(0)' }
  //       }
  //     },
  //     animation: {
  //       'slide-in-left': 'slideInFromLeft 0.3s ease-out forwards'
  //     },
      
  //   },
  // },
 
  plugins: [],
}
export default config
