import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewJob from './NewJob';
import Nav from 'react-bootstrap/Nav';
import EditJob from './EditJob';
import { createContext } from 'react';
import Login from './Login';
import Signup from './Signup';

export const UserContext = createContext(null);

function App() {
  return (
    <Router>
      <Nav
        activeKey="/"
      >
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/newJob">Add New Job</Nav.Link>
        </Nav.Item>
      </Nav>
      <UserContext.Provider value={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/newJob" element={<NewJob />} />
          <Route path="/editJob/:id" element={<EditJob />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
