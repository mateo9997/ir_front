import { AppProps } from "next/app";
import { UserProvider } from '../components/UserContext';
import "../styles/globals.css"; // Import the Tailwind CSS file

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
