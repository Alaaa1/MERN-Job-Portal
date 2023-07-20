import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-cookie";
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from './components/UsersContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <UserProvider><App /></UserProvider>
  </BrowserRouter>

);