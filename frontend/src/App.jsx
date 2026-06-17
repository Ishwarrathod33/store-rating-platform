import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Stores from "./pages/Stores";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import ChangePassword from "./pages/ChangePassword";
import AdminStores from "./pages/AdminStores";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}/>
        <Route path="/admin-users" element={<AdminUsers />}/>
        <Route path="/change-password" element={<ChangePassword />}/>
        <Route path="/admin-stores" element={<AdminStores />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;