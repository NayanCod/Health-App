import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useEffect, useState } from 'react';
import NotFound from './components/NotFound';

function App() {
  const [isAuthneticate, setIsAuthenticate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      setIsAuthenticate(true);
    }else{
      setIsAuthenticate(false);
    }
  }, [])

    return (
        <Router>
            <Routes>
                <Route path="/login" element={isAuthneticate ? <Navigate to="/dashboard" /> : <Login/>} />
                
                <Route path="/dashboard" element={isAuthneticate ? <Dashboard /> : <Navigate to="/login" />} />
                
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
