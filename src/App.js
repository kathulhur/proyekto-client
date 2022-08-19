import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
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


  return (
    <>
      <ApolloProvider client={client}>
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
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/clients/create" element={<CreateClientPage />} />
                <Route path="/clients/:id/edit" element={<EditClientPage />} />
                <Route path="/users/create" element={<CreateUserPage />} />
                <Route path="/users/:id/edit" element={<UpdateUserPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/create" element={<CreateProjectPage />} />
                <Route path="/projects/:id" element={<Project />} />
                {/* <Route path="/projects/:id/edit" element={<EditProjectPage />} /> */}
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
