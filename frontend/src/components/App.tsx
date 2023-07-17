import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewJob from './NewJob';
import Nav from 'react-bootstrap/Nav';
import EditJob from './EditJob';
import { createContext, useState } from 'react';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
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
          <Route path="/newJob" element={<NewJob />} />
          <Route path="/editJob/:id" element={<EditJob />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
