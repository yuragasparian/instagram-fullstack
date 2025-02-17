import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './index.css'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import App from './App';
import Explore from './pages/Explore';
import Search from './pages/Search';
import Profile from './pages/Profile';

createRoot(document.getElementById('root')!).render(
  <Router>
      <Routes>
        <Route element={<App />} >
          <Route index element={<Home />}/>
          <Route path='/explore' element={<Explore />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/:username' element={<Profile />}/>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Router>
)
