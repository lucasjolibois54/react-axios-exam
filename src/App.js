import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import AxiosNoStyling from './pages/AxiosNoStyling';
import './App.css';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/axios-no-styling" element={<AxiosNoStyling />} />
    </Routes>
    </>
  );
}

export default App;
