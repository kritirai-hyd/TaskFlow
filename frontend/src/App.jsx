import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Tasks from "./pages/Tasks";
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
     <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
     <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>}/>
       <Route path="/projects/:projectId" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>}/>
      <Route path="/tasks" element={ <ProtectedRoute> <Tasks /></ProtectedRoute> } />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
    </>
  )
}
export default App
