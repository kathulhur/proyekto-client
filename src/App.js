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
import SignupPage from './pages/SignupPage';

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
  uri: 'https://proyekto-app.herokuapp.com/graphql',
  cache
})



function App() {
  const { token, setToken } = useToken();


  return (
    <>
      <ApolloProvider client={client}>
        <Header/>
        <Router>
          <div className="container">
            {
              (!token || (token && Object.keys(token).length === 0)) ?
              <>
              
              <Routes>
                <Route path="/login" element={<LoginPage setToken={ setToken }/>} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<LoginPage setToken={ setToken }/>} />
              </Routes>
              </>
              :
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage setToken={ setToken }/>} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/:id/edit" element={<UpdateUserPage />} />
                <Route path="/users/create" element={<CreateUserPage />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            } 
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
