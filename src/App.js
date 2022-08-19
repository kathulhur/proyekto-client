import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';
import UsersPage from './pages/UsersPage'
import UpdateUserPage from './pages/UpdateUserPage'
import CreateUserPage from './pages/CreateUserPage';
import LoginPage from './pages/LoginPage';
import useToken from './useToken';

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


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache
})



function App() {
  const { token, setToken } = useToken();
  console.log('hey');
  if(!token || (token && Object.keys(token).length === 0)) {
    return (
      <>
        <Header/>
        <div className="container">
          <LoginPage setToken={setToken} />
        </div>
      </>
    )
  }

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header setToken={ setToken }/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage setToken={ setToken }/>} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id/edit" element={<UpdateUserPage />} />
              <Route path="/users/create" element={<CreateUserPage />} />
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
