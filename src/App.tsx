import { Route, Routes } from 'react-router-dom';
import './App.css';
import FormContact from './components/Contact/FormContact';
import Home from './components/Home/Home';
import MainLayout from './components/MainLayout/MainLayout';

function App() {
  return (
    <MainLayout>
      {({ theme, setTheme }) => (
        <Routes>          
          <Route path="/" element={<Home theme = { theme } setTheme = { setTheme } />} />
          <Route path = "/contact" element = { <FormContact theme = { theme } setTheme = { setTheme } /> } />
        </Routes>
      )}
    </MainLayout>
  );
}

export default App;