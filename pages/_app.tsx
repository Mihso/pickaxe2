import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'


const myFont = localFont({ src: [
  {path: './fonts/RealHeadPro-Bold.otf'},
  {path:'./fonts/RealHeadPro-Demibold.otf'},
  {path:'./fonts/RealHeadPro-Regular.otf'},
  {path:'./fonts/RealHeadPro-SemiLight.otf'}] })

export default function App({ Component, pageProps }: AppProps) {

  return <Component {...pageProps} />

}
