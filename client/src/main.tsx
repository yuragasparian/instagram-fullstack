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
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Create from './pages/Create';

createRoot(document.getElementById('root')!).render(
  <Router>
      <Routes>
        <Route element={<App />} >
          <Route index element={<Home />}/>
          <Route path='/explore' element={<Explore />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/messages' element={<Messages />}/>
          <Route path='/:username' element={<Profile />}/>
          <Route path='/notifications' element={<Notifications />}/> 
          <Route path='/create' element={<Create />}/> 
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Router>
)
