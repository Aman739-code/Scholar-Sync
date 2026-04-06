import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden px-8 py-1">
      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold font-manrope">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            NEXT GENERATION LMS
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold font-headline leading-[1.1] tracking-tight text-on-background">
            Curating Your <br />
            <span className="text-primary">Academic Journey.</span>
          </h1>
          <p className="text-lg md:text-2xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Experience an educational environment designed for intellectual breathing room. We prioritize your learning experience through intuitive design and editorial-grade content delivery.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <Link to="/login" className="linear-soul text-on-primary px-10 py-5 rounded-full font-manrope font-bold text-xl shadow-xl shadow-primary/20 active:scale-95 transition-transform">
              Get Started
            </Link>
            <Link to="/courses" className="bg-surface-container-highest text-on-surface px-10 py-5 rounded-full font-manrope font-bold text-xl hover:bg-surface-container-high active:scale-95 transition-transform">
              View Syllabus
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-tertiary-container/10 rounded-full blur-3xl"></div>
    </section>
  );
}

function PopularCourses() {
  return (
    <section className="py-24 px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold font-headline text-on-background">Popular Courses</h2>
            <p className="text-on-surface-variant text-lg">Master the skills of the future with our curated selections.</p>
          </div>
          <Link to="/courses" className="text-primary font-bold flex items-center gap-2 group">
            Browse all 124 courses
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Featured Course */}
          <Link to="/courses/quantum-computing" className="md:col-span-2 md:row-span-2 bg-surface-container-lowest rounded-3xl p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden">
            <div className="relative z-10">
              <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs font-bold mb-6 inline-block">Best Seller</span>
              <h3 className="text-3xl font-bold font-headline mb-4">Advanced Quantum Computing</h3>
              <p className="text-on-surface-variant max-w-sm mb-8">A comprehensive deep-dive into qubit manipulation and quantum algorithmic structures for senior researchers.</p>
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="flex -space-x-3">
                <img alt="Student" className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzD0fyOEeE4kQseQjNrYtSxFsvNVhZJmM1rWhd3Gd1kI4VpqaTtHpzrhBDGFUdFAsLBaBn0-vy8HCjobFS0zKNh2WnWdN7A9tUif-KMYhl2aSsXvX0BNdABQPa3z6dDnJa8QhtsiSTEXdyDGELBR3ldtKQ3MjagDXGuAzozph-tqTTJBhcb08ierX2qAqNLeCqZBbhbDz_osGehFyQ11NEa4fPQ6mQ3iMIt2oakwGIP37UQ-OypK33RmsKKDYIqWV3TXKZidkfRlMI" />
                <img alt="Student" className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDJQ5PWAC5Qi30iAd3PeS66Xo9bYzmvTBbosh-pdQ0UXRBakgcKT9N2pVRvqoriA0-R7dJ7gihRjR2-dHQyr8gLS64xx9t-i1oNxkdQRCQKyAVMhb5QwHESNWyK92xLfLQ0CtuuDjy1DSobKNYPoqBN3wY8uPABUeqP3Heh_LLzx-eljv8Dt2gvbw5G98n0Ig_EP4JWvtg_Q1tUNYFRkIdh6hjXvCmfeTZQGxbCkfHACC8CpdnbggYA1O-YT_p330cSVjVdyB6R6NE" />
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-[10px] font-bold border-2 border-white">+4k</div>
              </div>
              <span className="text-sm font-medium text-on-surface-variant">Enrolled students</span>
            </div>
            <img alt="Quantum" className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-500 rounded-3xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrokmwUiV-lF_Q2s_AJdRcqWrEX1W0I3S8WeNIy-0J6MDOSz0gy4daMv923SNUpfjbKgDV656CxKBHnAmWYfJ1Ak5xfObdg_WYYblG4Gdk29E9RPccoSJjzQXJ5IyqFHGo_I7E_osLYTTBw-hlRKV0WtbYprqbzp4QA7zTtZiD-ItQP_-DwU6Boo_SdyqylZr1-UBBMHZlvOsN7eb3KLxI4pwtTjX3QXTDMUjPNmHD1-KGELrEqoA4kSIRx3n2Blfy3NqyyEcXIxEC" />
          </Link>

          {/* Course Cards */}
          {[
            { id: "neural-networks", label: "DATA SCIENCE", title: "Neural Network Ethics", weeks: "12 Weeks", rating: "4.9", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCsU0rT8CXk9nfXeoTeHwkwqWEB0zvcZF9vYTEYERn3P-D1Vz0OUhel0_n7J85uo7ums8FnGIv2NWcjbk859jz4C4puD19bhgEqJ2mcOyk0jay00-b3YBK9h6-zYXkRzcS58hTAdpmHwfbJIII6JbqxYz-910mAhYMjmxUSRKlvZp2hJ3y18rLMf1aloPEA9HSX8H-2ks5UDgmXe83KkhwFuWkip-ij75Rm2aJLaB6gbXSHrofrvujg0Fw9FBjb7E81pPJdwJ3N5J8" },
            { id: "advanced-data-structures", label: "BIOSCIENCE", title: "Molecular Architecture", weeks: "8 Weeks", rating: "4.8", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCexiVxTFwLc8hjJAmOMR3TNrW_HQTmxFJG9_Rg-JyM6PjfrSpx-3623P-QwgTmuzla5bz1fyAPU9uIAOEverQDF55BYyaxICi0n_C7d0nYQlfUaAgFhq3UhUOljj5Yne_4eHzlaTrnYXGLFh2pv2aBERB4NuP_mCtvIRU-dIm8S0LX1Vs_Ntqp28pr0_t2U8q9FTrhVzojlYYCKIsZbOqlJ-SsBLpS8YfTCPVOGEqKRtD4AG61Yln6lUc2xi0O8go9o7wc6OnJQ4SE" },
            { id: "discrete-math", label: "MANAGEMENT", title: "Venture Economics 101", weeks: "10 Weeks", rating: "5.0", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtTrq11GF96fitXn85AGsuh8f9UqcMqJ0xaUTH5BdDDi-yU9hpX_dn8_wie7FOO8akSiWgbOls09hPRzUN96FIdlfJRuhMW47jxKu8UPrROUs9wlKj33G0W-PzHKKOkOa8yZBe-ThnC3Rpg5RwSgLw7o_Ttn1cyGq2vJfP7OWDL6d6oc6eVFnJIm4guU341RuKWaFOBtNPJlOBMN0CgtRw3n-coThXEuKA_in0KltZ1rNRQhribS-8k5A73EW0HekTxA5faJefGFiz" },
            { id: "info-systems", label: "ARCHITECTURE", title: "Sustainable Urbanism", weeks: "14 Weeks", rating: "4.7", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzR2j8iN623yk6SIUPkMWnOQOYc4aAWVPC9oV6zlY-O429uDLHTn3WyXz-s6yRrhpuHiYBwKUSfe40xsA-hOsVMFWE2jl-s7jXmqr9F1Q2ynX6-_AXYkEtOGjcQDtkCeCtgOr3JWr91RnTeoaQuvMGl_c3wG3bM_B4X09wjmK36REA9DCqMcfE6Df1SvGYPU8c0UF7UdC1OuMhEQRfm7Fko8wcbTWLu13UtTlJp1nhdHx5Mx3Vsw8LKhaIyB3xatTYL51W2NHovc4A" },
          ].map((course) => (
            <Link to={`/courses/${course.id}`} key={course.title} className="bg-surface-container-lowest rounded-3xl p-6 flex flex-col gap-6 hover:translate-y-[-4px] transition-all">
              <div className="w-full aspect-video rounded-3xl overflow-hidden relative">
                <img alt={course.label} className="w-full h-full object-cover" src={course.img} />
                <div className="absolute top-2 left-2 px-2 py-1 bg-surface-container-lowest/90 backdrop-blur rounded-xl text-[10px] font-bold">{course.label}</div>
              </div>
              <div>
                <h4 className="font-headline font-bold text-lg mb-2">{course.title}</h4>
                <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                  <span className="material-symbols-outlined text-sm">schedule</span> {course.weeks}
                  <span className="material-symbols-outlined text-sm ml-2">star</span> {course.rating}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacultySection() {
  const faculty = [
    { name: "Dr. Elena Rodriguez", role: "Director of Artificial Intelligence", bio: "Former senior researcher at DeepMind, specializing in reinforcement learning and neural dynamics.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZzP3drDySh-AmjqEK5H2G4TirlEosFOxVwzWPT1gChSPe-Stj0mreexu0vtCKwwQNzJbn8FiESlngFQEmdYvs9NaJpCygYSkhwbhMBNNAuN1Blv01AGBkawwSK84sYWrcnBSqLRpogWVokzQ3CdUnkBj9lf9TjDmzwdGtDuI8nVTX7M6FHX3W5IEiuiRGQfgwcXOVtgqCnoB7QwqLx1W9qAGaEHJy-QBQnBG_sJ2AJpv_WRfcTS71UotShN3yuHdpLavwxYBfnNRZ" },
    { name: "Prof. Marcus Thorne", role: "Head of Macroeconomics", bio: "Author of \"The Liquidity Trap,\" Marcus bridges theoretical finance with real-world market policy.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuamVIWEfVPxILw9TqCZuOYOS4oiYAGO9iSVRRyZLKigGXiO4Dj-Cu08waGxxvKmjVjm8LU8QuCDUo3sxDYrYQxfVQ48nzRtpiv38h3VUrJo8hbz0CFZnUhNe8PACf8ry2I20XXGdkqscKGDgNNFyK3esCMX_fC5TDyopDvJLRe-FH91wAX7ShQYffji1DARfzimjaqFeBtdAMHuTv1yd3JZwkmGY5VkPOLtdYsXPFuC-TY364uJwNNt29jegoHA4VbQRBkkoO8Va9" },
    { name: "Dr. Sarah Jenkins", role: "Lead of Biomedical Design", bio: "Pioneering researcher in CRISPR technologies and regenerative medicine with over 15 patented designs.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgnL857GFMk9L7ji2FEgcy6-4MCXfOr_apI3EhPwxRQxTQoyroXZdEYILCkd96XZKNhuORO3hthssoBFqnLQeVnU6MxgTRcIyWWVAfB2QAYngTebOqZIfRHZCANL4CPXWf8pgEx7CHhAVOtgCQG_jsHE36lcLZcgEXV2BV-TPoBZATsveYhTgbuzNc4_HcENF89_QlunrQa4C1MXmKG_H3nNf4MvWYXpMLUMJ7nUfekUBTZtvjSsNU8QqYqDxPkRUOopSDSv4XRDDh" },
  ];

  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-extrabold font-headline text-on-background">Meet Our Faculty</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Learn from global thought leaders, researchers, and industry pioneers dedicated to your academic growth.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {faculty.map((f) => (
            <div key={f.name} className="text-center group">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-primary/10 rounded-full scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img alt={f.name} className="w-48 h-48 rounded-full object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-500 mx-auto" src={f.img} />
              </div>
              <h3 className="text-xl font-bold font-headline mb-1">{f.name}</h3>
              <p className="text-primary text-sm font-bold uppercase tracking-wider mb-4">{f.role}</p>
              <p className="text-on-surface-variant text-sm leading-relaxed px-4">{f.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuccessStories() {
  return (
    <section className="py-24 px-8 bg-surface-container">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-4xl font-extrabold font-headline leading-tight">Beyond the Grade: <br /><span className="text-primary">Success Stories</span></h2>
            <div className="space-y-6">
              <div className="p-6 bg-surface-container-lowest rounded-3xl shadow-sm border-l-4 border-primary">
                <p className="italic text-on-surface-variant mb-4">&quot;ScholarSync didn&apos;t just give me lessons; it gave me a workflow. I went from struggling with deadlines to leading a research team within a year.&quot;</p>
                <div className="flex items-center gap-4">
                  <img alt="Student" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXmSxrB5Kk6zwzaZMP5j66rVhRmJYRyd2tNTijqFu7Tts4KqcjOyBsT5lX3t_je33XIcthudQ5ysCJkrzkyDXEGibG49q6M89lNejgBOUEG4bXtYTSyqvTD_1UJ3a-mmMzPxrAUBMzplT3C2Pe5RUaTeYmDv0AroBfyYs6VgpCVkbajbYuWWssurW8P3tfmTrMhfhrAkIngNvwP1ORCR-sL0LBUb5Xid-DExXmE67vaF4Y60zMIyZoHJMvNHK2CKQr7rxaV6c6uP5H" />
                  <div>
                    <p className="font-bold text-sm">Julian Academic</p>
                    <p className="text-xs text-on-surface-variant">Computer Science • Year 3</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-surface-container-lowest rounded-3xl shadow-sm opacity-60 hover:opacity-100 transition-opacity">
                <p className="italic text-on-surface-variant mb-4">&quot;The clarity of the interface allowed me to focus purely on the complex mathematics of my thesis without administrative friction.&quot;</p>
                <div className="flex items-center gap-4">
                  <img alt="Student" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXs2bO0a2VTs61RwJnPzeGHDvSB7vW253rG0Ztyq4McZdKQskfv24HgtISlnn-jF1hNU8bTSwo78Z2wyl_UDsLwKNugyxbOJZ4RRc4mdmjjcS9Y_b6xfeH12oL-zolaIX7nACmgmLHWTzXAeW79tlzlrLy31dnaMlk6d_Khl3I-0j-Cded4z9HTVzq5Pobo50uCCh-AXrHpUK6SKMDB8TKHl7EGrrOjvlwBtLD2p2HxvYGoquoZTpQ1RJSF-ox1fOwJpzmCuTTWV8Z" />
                  <div>
                    <p className="font-bold text-sm">Maya Lin</p>
                    <p className="text-xs text-on-surface-variant">Theoretical Physics • Graduate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img alt="Success 1" className="w-full h-80 object-cover rounded-3xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYUuBVtIBCi1JJviU0OowWSmyhzgAFFMMSVkN82M07h3cBSXhi-Rj3sP6Ym0_0pZIvt2JGFAZa55ioANO3L8btK9j_UUG6xjAuyN3_4gDvZUH0JSfdTwxc8ZAf__xMI7ur7myueWvSP3b9v_J9tdOwq9a6WvMa7xQH1yEqLG_6xiDxOJNi8m5hDUrdMsy-lFgK-5LgFulnCgd3MtJiUb8Uauk-8zs03qzcdw0uu4DjIb_5z2njayfDo08pbkePSTs7gM3D1QFV3-x5" />
              <div className="bg-primary p-8 rounded-3xl text-on-primary">
                <p className="text-3xl font-bold font-headline mb-2">94%</p>
                <p className="text-sm opacity-90">Engagement rate among professional learners.</p>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="bg-tertiary-container p-8 rounded-3xl text-on-tertiary-container">
                <p className="text-3xl font-bold font-headline mb-2">12k+</p>
                <p className="text-sm opacity-90">Papers published through curator guidance.</p>
              </div>
              <img alt="Success 2" className="w-full h-80 object-cover rounded-3xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZdOjgDIL8NjMAZe_Zjgcvfe3o5-hxIcVFNF7_BptLKEX45lhumCq4ZP9_JDH4jpoXNWSr7Uf9tLTUYSdpplfrtY8Pj-l376FLrXWuFslKE-7EHYtP4Lv9_ikmxpO_OhB8BbsYwr8CyKQBynHdRjbh4m3psePXZqvTMPLSO9D-gAFCyUgAemLOMUye2VUMr5Dq5XYHniYbdLj0CMqa4pYiE5Fa0yQg9hYEID_1A9T_V2O3tI8KeqBT5KoIQe4Tl8aeXFm2X8iYYip7" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 px-8 overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <h2 className="text-4xl md:text-5xl font-extrabold font-headline leading-tight">Ready to begin your <br />academic journey?</h2>
        <p className="text-on-surface-variant text-lg max-w-xl mx-auto">Join thousands of students and educators who have already shifted to a more intentional way of learning.</p>
        <div className="flex justify-center">
          <Link to="/login" className="linear-soul text-on-primary px-12 py-5 rounded-full font-manrope font-bold text-xl shadow-2xl shadow-primary/30 active:scale-95 transition-all">
            Get Started for Free
          </Link>
        </div>
      </div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-tertiary-container/20 rounded-full blur-3xl"></div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <PopularCourses />
      <FacultySection />
      <SuccessStories />
      <FinalCTA />
    </>
  );
}
