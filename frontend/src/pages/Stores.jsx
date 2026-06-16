import { useEffect, useState } from "react";
import axios from "axios";

function Stores() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [userRating, setUserRating] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/stores"
      );

      setStores(response.data);

      response.data.forEach((store) => {
        fetchAverageRating(store.id);
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchAverageRating = async (storeId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/stores/${storeId}/ratings`
      );

      if (response.data.length > 0) {
        setRatings((prev) => ({
          ...prev,
          [storeId]: response.data[0].average_rating,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitRating = async (storeId) => {
    if (
      !userRating[storeId] ||
      userRating[storeId] < 1 ||
      userRating[storeId] > 5
    ) {
      alert("Please enter a rating between 1 and 5");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/ratings",
        {
          store_id: storeId,
          rating: Number(userRating[storeId]),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Rating Submitted Successfully");

      setUserRating((prev) => ({
        ...prev,
        [storeId]: "",
      }));

      fetchAverageRating(storeId);
    } catch (error) {
      console.log(error);
      alert("Failed to Submit Rating");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "150px",
          fontSize: "24px",
          color: "#2563eb",
        }}
      >
        Loading Stores...
      </div>
    );
  }

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
        Stores List
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#555",
          fontSize: "18px",
          marginBottom: "10px",
        }}
      >
        Welcome to the Store Rating Platform 👋
      </p>

      <p
        style={{
          textAlign: "center",
          color: "#777",
          marginBottom: "30px",
        }}
      >
        Total Stores: {stores.length}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {stores.map((store) => (
          <div
            key={store.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              width: "350px",
              minHeight: "250px",
            }}
          >
            <h2
              style={{
                color: "#2563eb",
                marginBottom: "10px",
              }}
            >
              {store.name}
            </h2>

            <p>📧 {store.email}</p>

            <p>📍 {store.address}</p>

            <p
              style={{
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              ⭐ Average Rating:{" "}
              {ratings[store.id] || "No Ratings"}
            </p>

            <input
              type="number"
              step="1"
              min="1"
              max="5"
              value={userRating[store.id] || ""}
              placeholder="Rate 1-5"
              onChange={(e) =>
                setUserRating({
                  ...userRating,
                  [store.id]: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "15px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <button
              onClick={() => submitRating(store.id)}
              style={{
                width: "100%",
                padding: "10px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Submit Rating
            </button>
          </div>
        ))}
      </div>

      <footer
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Developed by Ishwar Rathod © 2026
      </footer>
    </div>
  );
}

export default Stores;