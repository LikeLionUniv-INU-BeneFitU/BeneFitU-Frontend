import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';
import GlobalStyle from './styles/GlobalStyle';
import BasicInfo from './pages/BasicInfo';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppLayout>
        <Routes>
          <Route path="/basic-info" element={<BasicInfo />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
