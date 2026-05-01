import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import ActivityLog from './components/ActivityLog.jsx';
import Success from './components/Success.jsx'; // Importando o novo componente

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/activity-log" element={<ActivityLog />} />
        <Route path="/success" element={<Success />} /> {/* Nova rota de sucesso */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;