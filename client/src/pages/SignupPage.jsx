import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", studentId: "", email: "", password: "", confirmPassword: "", department: "Computer Science", year: 1 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const res = await signup(form);
      loginUser(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 linear-soul"></div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-manrope text-on-surface">Create Account</h1>
          <p className="text-on-surface-variant mt-2">Join ScholarSync to start your academic journey</p>
        </div>

        {error && <div className="bg-error-container text-on-error-container px-4 py-3 rounded-3xl mb-6 text-sm font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm" placeholder="Julian Academic" />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Student ID</label>
            <input type="text" name="studentId" value={form.studentId} onChange={handleChange} required className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm" placeholder="STU-2024-XXX" />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm" placeholder="student@scholarsync.edu" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Department</label>
              <select name="department" value={form.department} onChange={handleChange} className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm">
                <option>Computer Science</option><option>Mathematics</option><option>Humanities</option><option>Engineering</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Year</label>
              <select name="year" value={form.year} onChange={handleChange} className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm">
                <option value={1}>Year 1</option><option value={2}>Year 2</option><option value={3}>Year 3</option><option value={4}>Year 4</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm" placeholder="Min 6 characters" />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Confirm Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm" placeholder="Re-enter password" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-on-surface-variant">Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link></p>
          <p className="text-sm text-on-surface-variant">Are you an instructor? <Link to="/instructor/signup" className="text-primary font-bold hover:underline">Instructor Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}
