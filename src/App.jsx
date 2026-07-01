import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './styles/AppLayout';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>{/*경로 추가 */}</Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
