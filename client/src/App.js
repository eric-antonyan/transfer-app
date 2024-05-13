import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './screens/Regsiter';
import { AnimatePresence } from 'framer-motion';
import Auth from './screens/Auth';
import RegisterSuccess from './screens/RegisterSuccess';
import Home from './screens/Home';

const App = () => {
  return (
    <AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/auth' element={<Auth />}></Route>
          <Route path='/success' element={<RegisterSuccess />}></Route>
          <Route path='/go' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;