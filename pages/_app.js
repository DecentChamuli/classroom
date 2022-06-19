import '../styles/globals.scss'
import Header from '../components/Header'
import { AuthContextProvider } from '../stores/authContext'

function MyApp({ Component, pageProps }) {

  return (
    <AuthContextProvider>
      <Header />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp