import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import NewJob from './NewJob';
import Nav from 'react-bootstrap/Nav';
import EditJob from './EditJob';
import { useContext, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import { useCookies } from 'react-cookie';
import { UserContext } from '../contexts/UsersContext';
import JobDataService from '../services/job';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const { user, setUser } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies<string>([]);

  async function handleAuthenticateUser(data: object) {
    return await JobDataService.authenticateUser(data);
  }

  useEffect(() => {
    const verifyCookies = async () => {
      if (!cookies.token) {
        setUser(null);
      }
      try {
        const authenticateResponse: any = await handleAuthenticateUser({});
        if (authenticateResponse.data.status) {
          setUser(authenticateResponse.data.user);
          return authenticateResponse.data.status;
        }
        removeCookie("token");
        setUser(null);
      } catch (error) {
        console.log(error);
      }
    }
    verifyCookies();
  }, []);

  if (user) {
    return (
      <div>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/newJob">Add New Job</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav.Item>
        </Nav>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/newJob" element={<NewJob />} />
            <Route path="/editJob/:id" element={<EditJob />} />
          </Routes>
        </QueryClientProvider>
      </div>)
  } else {
    return (
      <div>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/favourites">Favourites</Nav.Link>
          </Nav.Item>
        </Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>)
  }
}

export default App;
