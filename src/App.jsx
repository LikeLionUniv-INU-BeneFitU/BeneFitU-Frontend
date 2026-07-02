import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';
import GlobalStyle from './styles/GlobalStyle';
import Splash from './pages/Splash';
import LoginHome from './pages/Loginhome';
import BasicInfo from './pages/BasicInfo';
import OtherInfo from './pages/OtherInfo';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login-home" element={<LoginHome />} />
          <Route path="/basic-info" element={<BasicInfo />} />
          <Route path="/other-info" element={<OtherInfo />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
