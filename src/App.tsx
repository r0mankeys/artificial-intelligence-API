import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider"
import Home from './components/Home';
import NotFound from './components/NotFound';
import Sumarai from './components/Sumarai';
import FaceFinder from './components/FaceFinder';


function App() {
  return (
    <ThemeProvider defaultTheme="system">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api-page/sumarai" element={<Sumarai />} />
            <Route path="/api-page/face-finder" element={<FaceFinder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
    </ThemeProvider>
  )
}



export default App
