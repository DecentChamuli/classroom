import '../styles/globals.scss'
import Header from '../components/Header'
import Devmode from '../components/Devmode'
import { AuthContextProvider } from '../stores/authContext'

function MyApp({ Component, pageProps }) {

  return (
    <AuthContextProvider>
      <Header />
      <Component {...pageProps} />
      <Devmode />
    </AuthContextProvider>
  )
}

export default MyApp