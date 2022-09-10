import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, concat } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';
import UsersPage from './pages/UsersPage'
import UpdateUserPage from './pages/EditUserPage'
import CreateUserPage from './pages/CreateUserPage';
import LoginPage from './pages/LoginPage';
import useToken from './useToken';
import SignupPage from './pages/SignupPage';
import ClientsPage from './pages/ClientsPage';
import CreateClientPage from './pages/CreateClientPage';
import EditClientPage from './pages/EditClientPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectsPage from './pages/ProjectsPage';
import UserPage from './pages/UserPage'

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
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache
})



function App() {
  const { token, setToken } = useToken();


  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage setToken={ setToken }/>} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/clients/create" element={<CreateClientPage />} />
                <Route path="/clients/:id/edit" element={<EditClientPage />} />
                <Route path="/users/create" element={<CreateUserPage />} />
                <Route path="/users/:id" element={<UserPage />} />
                <Route path="/users/:id/edit" element={<UpdateUserPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/create" element={<CreateProjectPage />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
