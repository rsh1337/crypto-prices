import { ChakraProvider } from "@chakra-ui/react";
import theme from "../utils/theme";
import { SWRConfig } from "swr";
import { swrOptions } from "../utils/api";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={swrOptions}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
