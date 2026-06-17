import { useEffect, useState } from "react";
import axios from "axios";

function AdminStores() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [storeData, setStoreData] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/stores"
      );

      setStores(response.data);

      response.data.forEach((store) => {
        fetchRating(store.id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRating = async (storeId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/stores/${storeId}/ratings`
      );

      if (response.data.length > 0) {
        setRatings((prev) => ({
          ...prev,
          [storeId]:
            response.data[0].average_rating,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStoreChange = (e) => {
    setStoreData({
      ...storeData,
      [e.target.name]: e.target.value,
    });
  };

  const createStore = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/stores",
        storeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Store Created Successfully");

      setStoreData({
        name: "",
        email: "",
        address: "",
        owner_id: "",
      });

      setSearchTerm("");

      fetchStores();
    } catch (error) {
      console.log(error);
      alert("Failed to Create Store");
    }
  };

  const filteredStores = stores
    .filter(
      (store) =>
        store.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        store.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        store.address
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
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
        }}
      >
        All Stores
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "20px",
        }}
      >
        Total Stores: {stores.length}
      </p>

      <div
        style={{
          background: "#f8fafc",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            color: "#2563eb",
            marginBottom: "15px",
          }}
        >
          Add New Store
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={storeData.name}
          onChange={handleStoreChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Store Email"
          value={storeData.email}
          onChange={handleStoreChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          name="address"
          placeholder="Store Address"
          value={storeData.address}
          onChange={handleStoreChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="number"
          name="owner_id"
          placeholder="Owner ID"
          value={storeData.owner_id}
          onChange={handleStoreChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          onClick={createStore}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Store
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search Store..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          style={{
            width: "350px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
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
          borderCollapse: "collapse",
          background: "white",
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
              Name
            </th>
            <th style={{ padding: "12px" }}>
              Email
            </th>
            <th style={{ padding: "12px" }}>
              Address
            </th>
            <th style={{ padding: "12px" }}>
              Rating
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredStores.map((store) => (
            <tr
              key={store.id}
              style={{
                borderBottom:
                  "1px solid #ddd",
              }}
            >
              <td style={{ padding: "12px" }}>
                {store.name}
              </td>

              <td style={{ padding: "12px" }}>
                {store.email}
              </td>

              <td style={{ padding: "12px" }}>
                {store.address}
              </td>

              <td style={{ padding: "12px" }}>
                ⭐{" "}
                {ratings[store.id] ||
                  "No Ratings"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminStores;