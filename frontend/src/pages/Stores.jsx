import { useEffect, useState } from "react";
import axios from "axios";

function Stores() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [userRating, setUserRating] = useState({});

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
      const response = await axios.get(
        "http://localhost:5000/api/stores"
      );

      setStores(response.data);

      response.data.forEach((store) => {
        fetchAverageRating(store.id);
      });
    } catch (error) {
      console.log(error);
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

      fetchAverageRating(storeId);
    } catch (error) {
      console.log(error);
      alert("Failed to Submit Rating");
    }
  };

  return (
    <div>
      <h1>Stores List</h1>

      {stores.map((store) => (
        <div
          key={store.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h3>{store.name}</h3>

          <p>Email: {store.email}</p>

          <p>Address: {store.address}</p>

          <p>
            Average Rating:{" "}
            {ratings[store.id] || "No Ratings"}
          </p>

          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rate 1-5"
            onChange={(e) =>
              setUserRating({
                ...userRating,
                [store.id]: e.target.value,
              })
            }
          />

          <button
            onClick={() => submitRating(store.id)}
          >
            Submit Rating
          </button>
        </div>
      ))}
    </div>
  );
}

export default Stores;