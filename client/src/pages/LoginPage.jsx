import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <main className="flex-grow flex items-center justify-center px-6 pt-12 pb-12 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-surface-container-low rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-primary-container/20 rounded-full blur-[100px] opacity-40"></div>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-3">Welcome back.</h1>
          <p className="text-on-surface-variant font-body">Access your courses, research, and assignments in one curated space.</p>
        </div>

        <div className="bg-surface-container-lowest p-10 rounded-4xl shadow-[0_32px_64px_-15px_rgba(43,52,55,0.06)] relative">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-on-surface-variant font-label px-1" htmlFor="student_id">Email or Student ID</label>
              <input className="w-full bg-surface-container-low border-none rounded-3xl px-4 py-3 text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" id="student_id" name="student_id" placeholder="julian.academic@university.edu" type="text" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-medium text-on-surface-variant font-label" htmlFor="password">Password</label>
                <a className="text-xs font-semibold text-primary hover:text-primary-dim transition-colors" href="#">Forgot Password?</a>
              </div>
              <input className="w-full bg-surface-container-low border-none rounded-3xl px-4 py-3 text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" id="password" name="password" placeholder="••••••••••••" type="password" />
            </div>
            <Link to="/dashboard" className="block w-full linear-soul text-on-primary py-4 rounded-full font-manrope font-bold text-base hover:shadow-lg transition-all active:scale-95 active:opacity-90 mt-4 text-center">
              Login to Dashboard
            </Link>
          </form>

          <div className="mt-10 pt-8 border-t border-surface-container text-center">
            <p className="text-on-surface-variant text-sm font-body">
              New to ScholarSync?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 ml-1">Create a student account</Link>
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span className="text-xs font-label font-medium uppercase tracking-widest">Secure Portal</span>
          </div>
          <div className="w-1 h-1 bg-outline-variant rounded-full"></div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">account_balance</span>
            <span className="text-xs font-label font-medium uppercase tracking-widest">University SSO</span>
          </div>
        </div>
      </div>
    </main>
  );
}
