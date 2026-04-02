import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <main className="pt-4 pb-12 flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-surface-container-lowest rounded-4xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(43,52,55,0.06)]">
        {/* Branding Section */}
        <div className="hidden md:flex md:w-5/12 linear-soul p-12 flex-col justify-between relative overflow-hidden rounded-l-4xl">
          <div className="relative z-10">
            <h1 className="font-headline text-4xl font-extrabold text-white leading-tight mb-6">
              Curate your <br />academic <br />excellence.
            </h1>
            <p className="text-white/80 font-body text-lg leading-relaxed">
              Join a community of scholars focused on deep learning and organized research.
            </p>
          </div>
          <div className="relative z-10 flex flex-col space-y-4">
            <div className="flex items-center space-x-3 text-white/90">
              <span className="material-symbols-outlined text-xl">auto_stories</span>
              <span className="text-sm font-label">Access over 500+ specialized courses</span>
            </div>
            <div className="flex items-center space-x-3 text-white/90">
              <span className="material-symbols-outlined text-xl">verified_user</span>
              <span className="text-sm font-label">Accredited certification programs</span>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-black/5 rounded-full blur-2xl"></div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-7/12 p-8 md:p-16 bg-surface-container-lowest">
          <div className="max-w-md mx-auto">
            <header className="mb-10">
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Create Account</h2>
              <p className="text-on-surface-variant font-body">Enter your student credentials to get started.</p>
            </header>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="block font-label text-sm font-medium text-on-surface-variant" htmlFor="full_name">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline-variant text-xl">person</span>
                  <input className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-3xl focus:ring-2 focus:ring-primary-container transition-all outline-none text-on-surface placeholder:text-outline/50" id="full_name" name="full_name" placeholder="Julian Academic" type="text" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label text-sm font-medium text-on-surface-variant" htmlFor="student_id">Student ID</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline-variant text-xl">badge</span>
                  <input className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-3xl focus:ring-2 focus:ring-primary-container transition-all outline-none text-on-surface placeholder:text-outline/50" id="student_id" name="student_id" placeholder="CS-2024-8842" type="text" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label text-sm font-medium text-on-surface-variant" htmlFor="email">University Email</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline-variant text-xl">mail</span>
                  <input className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-3xl focus:ring-2 focus:ring-primary-container transition-all outline-none text-on-surface placeholder:text-outline/50" id="email" name="email" placeholder="julian@university.edu" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label text-sm font-medium text-on-surface-variant" htmlFor="password">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline-variant text-xl">lock</span>
                  <input className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-3xl focus:ring-2 focus:ring-primary-container transition-all outline-none text-on-surface placeholder:text-outline/50" id="password" name="password" placeholder="••••••••••••" type="password" />
                </div>
                <p className="text-[10px] text-outline font-label px-1">Must be at least 12 characters with 1 special symbol.</p>
              </div>
              <div className="pt-4">
                <Link to="/dashboard" className="block w-full linear-soul text-on-primary font-headline font-bold py-4 rounded-full shadow-lg transition-transform active:scale-95 text-center">
                  Create Account
                </Link>
              </div>
            </form>

            <footer className="mt-10 text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-container-highest"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-surface-container-lowest px-4 text-outline font-label">Or continue with</span></div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 border border-surface-container-highest rounded-full hover:bg-surface-container-low transition-colors">
                  <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1r6F_FZ497VQfR3wdZVz14Uj0sYfyGdVuq-br7m_BR7Ju2H3ShUyzoevvdqLjDDPaYELL7snC3iKY3kbQ1I3yf-LLXsBUXyYThTxR5ryHeOdwn_CJq7knxNmPhavepVkWXlae8Ie7CVWdMGVNAipA4sXqI-GmABFUMlDO4WxqCXBfHjFEAjVNYNmzwOVGKvFi3yVMNi12fok3oRHli_cLIhPitGepON7xjqq-jWRf-rU3URsmugGMycSHYs66LdcA9hGA6F3I7BMW" />
                  <span className="text-sm font-semibold text-secondary">Google</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 border border-surface-container-highest rounded-full hover:bg-surface-container-low transition-colors">
                  <img alt="Microsoft" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI2dDiH27ZOkWwaUSlQ_7m-vjZs8Qc1bK-gFhVEBXDhnT5fV1cFBaRhQ9YGrNSqNI2N-CXKY_EVqWZsveDLk1KuUPz79w-giQkatCC2LACE3_SXCGRnxJuX2QsQhdO1si6GpoYYFksVaOEwVDk8fDpreJTXmTmAFneXXxmGpY__qiLIc7cOX-Y-fHUY0iR5trhJRlN1zXsuXbnzFK2vEM9mzG80EYBzk-5RgyM6gpX0mlZ_zlwg72vFC4oeL6wT5Pfn0yaLQn0zxAn" />
                  <span className="text-sm font-semibold text-secondary">Outlook</span>
                </button>
              </div>
              <p className="text-sm text-on-surface-variant font-body">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-bold hover:underline underline-offset-4 ml-1">Login here</Link>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
