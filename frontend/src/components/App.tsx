import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewJob from './NewJob';
import Nav from 'react-bootstrap/Nav';
import EditJob from './EditJob';

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newJob" element={<NewJob />} />
        <Route path="/editJob/:id" element={<EditJob />} />
      </Routes>
    </Router>
  );
}

export default App;
