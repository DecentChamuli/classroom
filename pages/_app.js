import '../styles/globals.scss'
import Header from '../components/Header'
import Devmode from '../components/Devmode' // Not for Production
import { AuthContextProvider } from '../stores/authContext'
import { FullPageLoader } from '../components/Loader'

function MyApp({ Component, pageProps }) {

  return (
    <AuthContextProvider>
        <FullPageLoader/>
        <Header />
        <Component {...pageProps} />
        <Devmode />
    </AuthContextProvider>
  )
}

export default MyApp