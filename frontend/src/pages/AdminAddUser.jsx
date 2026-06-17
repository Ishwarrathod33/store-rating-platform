import { useState } from "react";
import axios from "axios";

function AdminAddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async (e) => {
    e.preventDefault();
    if (
          formData.name.length < 20 ||
          formData.name.length > 60
        ) {
          alert(
            "Name must be between 20 and 60 characters"
          );
          return;
        }

        if (formData.address.length > 400) {
          alert(
            "Address cannot exceed 400 characters"
          );
          return;
        }

        const passwordRegex =
          /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

        if (!passwordRegex.test(formData.password)) {
          alert(
            "Password must be 8-16 characters and contain at least one uppercase letter and one special character"
          );
          return;
        }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/admin/users",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User Created Successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "user",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to Create User");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "20px",
          }}
        >
          Add New User
        </h1>

        <form onSubmit={createUser}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
            }}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
            }}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">
              Store Owner
            </option>
          </select>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddUser;