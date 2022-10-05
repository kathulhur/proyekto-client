// import App from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Head from 'next/head'
// import '../styles.css'
import Layout from '../src/components/Layout';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

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
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
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
    const getLayout = Component.getLayout || ((page) => page)

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
            {/* <Script 
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossOrigin="anonymous"
                
            /> */}
            <div className='container-fluid'>
                <ApolloProvider client={client}>
                    { getLayout(<Component {...pageProps}/>)}
                </ApolloProvider>
            </div>
        </>
    )
}
  
export default MyApp