"use client";

import { motion } from "framer-motion";
import { Download, FileText, CheckCircle2, ArrowRight, Share2, Printer } from "lucide-react";
import { Selections } from "../lib/constants";

interface EstimationPreviewProps {
  selections: Selections;
  pricing: any;
  onDownload: () => void;
  onReset: () => void;
}

export function EstimationPreview({ selections, pricing, onDownload, onReset }: EstimationPreviewProps) {
  return (
    <div className="w-full h-full overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto py-12 px-6"
      >
        <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="text-emerald-400" size={40} />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white">
          YOUR ESTIMATION IS READY
        </h1>
        <p className="text-gray-400 max-w-lg leading-relaxed text-lg font-light">
          We've synthesized your requirements into a comprehensive project breakdown. Download your professional estimation to begin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* PDF THUMBNAIL PREVIEW */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] flex flex-col">
            {/* Simulated Header */}
            <div className="h-16 bg-white/5 border-b border-white/5 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center">
                  <FileText size={14} className="text-black" />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">PROJECT_ESTIMATION.PDF</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
            </div>
            
            {/* Simulated Content */}
            <div className="flex-1 p-8 space-y-6">
              <div className="space-y-2">
                <div className="h-4 w-1/3 bg-white/10 rounded" />
                <div className="h-8 w-2/3 bg-white/20 rounded" />
              </div>
              <div className="pt-8 space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                    <div className="h-3 w-1/2 bg-white/5 rounded" />
                    <div className="h-3 w-1/4 bg-white/10 rounded" />
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-10 flex flex-col items-end gap-2">
                <div className="h-2 w-1/4 bg-white/5 rounded" />
                <div className="h-10 w-1/2 bg-emerald-500/20 rounded-lg border border-emerald-500/30" />
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#0a0a0a]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
               <motion.button
                 onClick={onDownload}
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-2xl"
               >
                 <Download size={28} />
               </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ACTIONS & DETAILS */}
        <div className="flex flex-col gap-8">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Final Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total Value</p>
                  <p className="text-xl font-bold text-white">INR {pricing.finalPrice.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Timeline</p>
                  <p className="text-xl font-bold text-white">~4-8 Weeks</p>
                </div>
              </div>
            </div>

            <button
              onClick={onDownload}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-sm text-black bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_20px_40px_rgba(52,211,153,0.2)] hover:scale-[1.02] uppercase tracking-[0.2em]"
            >
              Download PDF Estimation <Download size={20} strokeWidth={2.5} />
            </button>

            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[11px] font-bold uppercase tracking-wider">
                <Share2 size={16} /> Share Link
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[11px] font-bold uppercase tracking-wider">
                <Printer size={16} /> Print Direct
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-2">
            <h4 className="text-xs font-bold text-white/80 uppercase tracking-widest">Next Steps</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white group-hover:bg-emerald-500 group-hover:text-black transition-colors">1</div>
                <p className="text-sm text-gray-400 leading-relaxed font-light">Review the detailed project breakdown and deliverables list.</p>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-1 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white group-hover:bg-emerald-500 group-hover:text-black transition-colors">2</div>
                <p className="text-sm text-gray-400 leading-relaxed font-light">Schedule a strategy call with our lead developer to finalize the roadmap.</p>
              </li>
            </ul>
            <button
              onClick={onReset}
              className="mt-6 text-xs font-bold text-emerald-400/60 hover:text-emerald-400 transition-colors uppercase tracking-[0.2em] flex items-center gap-2"
            >
              Modify Configuration <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
