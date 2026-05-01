import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import ActivityLog from './components/ActivityLog.jsx'; // Importa o componente

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/activity-log" element={<ActivityLog />} /> {/* Nova rota */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;