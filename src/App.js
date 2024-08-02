import './App.css';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/********** COMPONENTS **********/
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import Favorites from './components/Favorites';
import NotFound from './components/NotFound';
import SlackCallback from './components/SlackCallback';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Logout from './components/Logout';
import Orders from './components/Orders';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header></Header>
        <Routes>
          <Route path='/login' element={<Login></Login>} />
          <Route path='/logout' element={<Logout></Logout>} />
          <Route path='/slack/callback' element={<SlackCallback />} />
          <Route path='/' element={<PrivateRoute component={<Home />} />} />
          <Route
            path='/products/:providerName'
            element={<PrivateRoute component={<Products />} />}
          />
          <Route
            path='/favorites'
            element={<PrivateRoute component={<Favorites />} />}
          />
          <Route
            path='/admin'
            element={<PrivateRoute component={<Admin />} />}
          />
          <Route
            path='/orders'
            element={<PrivateRoute component={<Orders />} />}
          />
          <Route path='*' element={<PrivateRoute component={<NotFound />} />} />
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
