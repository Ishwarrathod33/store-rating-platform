import { useEffect, useState } from "react";
import axios from "axios";

function StoreOwnerDashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/store-owner/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to Load Dashboard");
    }
  };

  if (!dashboard) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
        }}
      >
        Store Owner Dashboard
      </h1>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.1)",
          marginTop: "20px",
        }}
      >
        <h2>
          Store: {dashboard.storeName}
        </h2>

        <h3>
          Average Rating:
          ⭐ {dashboard.averageRating}
        </h3>
      </div>

      <h2
        style={{
          marginTop: "30px",
          color: "#2563eb",
        }}
      >
        Users Who Rated
      </h2>

      <table
        style={{
          width: "100%",
          background: "white",
          marginTop: "15px",
          borderCollapse: "collapse",
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
              Name
            </th>

            <th style={{ padding: "12px" }}>
              Email
            </th>

            <th style={{ padding: "12px" }}>
              Rating
            </th>
          </tr>
        </thead>

        <tbody>
          {dashboard.users.map(
            (user, index) => (
              <tr key={index}>
                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {user.name}
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {user.email}
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  ⭐ {user.rating}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StoreOwnerDashboard;