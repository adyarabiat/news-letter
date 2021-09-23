import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
   return (
      <Layout>
         {/* So we set a general Head here but when we write specific one in the pages it will change the one here and it will take the one which is there */}
         <Head>
            <title>Next Events</title>
            <meta name="description" content="nice events" />
            <meta name="viewport" content="initial-scale=1.0" width="device-width" />
         </Head>
         <Component {...pageProps} />
      </Layout>
   );
}

export default MyApp;
