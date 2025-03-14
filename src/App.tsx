import { Route, Routes } from 'react-router-dom';
import './App.css';
import FormContact from './components/Contact/FormContact';
import Home from './components/Home/Home';
import MainLayout from './components/MainLayout/MainLayout';

function App() {  
  return (
    <MainLayout>
      <Routes>        
        <Route path="/infracciones" element={<Home />} />
        <Route path="/contact" element={<FormContact />} />  
      </Routes>
    </MainLayout>
  )
}

export default App;