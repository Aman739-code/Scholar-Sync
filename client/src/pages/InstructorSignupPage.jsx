import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instructorSignup } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function InstructorSignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", facultyId: "", department: "Computer Science", specialization: "" });
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
      const res = await instructorSignup(form);
      loginUser(res.data.user, res.data.token);
      navigate("/instructor/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 linear-soul"></div>
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold font-manrope text-on-surface">ScholarSync</Link>
          <span className="ml-2 text-[10px] font-bold bg-primary text-on-primary px-2 py-0.5 rounded-full uppercase">Instructor</span>
          <p className="text-on-surface-variant mt-2">Create your instructor account</p>
        </div>

        {error && <div className="bg-error-container text-on-error-container px-4 py-3 rounded-3xl mb-6 text-sm font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm" placeholder="Dr. Jane Smith" />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Faculty ID</label>
            <input type="text" name="facultyId" value={form.facultyId} onChange={handleChange} required
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm" placeholder="FAC-CS-XXX" />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm" placeholder="instructor@scholarsync.edu" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Department</label>
              <select name="department" value={form.department} onChange={handleChange}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm">
                <option>Computer Science</option><option>Mathematics</option><option>Humanities</option><option>Engineering</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Specialization</label>
              <input type="text" name="specialization" value={form.specialization} onChange={handleChange}
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm" placeholder="AI, Databases..." />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm" placeholder="Min 6 characters" />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Confirm Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm" placeholder="Re-enter password" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-on-surface-variant">Already have an account? <Link to="/instructor/login" className="text-primary font-bold hover:underline">Sign In</Link></p>
          <p className="text-sm text-on-surface-variant">Are you a student? <Link to="/signup" className="text-primary font-bold hover:underline">Student Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}
