import { useState } from "react";
import api from "../../api/axios";
import { useToast } from "../../context/ToastContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
const { showToast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

   showToast(
  res.data.message,
  "success"
);

} catch (err) {
  showToast(
    err.response?.data?.message ||
    "Something went wrong",
    "error"
  );
}
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button>
        Register
      </button>
    </form>
  );
}

export default Register;