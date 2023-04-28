import { Loader } from 'rsuite'
import ReactDOM from 'react-dom/client'

const LoaderComponent = (loading) => {
   const rootLoader = ReactDOM.createRoot(
      document.getElementById('root-loader')
   )
   if (loading) {
      rootLoader.render(
         <Loader
            className='z-10'
            size={'md'}
            inverse
            backdrop
            content='loading...'
            vertical
         />
      )
   } else {
      rootLoader.render(<></>)
   }
}

export default LoaderComponent
