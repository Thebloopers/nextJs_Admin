import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme/theme";
import createEmotionCache from "../src/createEmotionCache";
import FullLayout from "../src/layouts/FullLayout";
import "../styles/style.css";
import {Route,Redirect} from "react-router-dom"
import { isAuthenticated, signin } from "../src/auth";
import Signin from "./signin";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import RouteGuard from "../src/components/authRotes/RouteGuard";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Admin Panel</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <RouteGuard>
      {isAuthenticated() ?
      <ThemeProvider theme={theme}>
            <CssBaseline />
            <FullLayout>
              <Component {...pageProps} />
            </FullLayout>
      </ThemeProvider> :
      <Component {...pageProps} />
      }
      </RouteGuard>      
      </CacheProvider>    
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
