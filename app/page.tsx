"use client";

import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Lock, User, Mail, Phone } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();

    // Strict Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (name.length < 3) {
      alert("Please enter a genuine name (at least 3 characters).");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid business email address.");
      return;
    }

    // Cleaning phone number to check for 10 digits
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    router.push(
      `/details?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(cleanPhone)}`
    );
  };

  return (
    <main className={`${montserrat.className} min-h-screen w-full flex flex-col md:flex-row bg-[#050505] text-white overflow-x-hidden selection:bg-emerald-500/30`}>

      {/* LEFT CONTENT AREA */}
      <div className="w-full md:w-[60%] flex flex-col justify-between px-6 md:px-24 py-12 md:py-16 relative z-10 min-h-[600px] md:min-h-screen">

        {/* LOGO / NAV */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="font-black text-black text-lg">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight leading-none">NEWL<span className="font-light opacity-60">BIE</span></span>
              <span className="text-[8px] tracking-[0.4em] text-emerald-500 font-bold uppercase mt-1">Digital Labs</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <div className="h-px w-12 bg-white/10" />
            <span className="text-[9px] tracking-[0.4em] text-gray-500 font-bold uppercase">Architecture v2.0</span>
          </div>
        </motion.div>

        {/* HERO TEXT */}
        <div className="relative py-12 md:py-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="h-[2px] w-8 md:w-12 bg-emerald-500/40" />
              <h2 className="text-emerald-400 text-[9px] md:text-[10px] font-extrabold tracking-[0.4em] md:tracking-[0.6em] uppercase text-nowrap">
                Intelligent Configurator
              </h2>
            </div>
            <h1 className="text-[12vw] md:text-[90px] leading-[0.9] md:leading-[0.82] font-extrabold tracking-tighter mb-8 md:mb-10">
              PLAN YOUR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">WEBSITE WITH,</span> <br />
              <span className="relative inline-block text-emerald-500">
                CLARITY & CONTROL
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="absolute -bottom-1 md:-bottom-2 left-0 h-1 md:h-1.5 bg-emerald-500/20 rounded-full"
                />
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-lg font-medium mb-10 opacity-80">
              Stop guessing. Plan your website with technical precision and get a complete roadmap in seconds.
            </p>
          </motion.div>
        </div>

        {/* FOOTER STATS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-row gap-8 md:gap-16 border-t border-white/5 pt-8 md:pt-12"
        >
          <div className="flex flex-col gap-1">
            <p className="text-2xl md:text-3xl font-extrabold tracking-tighter text-white">2026</p>
            <p className="text-[8px] md:text-[9px] text-gray-600 uppercase font-bold tracking-widest">Industry Standards</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-2xl md:text-3xl font-extrabold tracking-tighter text-emerald-400">20+</p>
            <p className="text-[8px] md:text-[9px] text-gray-600 uppercase font-bold tracking-widest">Published Websites</p>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE - FORM AREA */}
      <div className="w-full md:w-[40%] min-h-screen md:h-screen relative flex items-center justify-center p-6 md:p-12 overflow-hidden border-t md:border-t-0 md:border-l border-white/5">

        {/* VIBRANT MESH BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 animate-mesh" />
          <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-[120px]" />
        </div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="relative">
            {/* AMBIENT GLOW BEHIND CARD */}
            <div className="absolute -inset-4 bg-emerald-500/5 blur-[100px] rounded-full opacity-50" />

            <div className="relative bg-[#0a0a0a]/40 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden">

              {/* TOP HEADER */}
              <div className="flex flex-col gap-2 mb-8 md:mb-12 relative">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Start Your Build</h3>
                <p className="text-gray-500 text-xs md:text-[13px] font-medium leading-relaxed">Enter your details to generate your website plan.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-7">
                {/* NAME INPUT */}
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">Identity</label>
                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors duration-300 group-focus-within/input:text-emerald-400">
                      <User className="w-4 md:w-[18px] h-4 md:h-[18px]" strokeWidth={2.5} />
                    </div>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Arjun Mehra"
                      className="w-full bg-white/[0.02] border border-white/5 rounded-xl md:rounded-2xl py-3.5 md:py-4.5 pl-12 pr-4 outline-none text-sm transition-all duration-300 focus:border-emerald-500/30 focus:bg-white/[0.04] placeholder:text-gray-700"
                    />
                  </div>
                </div>

                {/* EMAIL INPUT */}
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">Communication</label>
                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors duration-300 group-focus-within/input:text-blue-400">
                      <Mail className="w-4 md:w-[18px] h-4 md:h-[18px]" strokeWidth={2.5} />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="arjun@startup.in"
                      className="w-full bg-white/[0.02] border border-white/5 rounded-xl md:rounded-2xl py-3.5 md:py-4.5 pl-12 pr-4 outline-none text-sm transition-all duration-300 focus:border-blue-500/30 focus:bg-white/[0.04] placeholder:text-gray-700"
                    />
                  </div>
                </div>

                {/* PHONE INPUT */}
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">Connection</label>
                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors duration-300 group-focus-within/input:text-purple-400">
                      <Phone className="w-4 md:w-[18px] h-4 md:h-[18px]" strokeWidth={2.5} />
                    </div>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/[0.02] border border-white/5 rounded-xl md:rounded-2xl py-3.5 md:py-4.5 pl-12 pr-4 outline-none text-sm transition-all duration-300 focus:border-purple-500/30 focus:bg-white/[0.04] placeholder:text-gray-700"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-2 md:pt-4">
                  <button
                    type="submit"
                    className="w-full group relative flex items-center justify-center gap-3 bg-white text-black font-extrabold text-[12px] md:text-[13px] uppercase tracking-widest py-4 md:py-5 rounded-xl md:rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)]"
                  >
                    {/* SHIMMER EFFECT */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Start Configuring</span>
                    <ArrowRight size={18} strokeWidth={3} className="relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white" />
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center gap-3 pt-6 border-t border-white/5 mt-4">
                  <div className="flex items-center gap-1.5 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/5">
                    <Lock className="w-2.5 md:w-3 h-2.5 md:h-3 text-emerald-400" />
                    <p className="text-[8px] md:text-[9px] text-gray-500 font-bold uppercase tracking-widest">End-to-End Secure</p>
                  </div>
                  <p className="text-[9px] md:text-[10px] text-gray-600 font-medium">Confidential. Private data.</p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes mesh {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-mesh {
          background: 
            radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.4), transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.4), transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.4), transparent 50%),
            radial-gradient(circle at 80% 10%, rgba(236, 72, 153, 0.4), transparent 50%);
          background-size: 200% 200%;
          animation: mesh 15s ease infinite;
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.95); }
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
      `}</style>

    </main>
  );
}