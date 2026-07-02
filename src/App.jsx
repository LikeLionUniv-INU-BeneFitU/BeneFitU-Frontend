import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';
import GlobalStyle from './styles/GlobalStyle';
import BasicInfo from './pages/BasicInfo';
import Splash from './pages/Splash';
import LoginHome from './pages/Loginhome';
import BenefitAll from './pages/BenefitAll';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login-home" element={<LoginHome />} />
          <Route path="/basic-info" element={<BasicInfo />} />
          <Route path="/benefit-all" element={<BenefitAll />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
