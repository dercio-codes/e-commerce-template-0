import '../styles/globals.css'
import dynamic from 'next/dynamic'

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false
});

function MyApp({ Component, pageProps }) {
  return(
<div>
  <AnimatedCursor innerSize={24}
      outerSize={48}
      color='56, 36, 27'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={2}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link'
      ]} />
   <Component {...pageProps } />
</div>
    )

}

export default MyApp
