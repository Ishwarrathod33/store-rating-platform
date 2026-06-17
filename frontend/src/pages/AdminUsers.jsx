import { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to Load Users");
    }
  };

  const filteredUsers = users
  .filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    }

    return b.name.localeCompare(a.name);
  });

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "10px",
        }}
      >
        All Users
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "25px",
        }}
      >
        Total Users: {filteredUsers.length}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search by Name or Email"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          style={{
            width: "350px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />
      </div>
      <div
    style={{
        textAlign: "center",
        marginBottom: "20px",
    }}
    >
    <button
        onClick={() =>
        setSortOrder(
            sortOrder === "asc"
            ? "desc"
            : "asc"
        )
        }
        style={{
        padding: "10px 15px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        }}
    >
        Sort Name {sortOrder === "asc" ? "↑" : "↓"}
    </button>
    </div>
      <table
        style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#2563eb",
              color: "white",
            }}
          >
            <th style={{ padding: "12px" }}>
              ID
            </th>
            <th style={{ padding: "12px" }}>
              Name
            </th>
            <th style={{ padding: "12px" }}>
              Email
            </th>
            <th style={{ padding: "12px" }}>
              Address
            </th>
            <th style={{ padding: "12px" }}>
              Role
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr
                key={user.id}
                style={{
                  borderBottom:
                    "1px solid #ddd",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  {user.id}
                </td>

                <td style={{ padding: "12px" }}>
                  {user.name}
                </td>

                <td style={{ padding: "12px" }}>
                  {user.email}
                </td>

                <td style={{ padding: "12px" }}>
                  {user.address}
                </td>

                <td
                  style={{
                    padding: "12px",
                    fontWeight: "bold",
                    color:
                      user.role === "admin"
                        ? "#dc2626"
                        : "#16a34a",
                  }}
                >
                  {user.role}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#666",
                }}
              >
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;