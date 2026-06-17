import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/";
  };

  return (
    <nav
      style={{
        background: "#2563eb",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Store Rating Platform</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {!token ? (
          <>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/stores"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Stores
            </Link>

            {role === "admin" && (
              <>
                <Link
                  to="/admin-dashboard"
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </Link>

                <Link
                  to="/admin-users"
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Users
                </Link>
                <Link
              to="/admin-stores"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Admin Stores
            </Link>
              </>
            )}

            <Link
              to="/change-password"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Change Password
            </Link>

            <button
              onClick={logout}
              style={{
                padding: "8px 12px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;