import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../Common/Input";
import Button from "../Common/Button";
import FeedbackMessage from "../Common/FeedbackMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: "", type: "" }); // Clear previous feedback

    if (password !== confirmPassword) {
      setFeedback({ message: "Passwords do not match", type: "error" });
      return;
    }

    const result = await register(email, password);

    if (result.success) {
      
    } else {
      setFeedback({
        message: result.message || "Registration failed",
        type: "error",
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <FeedbackMessage message={feedback.message} type={feedback.type} />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
      <div className="form-links">
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
