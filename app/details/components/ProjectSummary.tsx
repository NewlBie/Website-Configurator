"use client";

import { motion, Variants } from "framer-motion";
import { 
  Selections, projectTypes, designLevels, features, performanceOptions 
} from "../lib/constants";
import { AnimatedNumber } from "./AnimatedNumber";

interface ProjectSummaryProps {
  selections: Selections;
  pricing: any;
  invoiceId: string;
  invoiceDate: string;
  invoiceVariants: Variants;
  invoiceRef?: React.RefObject<HTMLDivElement | null>;
  forceVisible?: boolean;
}

export function ProjectSummary({ 
  selections, 
  pricing, 
  invoiceId, 
  invoiceDate, 
  invoiceVariants,
  invoiceRef,
  forceVisible = false
}: ProjectSummaryProps) {
  return (
    <div 
      ref={invoiceRef}
      className={`${forceVisible ? "flex" : "hidden lg:flex"} w-full h-full bg-[#050505] lg:border-l border-white/5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative`}
    >
      
      {/* Abstract wave SVG overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
         <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
           <path fill="none" stroke="#10b981" strokeWidth="1" d="M41.7,-72.7C55.6,-65.4,69.5,-55.8,79.5,-42.6C89.5,-29.3,95.5,-12.3,95.6,4.7C95.7,21.7,89.9,38.8,78.9,51.8C67.9,64.7,51.7,73.6,35.3,77.9C18.9,82.2,2.4,81.9,-13.6,78.8C-29.5,75.7,-45,69.8,-57.4,59C-69.8,48.3,-79,32.7,-82.7,16C-86.4,-0.7,-84.6,-18.6,-77,-33.5C-69.5,-48.4,-56.3,-60.3,-41.8,-67.2C-27.3,-74.1,-11.6,-76,-2.1,-72.3C7.4,-68.5,14.8,-59,41.7,-72.7Z" transform="translate(100 100) scale(1.1)" />
           <path fill="none" stroke="#fff" strokeWidth="0.5" d="M21.7,-42.7C35.6,-35.4,49.5,-25.8,59.5,-12.6C69.5,0.7,75.5,17.7,75.6,34.7C75.7,51.7,69.9,68.8,58.9,81.8C47.9,94.7,31.7,103.6,15.3,107.9C-1.1,112.2,-17.6,111.9,-33.6,108.8C-49.5,105.7,-65,99.8,-77.4,89C-89.8,78.3,-99,62.7,-102.7,46C-106.4,29.3,-104.6,11.4,-97,-3.5C-89.5,-18.4,-76.3,-30.3,-61.8,-37.2C-47.3,-44.1,-31.6,-46,-22.1,-42.3C-12.6,-38.5,-5.2,-29,21.7,-42.7Z" transform="translate(100 100) scale(1.2)" />
         </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 pointer-events-none">
         <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
           <path fill="none" stroke="#fff" strokeWidth="0.5" d="M30.5,-48.8C40.6,-39.8,50.7,-31.6,56.5,-20.9C62.3,-10.2,63.9,3.1,60.6,15.1C57.3,27,49.1,37.5,39.1,45.1C29,52.7,17.2,57.3,5.1,59.6C-7,61.9,-19.4,61.9,-30.7,56.9C-41.9,51.9,-52.1,41.9,-58.5,30C-64.9,18,-67.5,4.1,-63.9,-8.3C-60.3,-20.7,-50.5,-31.6,-40,-40.4C-29.5,-49.2,-18.4,-55.9,-6.6,-59.8C5.2,-63.7,16.4,-64.8,30.5,-48.8Z" transform="translate(100 100) scale(1.5)" />
           <path fill="none" stroke="#10b981" strokeWidth="0.5" d="M40.5,-58.8C50.6,-49.8,60.7,-41.6,66.5,-30.9C72.3,-20.2,73.9,-6.9,70.6,5.1C67.3,17,59.1,27.5,49.1,35.1C39,42.7,27.2,47.3,15.1,49.6C3,51.9,-9.4,51.9,-20.7,46.9C-31.9,41.9,-42.1,31.9,-48.5,20C-54.9,8,-57.5,-5.9,-53.9,-18.3C-50.3,-30.7,-40.5,-41.6,-30,-50.4C-19.5,-59.2,-8.4,-65.9,3.4,-69.8C15.2,-73.7,26.4,-74.8,40.5,-58.8Z" transform="translate(100 100) scale(1.6)" />
         </svg>
      </div>

      <motion.div 
        variants={invoiceVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[800px] mx-auto p-6 md:p-12 relative z-10 flex flex-col min-h-full"
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-emerald-500 rounded-sm rotate-45 flex items-center justify-center border border-emerald-400">
              <div className="w-2 h-2 bg-black rounded-sm"></div>
            </div>
            <span className="font-bold text-emerald-500 text-lg tracking-widest ml-1">NEWL<span className="text-white">BIE</span></span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div><span className="text-gray-500 mr-2">ID:</span> <span className="text-white">{invoiceId}</span></div>
            <div><span className="text-gray-500 mr-2">DATE:</span> <span className="text-white">{invoiceDate}</span></div>
          </div>
        </div>

        {/* INVOICE TITLE & LOGO MARK */}
        <div className="flex justify-between items-start mb-12">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold tracking-tighter text-white uppercase">YOUR BUILD BREAKDOWN</h1>
            <p className="text-gray-500 text-sm mt-1">A structured breakdown of your website build</p>
          </div>
          <div className="flex gap-2">
            <div className="text-emerald-500 opacity-80 text-6xl leading-none font-light">*</div>
            <div className="text-white opacity-40 text-6xl leading-none font-light">*</div>
          </div>
        </div>

        {/* BODY LAYOUT */}
        <div className="flex gap-12 flex-1">
          
          {/* LEFT COLUMN: ITEMS */}
          <div className="flex-1 flex flex-col">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_6rem] md:grid-cols-[1fr_8rem] gap-4 border-b-2 border-white mb-4 pb-2 text-sm font-semibold text-white">
              <div>Item Description</div>
              <div className="text-right">Price</div>
            </div>

            {/* Table Body */}
            <div className="flex flex-col gap-0 text-sm">
              {selections.projectType && (
                <div className="py-4 border-b border-white/10">
                  <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold mb-2">Base Build</p>
                  <div className="grid grid-cols-[1fr_6rem] md:grid-cols-[1fr_8rem] gap-4">
                    <div>
                      <p className="font-semibold text-white">{projectTypes.find(p => p.id === selections.projectType)?.name}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{projectTypes.find(p => p.id === selections.projectType)?.desc.split('\n')[0]}</p>
                    </div>
                    <div className="text-right text-white font-medium whitespace-nowrap">₹{(projectTypes.find(p => p.id === selections.projectType)?.price || 0).toLocaleString()}</div>
                  </div>
                </div>
              )}

              {selections.designLevel && designLevels.find(d => d.id === selections.designLevel)?.price! >= 0 && (
                <div className="py-4 border-b border-white/10">
                  <p className="text-[10px] text-blue-500 uppercase tracking-widest font-bold mb-2">UI/UX Design</p>
                  <div className="grid grid-cols-[1fr_6rem] md:grid-cols-[1fr_8rem] gap-4">
                    <div>
                      <p className="font-semibold text-white">{designLevels.find(d => d.id === selections.designLevel)?.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Professional layout and brand alignment</p>
                    </div>
                    <div className="text-right text-white font-medium whitespace-nowrap">₹{(designLevels.find(d => d.id === selections.designLevel)?.price || 0).toLocaleString()}</div>
                  </div>
                </div>
              )}

              {selections.features.length > 0 && (
                <div className="py-4 border-b border-white/10">
                  <p className="text-[10px] text-purple-500 uppercase tracking-widest font-bold mb-2">Platform Features</p>
                  <div className="grid grid-cols-[1fr_6rem] md:grid-cols-[1fr_8rem] gap-4">
                    <div>
                      <p className="font-semibold text-white">{selections.features.length} Features Integrated</p>
                      <p className="text-xs text-gray-500 mt-1">Core functionalities and business logic</p>
                    </div>
                    <div className="text-right text-white font-medium whitespace-nowrap">₹{(selections.features.reduce((acc, curr) => acc + (features.find(f => f.id === curr)?.price || 0), 0)).toLocaleString()}</div>
                  </div>
                </div>
              )}

              {selections.performance.length > 0 && (
                <div className="py-4 border-b border-white/10">
                  <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold mb-2">Performance Optimizations</p>
                  <div className="grid grid-cols-[1fr_6rem] md:grid-cols-[1fr_8rem] gap-4">
                    <div>
                      <p className="font-semibold text-white">{selections.performance.length} Enhancements</p>
                      <p className="text-xs text-gray-500 mt-1">Turbo optimization and security hardening</p>
                    </div>
                    <div className="text-right text-white font-medium whitespace-nowrap">₹{(selections.performance.reduce((acc, curr) => acc + (performanceOptions.find(p => p.id === curr)?.price || 0), 0)).toLocaleString()}</div>
                  </div>
                </div>
              )}

              {!selections.projectType && (
                <div className="py-8 text-center text-gray-600 italic text-xs">
                  Awaiting selections...
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="mt-8 mb-12">
              <div className="flex justify-between text-sm py-2 text-gray-400">
                <span>Sub-Total</span>
                <span>₹<AnimatedNumber value={pricing.subtotal} /></span>
              </div>

              <div className="flex justify-between text-sm py-2 text-gray-400">
                <span>Estimated Effort</span>
                <span className="font-medium">{(pricing.minHours || 0).toLocaleString()}–{(pricing.maxHours || 0).toLocaleString()} Hours</span>
              </div>

              <div className="flex justify-between items-start text-sm py-2 text-gray-400 border-b border-white/10 pb-4">
                <span>Production Timeline</span>
                <div className="text-right flex flex-col items-end">
                  <span className="block font-bold text-emerald-400 text-base">{pricing.minDays} - {pricing.maxDays} Days</span>
                  <div className="flex flex-col items-end mt-1 space-y-0.5">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-gray-600" /> UI/UX Design
                    </span>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-gray-600" /> Development
                    </span>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-gray-600" /> Testing & QA
                    </span>
                  </div>
                </div>
              </div>

              {pricing.discount > 0 && (
                <div className="mt-4 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                  <div className="flex justify-between text-sm text-emerald-400 font-bold mb-1">
                    <span>Maintenance Bundle Discount</span>
                    <span>-₹<AnimatedNumber value={pricing.discount} /></span>
                  </div>
                  <p className="text-[10px] text-emerald-400/60 leading-tight">Applied with selected maintenance plan</p>
                </div>
              )}

              <div className="flex justify-between items-center mt-6">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Grand Total</p>
                  <p className="text-[10px] text-gray-400 font-medium">One-time investment for a scalable digital asset</p>
                </div>
                <div className="text-right">
                  {pricing.discount > 0 && (
                    <p className="text-sm text-gray-500 line-through mb-1">₹{(pricing.subtotal).toLocaleString()}</p>
                  )}
                  <div className="text-3xl font-bold text-white tracking-tighter">
                    ₹<AnimatedNumber value={pricing.finalPrice} />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 italic">
                    Typical agency projects for similar scope: ₹{(Math.ceil((pricing.finalPrice + 25000) / 5000) * 5000).toLocaleString()}+
                  </p>
                </div>
              </div>

              {/* WHY THIS PRICE JUSTIFICATION */}
              <div className="mt-8 p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <p className="text-[10px] text-emerald-400/80 uppercase tracking-[0.2em] font-bold mb-4">This estimate reflects:</p>
                <div className="space-y-3">
                  {[
                    "Custom design & development effort",
                    "Scalable architecture for future growth",
                    "Performance optimization and structured build process"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-[12px] text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                      <span className="font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* UPGRADED PROJECT METHODOLOGY SECTION */}
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <p className="text-emerald-500 font-bold text-xs tracking-widest uppercase">Project Methodology</p>
                <p className="text-[10px] text-gray-600 font-medium">Professional Delivery Standards</p>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-1 mb-6">
                {[
                  { step: "01", label: "Discovery" },
                  { step: "02", label: "UI/UX" },
                  { step: "03", label: "Development" },
                  { step: "04", label: "Testing" },
                  { step: "05", label: "Launch" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-full bg-emerald-500/20" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-gray-500 font-bold">{item.step}</span>
                      <span className="text-[9px] text-gray-400 font-medium leading-none">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-500 text-[10px] italic leading-relaxed text-center border-t border-white/5 pt-4">
                "Used by businesses to build scalable digital platforms"
              </p>
              <div className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-lg bg-amber-500/10 border border-amber-500/25">
                <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <p className="text-[11px] text-amber-300 font-bold tracking-wide">
                  Maintenance plans require a minimum commitment of 6 months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
