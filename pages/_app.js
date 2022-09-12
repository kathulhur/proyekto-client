// import App from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Head from 'next/head'
import Script from 'next/script'
import '../styles.css'

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
        fields: {
            clients: {
            merge(exiting, incoming) {
                return incoming
            }
            },
            projects: {
            merge(exiting, incoming) {
                return incoming
            }
            }
        }
        }
    }
})
  
const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
})

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Project Management</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Web site created using create-react-app"
                />
                
                
            </Head>
            <Script 
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"
                strategy="beforeInteractive"
            >
            </Script>
            <div className='container'>
                <ApolloProvider client={client}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </div>
        </>
    )
}
  
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
  
  export default MyApp