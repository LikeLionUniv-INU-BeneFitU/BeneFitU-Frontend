import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';
import GlobalStyle from './styles/GlobalStyle';

import Splash from './pages/Splash';
import LoginHome from './pages/Loginhome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InfoIntro from './pages/InfoIntro';
import BasicInfo from './pages/BasicInfo';
import OtherInfo from './pages/OtherInfo';
import InfoComplete from './pages/InfoComplete';
import Home from './pages/Home';
import BenefitAll from './pages/BenefitAll';
import Expectedbenefit from './pages/ExpectedBenefit';
import BenefitDetail from './pages/BenefitDetail';
import ApplyComplete from './pages/ApplyComplete';
import MyPage from './pages/MyPage';
import Applied from './pages/Applied';
import DetailApplied from './pages/DetailApplied';
import MyInfo from './pages/MyInfo';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login-home" element={<LoginHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/info-intro" element={<InfoIntro />} />
          <Route path="/basic-info" element={<BasicInfo />} />
          <Route path="/other-info" element={<OtherInfo />} />
          <Route path="/info-complete" element={<InfoComplete />} />
          <Route path="/home" element={<Home />} />
          <Route path="/benefit" element={<BenefitAll />} />
          <Route path="/expected-benefit" element={<Expectedbenefit />} />
          <Route path="/detail/:benefitId" element={<BenefitDetail />} />
          <Route path="/apply-complete" element={<ApplyComplete />} />
          <Route path="my-page" element={<MyPage />} />
          <Route path="/applied" element={<Applied />} />
          <Route path="detail-applied" element={<DetailApplied />} />
          <Route path="/my-info" element={<MyInfo />} />
          <Route path="/edit-basic" element={<BasicInfo />} />
          <Route path="/edit-other" element={<OtherInfo />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
