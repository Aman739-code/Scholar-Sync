import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instructorLogin } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function InstructorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await instructorLogin(email, password);
      loginUser(res.data.user, res.data.token);
      navigate("/instructor/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 linear-soul"></div>
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold font-manrope text-on-surface">ScholarSync</Link>
          <span className="ml-2 text-[10px] font-bold bg-primary text-on-primary px-2 py-0.5 rounded-full uppercase">Instructor</span>
          <p className="text-on-surface-variant mt-2">Sign in to your instructor portal</p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container px-4 py-3 rounded-3xl mb-6 text-sm font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body text-sm"
              placeholder="instructor@scholarsync.edu" />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body text-sm"
              placeholder="Enter your password" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-on-surface-variant">
            Don't have an account? <Link to="/instructor/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
          </p>
          <p className="text-sm text-on-surface-variant">
            Are you a student? <Link to="/login" className="text-primary font-bold hover:underline">Student Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
