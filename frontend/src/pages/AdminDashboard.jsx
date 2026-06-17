import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to Load Dashboard");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
          marginBottom: "30px",
        }}
      >
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "250px",
            padding: "30px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2>Total Users</h2>
          <h1>{stats.totalUsers}</h1>
        </div>

        <div
          style={{
            width: "250px",
            padding: "30px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2>Total Stores</h2>
          <h1>{stats.totalStores}</h1>
        </div>

        <div
          style={{
            width: "250px",
            padding: "30px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2>Total Ratings</h2>
          <h1>{stats.totalRatings}</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;