"use client";

import { motion, Variants } from "framer-motion";
import { Check } from "lucide-react";
import { 
  Selections, projectTypes, designLevels, features, performanceOptions, maintenancePlans 
} from "../lib/constants";

interface StepRendererProps {
  currentStep: number;
  selections: Selections;
  setSelections: React.Dispatch<React.SetStateAction<Selections>>;
  stepVariants: Variants;
  itemVariants: Variants;
  toggleFeature: (id: string) => void;
  togglePerformance: (id: string) => void;
}

export function StepRenderer({
  currentStep,
  selections,
  setSelections,
  stepVariants,
  itemVariants,
  toggleFeature,
  togglePerformance
}: StepRendererProps) {
  switch (currentStep) {
    case 1:
      return (
        <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-3 tracking-tight">What are you building?</h2>
            <p className="text-gray-300 font-medium">Select the foundation of your website. This determines structure, scalability, and overall cost.</p>
            <p className="text-xs text-gray-500 mt-2 italic tracking-wide">Most business websites range between ₹20,000 – ₹60,000 depending on features and complexity.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {projectTypes.map((type, i) => (
              <motion.div
                key={type.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover={{ y: -4, scale: type.id === 'business' ? 1.02 : 1.01 }}
                onClick={() => setSelections(prev => ({ 
                  ...prev, 
                  projectType: prev.projectType === type.id ? null : type.id 
                }))}
                className={`group relative p-4 md:p-6 rounded-xl border cursor-pointer overflow-hidden transition-all duration-500 ${
                  selections.projectType === type.id
                    ? "border-emerald-400 bg-emerald-400/10 shadow-[0_0_40px_rgba(52,211,153,0.3)] scale-[1.03] z-10"
                    : selections.projectType 
                      ? "border-white/5 bg-white/[0.01] opacity-40 grayscale-[0.2]" 
                      : type.id === 'business'
                        ? "border-white/20 bg-emerald-400/[0.03] scale-[1.01] shadow-[0_0_20px_rgba(52,211,153,0.05)]"
                        : "border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                }`}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className={`p-3 md:p-4 rounded-xl flex-shrink-0 transition-colors ${
                    selections.projectType === type.id ? "bg-emerald-400/20 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]" : "bg-white/5 text-gray-400 group-hover:text-white"
                  }`}>
                    <type.icon className="w-5 md:w-7 h-5 md:h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <p className={`font-bold text-sm md:text-xl transition-colors ${selections.projectType === type.id ? "text-emerald-400" : "text-white"}`}>
                            {type.name}
                          </p>
                          {type.label && (
                            <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider hidden md:inline">
                              {type.label}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 hidden md:flex">
                          <div className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/5 shadow-sm`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              type.id === 'landing' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 
                              type.id === 'business' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 
                              'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                            }`} />
                            <span className={`text-[9px] uppercase font-bold tracking-[0.1em] ${
                              type.id === 'landing' ? 'text-emerald-400/90' : 
                              type.id === 'business' ? 'text-amber-400/90' : 
                              'text-rose-400/90'
                            }`}>
                              {type.id === 'landing' ? 'Simple' : 
                               type.id === 'business' ? 'Moderate' : 'Complex'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm md:text-lg text-white">₹{type.price.toLocaleString()}</p>
                        <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-[0.1em] font-semibold">Base Price</p>
                      </div>
                    </div>
                    <div className="space-y-3 hidden md:block">
                      <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line font-light">{type.desc}</p>
                      <div className="flex items-center gap-2 py-1 px-2 rounded-md bg-white/[0.03] border border-white/5 w-fit">
                        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Estimated Effort:</span>
                        <span className="text-[10px] text-emerald-400/80 font-bold tracking-tight">
                          ~{type.hours?.[0]}–{type.hours?.[1]} hours
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {selections.projectType === type.id && (
                  <motion.div layoutId="active-indicator" className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
            <p className="text-xs text-gray-500 italic font-light tracking-wide">
              Not sure? <span className="text-gray-300 font-medium">Most businesses start with a Business Website</span> and expand as they grow.
            </p>
            <div className="flex items-center gap-3 text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500/50" /> Structured Design
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500/50" /> Development
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500/50" /> Deployment Support
              </span>
            </div>
          </div>
        </motion.div>
      );
    case 2:
      return (
        <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="w-full">
          <h2 className="text-3xl font-bold mb-2 tracking-tight">Design & Experience</h2>
          <p className="text-gray-300 font-medium mb-10">This defines how your website looks, feels, and converts visitors into customers.</p>
          <div className="grid grid-cols-1 gap-6">
            {designLevels.map((design, i) => (
              <motion.div
                key={design.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover={{ y: -4, scale: design.id === 'premium_uiux' ? 1.03 : 1.01 }}
                onClick={() => setSelections(prev => ({ 
                  ...prev, 
                  designLevel: prev.designLevel === design.id ? null : design.id 
                }))}
                className={`group relative p-4 md:p-6 rounded-xl border cursor-pointer overflow-hidden transition-all duration-500 ${
                  selections.designLevel === design.id
                    ? design.id === 'premium_uiux'
                      ? "border-purple-400 bg-purple-400/10 shadow-[0_0_40px_rgba(192,132,252,0.35)] scale-[1.03] z-10"
                      : "border-blue-400 bg-blue-400/10 shadow-[0_0_20px_rgba(96,165,250,0.15)] scale-[1.02] z-10"
                    : selections.designLevel
                      ? "border-white/5 bg-white/[0.01] opacity-40 grayscale-[0.2]"
                      : design.id === 'premium_uiux'
                        ? "border-purple-500/30 bg-purple-500/[0.04] scale-[1.02] shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                        : "border-white/5 bg-white/[0.01] opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className={`p-3 md:p-4 rounded-xl flex-shrink-0 transition-colors ${
                    selections.designLevel === design.id 
                      ? design.id === 'premium_uiux' ? "bg-purple-400/20 text-purple-400" : "bg-blue-400/20 text-blue-400" 
                      : "bg-white/5 text-gray-400 group-hover:text-white"
                  }`}>
                    <design.icon className="w-5 md:w-7 h-5 md:h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <p className={`font-bold text-sm md:text-xl transition-colors ${
                            selections.designLevel === design.id 
                              ? design.id === 'premium_uiux' ? "text-purple-300" : "text-blue-300" 
                              : "text-white"
                          }`}>
                            {design.name}
                          </p>
                          {design.recommended && (
                            <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-md bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] uppercase tracking-wider hidden md:inline">
                              RECOMMENDED
                            </span>
                          )}
                          {design.label && !design.recommended && (
                             <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-md bg-white/10 text-gray-400 border border-white/5 uppercase tracking-wider hidden md:inline">
                               {design.label}
                             </span>
                          )}
                        </div>
                        <p className="text-[8px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-1 hidden md:block">
                          Estimated Effort: {design.hours?.[0]}–{design.hours?.[1]} hours
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm md:text-lg text-white">
                          {design.price === 0 ? "Included" : `+ ₹${design.price.toLocaleString()}`}
                        </p>
                        {design.id === 'premium_uiux' && (
                          <p className="text-[8px] md:text-[9px] text-purple-400 font-medium uppercase tracking-tighter mt-1 hidden md:block">High conversion ROI</p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line font-light hidden md:block">{design.desc}</p>
                  </div>
                </div>
                {selections.designLevel === design.id && (
                  <motion.div 
                    layoutId="active-design" 
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${design.id === 'premium_uiux' ? "bg-purple-400" : "bg-blue-400"}`} 
                  />
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t border-white/5 flex justify-center">
            <p className="text-[11px] text-gray-500 italic font-light tracking-wide">
              Higher tiers include more refined design, interactions, and performance focus.
            </p>
          </div>
        </motion.div>
      );

    case 3:
      const categories = ["User & Access", "Content & Engagement", "Business Operations", "Insights & Analytics"];
      return (
        <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold mb-2 tracking-tight text-white/95">Core Features</h2>
              <p className="text-gray-400 font-light text-[15px] leading-relaxed max-w-xl">
                Select the functionalities that power your business logic. Each feature adds critical capability and enhances your digital ecosystem.
              </p>
            </div>
            <div className="shrink-0 pt-2">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-[0.2em]">
                    {selections.features.length} {selections.features.length === 1 ? 'FEATURE' : 'FEATURES'} SELECTED
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category} className="group/category">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-[11px] font-extrabold text-white/40 uppercase tracking-[0.4em] whitespace-nowrap">
                    {category}
                  </h3>
                  <div className="h-px bg-white/5 flex-1 transition-colors group-hover/category:bg-white/10" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.filter(f => f.category === category).map((feature, i) => (
                    <motion.div
                      key={feature.id}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      whileHover={{ y: -4, scale: 1.01 }}
                      onClick={() => toggleFeature(feature.id)}
                      className={`group relative p-4 md:p-6 rounded-[1.25rem] border cursor-pointer transition-all duration-500 ${
                        selections.features.includes(feature.id)
                          ? "border-emerald-500/40 bg-emerald-500/[0.04] shadow-[0_20px_40px_-12px_rgba(16,185,129,0.15)] z-10"
                          : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-4 md:gap-5">
                        {/* CUSTOM CHECKBOX */}
                        <div className={`mt-1 flex items-center justify-center w-5 h-5 rounded-md border transition-all duration-500 ${
                          selections.features.includes(feature.id)
                            ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                            : "border-white/10 text-transparent group-hover:border-white/30"
                        }`}>
                           <motion.div
                             initial={false}
                             animate={{ scale: selections.features.includes(feature.id) ? 1 : 0 }}
                             transition={{ type: "spring", stiffness: 600, damping: 30 }}
                           >
                            <Check size={12} strokeWidth={4} />
                           </motion.div>
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-4 mb-2.5">
                            <div className="flex flex-col gap-1">
                              <p className={`font-bold text-[13px] md:text-[15px] transition-colors duration-300 ${
                                selections.features.includes(feature.id) ? "text-emerald-300" : "text-white/90"
                              }`}>
                                {feature.name}
                              </p>
                              {feature.label && (
                                <div className="flex hidden md:flex">
                                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-[0.15em] ${
                                    feature.label === 'Essential' 
                                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.1)]' 
                                      : 'bg-white/5 text-gray-400 border border-white/5'
                                  }`}>
                                    {feature.label}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="shrink-0 pt-0.5">
                              <p className={`text-xs md:text-sm font-extrabold transition-all duration-300 ${
                                selections.features.includes(feature.id) ? "text-white" : "text-white/40"
                              }`}>
                                +₹{feature.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-[12px] text-gray-500 leading-relaxed font-medium transition-colors duration-300 group-hover:text-gray-400 hidden md:block">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER GUIDANCE */}
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center text-center gap-4">
             <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-white/10" />
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Deployment Recommendations</p>
                <div className="h-px w-8 bg-white/10" />
             </div>
             <p className="text-[13px] text-gray-500 font-medium max-w-lg leading-relaxed">
               Most professional projects incorporate 2–4 core features. Common configurations include User Ecosystems and Payment Gateways.
             </p>
          </div>
        </motion.div>
      );

    case 4:
      return (
        <motion.div key="step4" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold mb-2 tracking-tight text-white/95">Performance Add-ons</h2>
              <p className="text-gray-400 font-light text-[15px] leading-relaxed max-w-xl">
                Optimize speed, security, and discoverability. These enhancements ensure your digital asset is resilient, fast, and easily found by your audience.
              </p>
            </div>
            <div className="shrink-0 pt-2">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 bg-amber-500/5 border border-amber-500/20 px-3 py-1.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-[0.2em]">
                    {selections.performance.length} {selections.performance.length === 1 ? 'OPTION' : 'OPTIONS'} SELECTED
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {performanceOptions.map((option, i) => (
              <motion.div
                key={option.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => togglePerformance(option.id)}
                className={`group relative p-4 md:p-6 rounded-[1.25rem] border cursor-pointer transition-all duration-500 ${
                  selections.performance.includes(option.id)
                    ? "border-amber-500/40 bg-amber-500/[0.04] shadow-[0_20px_40px_-12px_rgba(245,158,11,0.15)] z-10"
                    : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-4 md:gap-5">
                  {/* CUSTOM CHECKBOX */}
                  <div className={`mt-1 flex items-center justify-center w-5 h-5 rounded-md border transition-all duration-500 ${
                    selections.performance.includes(option.id)
                      ? "bg-amber-500 border-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                      : "border-white/10 text-transparent group-hover:border-white/30"
                  }`}>
                    <motion.div
                      initial={false}
                      animate={{ scale: selections.performance.includes(option.id) ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 600, damping: 30 }}
                    >
                      <Check size={12} strokeWidth={4} />
                    </motion.div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4 mb-2.5">
                      <div className="flex flex-col gap-1">
                        <p className={`font-bold text-[13px] md:text-[15px] transition-colors duration-300 ${
                          selections.performance.includes(option.id) ? "text-amber-300" : "text-white/90"
                        }`}>
                          {option.name}
                        </p>
                        {option.label && (
                          <div className="flex hidden md:flex">
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-[0.15em] shadow-sm ${
                              option.id === 'seo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]' : 
                              option.id === 'security' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.1)]' :
                              'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.1)]'
                            }`}>
                              {option.label}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 pt-0.5">
                        <p className={`text-xs md:text-sm font-extrabold transition-all duration-300 ${
                          selections.performance.includes(option.id) ? "text-white" : "text-white/40"
                        }`}>
                          +₹{option.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-[12px] text-gray-500 leading-relaxed font-medium transition-colors duration-300 group-hover:text-gray-400 hidden md:block">
                      {option.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FOOTER GUIDANCE */}
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center text-center gap-4">
             <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-white/10" />
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Infrastructure Standards</p>
                <div className="h-px w-8 bg-white/10" />
             </div>
             <p className="text-[13px] text-gray-500 font-medium max-w-lg leading-relaxed">
               Most professional websites include at least <span className="text-white font-bold">1–2 performance enhancements</span> to ensure optimal load times and search visibility.
             </p>
             <div className="flex items-center gap-4 text-[9px] text-gray-600 font-extrabold uppercase tracking-[0.25em] mt-2">
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" /> Speed
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" /> SEO
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" /> Security
                </span>
             </div>
          </div>
        </motion.div>
      );

    case 5:
      return (
        <motion.div key="step5" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="w-full">
          <h2 className="text-xl md:text-3xl font-bold mb-2 tracking-tight text-white/95">Ongoing Support</h2>
          <p className="text-gray-400 font-light text-sm md:text-base mb-4">Ensure your digital asset remains secure and up-to-date.</p>
          
          {/* Prominent 6-month commitment notice */}
          <div className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-8">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
            <span className="text-[11px] md:text-[13px] text-amber-300 font-bold uppercase tracking-wider">⚠ Minimum 6-Month Commitment Required</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {maintenancePlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover={{ scale: plan.id === 'growth' ? 1.04 : 1.01 }}
                onClick={() => setSelections(prev => ({ 
                  ...prev, 
                  maintenance: prev.maintenance === plan.id ? null : plan.id 
                }))}
                className={`group relative p-4 md:p-6 rounded-xl border cursor-pointer overflow-hidden transition-all duration-500 ${
                  selections.maintenance === plan.id
                    ? plan.id === 'growth'
                      ? "border-emerald-400 bg-emerald-400/10 shadow-[0_0_40px_rgba(52,211,153,0.3)] scale-[1.03]"
                      : "border-white/20 bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03] opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className={`p-3 md:p-4 rounded-xl flex-shrink-0 transition-colors ${
                    selections.maintenance === plan.id 
                      ? plan.id === 'growth' ? "bg-emerald-400/20 text-emerald-400" : "bg-white/10 text-white" 
                      : "bg-white/5 text-gray-500 group-hover:text-white"
                  }`}>
                    <plan.icon className="w-5 md:w-7 h-5 md:h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <p className={`font-bold text-sm md:text-xl transition-colors ${
                            selections.maintenance === plan.id 
                              ? plan.id === 'growth' ? "text-emerald-400" : "text-white" 
                              : "text-white/60"
                          }`}>
                            {plan.name}
                          </p>
                          {plan.label && (
                            <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider hidden md:inline">
                              {plan.label}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 font-light">{plan.desc}</p>
                      </div>
                      <div className="text-right text-white">
                        <p className="font-bold text-sm md:text-lg">₹{plan.price.toLocaleString()}<span className="text-[10px] md:text-xs text-gray-500 font-normal">/mo</span></p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-4 pt-4 border-t border-white/5 hidden md:grid">
                      {plan.bullets?.map((bullet, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <Check size={12} className={`${plan.id === 'growth' ? "text-emerald-400" : "text-gray-600"} flex-shrink-0`} />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {selections.maintenance === plan.id && (
                  <motion.div 
                    layoutId="active-maintenance" 
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${plan.id === 'growth' ? "bg-emerald-400" : "bg-white/40"}`} 
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      );

    default:
      return null;
  }
}
