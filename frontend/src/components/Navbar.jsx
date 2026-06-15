import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        borderBottom: "1px solid black",
      }}
    >
      <Link to="/">Login</Link>

      <Link to="/register">Register</Link>

      <Link to="/stores">Stores</Link>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;