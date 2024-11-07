import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/AuthGuard';
import { Sidebar } from './components/Sidebar';
import { PlayPage } from './pages/PlayPage';
import { CreatePage } from './pages/CreatePage';
import { StageListPage } from './pages/StageListPage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <AuthGuard>
                <div className="flex min-h-screen bg-gray-100">
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<StageListPage />} />
                    <Route path="/play/:id" element={<PlayPage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/my-stages" element={<StageListPage filter="my" />} />
                    <Route path="/popular" element={<StageListPage filter="popular" />} />
                    <Route path="/new" element={<StageListPage filter="new" />} />
                  </Routes>
                </div>
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;