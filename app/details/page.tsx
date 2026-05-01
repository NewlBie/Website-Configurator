"use client";

import { Montserrat } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, Download, RefreshCcw, ReceiptText, X } from "lucide-react";

import { Selections, features, performanceOptions, maintenancePlans, designLevels, projectTypes } from "./lib/constants";
import { calculatePricing } from "./lib/pricing";
import { StepRenderer } from "./components/StepRenderer";
import { ProjectSummary } from "./components/ProjectSummary";
import { EpicLoading } from "./components/EpicLoading";
import { EstimationPreview } from "./components/EstimationPreview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

function DetailsContent() {
  const params = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isEstimating, setIsEstimating] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  
  const generateUniqueId = () => {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.floor(Math.random() * 9000) + 1000;
    return `NWB-${datePart}-${randomPart}`;
  };

  const [invoiceId, setInvoiceId] = useState(generateUniqueId());

  // Retrieve lead info from URL
  const userName = params.get("name") || "Anonymous";
  const userEmail = params.get("email") || "Not provided";
  const userPhone = params.get("phone") || "Not provided";

  useEffect(() => {
    setMounted(true);
  }, []);

  const [selections, setSelections] = useState<Selections>({
    projectType: null,
    designLevel: null,
    features: [],
    performance: [],
    maintenance: null,
  });

  const pricing = calculatePricing(selections);

  const toggleFeature = (featureId: string) => {
    setSelections(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const togglePerformance = (perfId: string) => {
    setSelections(prev => ({
      ...prev,
      performance: prev.performance.includes(perfId)
        ? prev.performance.filter(id => id !== perfId)
        : [...prev.performance, perfId]
    }));
  };

  const submitToSheets = async (id: string) => {
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxwALXjLOsyZkbn3S1H4Fy9GGLCTMmBscMMOReumW1Raky1yjMeGbJiWN8qJ7Tr5YoV/exec";
    
    const payload = {
      invoiceId: id,
      timestamp: new Date().toISOString(),
      name: userName,
      email: userEmail,
      phone: userPhone,
      // Project Foundation
      projectType: projectTypes.find(t => t.id === selections.projectType)?.name || "Not Selected",
      designLevel: designLevels.find(d => d.id === selections.designLevel)?.name || "Not Selected",
      maintenance: maintenancePlans.find(m => m.id === selections.maintenance)?.name || "None",
      // Technical Specs
      features: selections.features.map(fId => features.find(f => f.id === fId)?.name).filter(Boolean).join(", "),
      performance: selections.performance.map(pId => performanceOptions.find(p => p.id === pId)?.name).filter(Boolean).join(", "),
      // Output Metrics
      totalPrice: pricing.finalPrice,
      timeline: `${pricing.minDays}-${pricing.maxDays} Business Days`,
      effort: `${pricing.minHours}-${pricing.maxHours} Hours`,
      // Raw Metadata
      selectionsJson: JSON.stringify(selections)
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script Web Apps
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      console.log("Data synced to Sheets successfully");
    } catch (error) {
      console.error("Sheet sync failed:", error);
    }
  };

  const handleGetEstimation = () => {
    const newId = generateUniqueId();
    setInvoiceId(newId);
    
    // Sync data to Sheets in the background
    submitToSheets(newId);
    
    setIsEstimating(true);
  };

  const handleLoadingComplete = () => {
    setIsEstimating(false);
    setShowPreview(true);
  };

  const generatePdf = async () => {
    const element = pdfRef.current;
    if (!element) return;

    // Capture the rendered ProjectSummary as a high-res canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#050505",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    const margin = 0; // full-bleed

    const contentWidth = pdfWidth - margin * 2;
    const contentHeight = (imgHeight * contentWidth) / imgWidth;

    const doc = new jsPDF("p", "mm", "a4");
    let heightLeft = contentHeight;
    let position = margin;
    let page = 0;

    // First page
    doc.addImage(imgData, "PNG", margin, position, contentWidth, contentHeight);
    heightLeft -= (pdfHeight - margin * 2);

    // Additional pages if the invoice is long
    while (heightLeft > 0) {
      position = -(pdfHeight - margin * 2) * (page + 1) + margin;
      doc.addPage();
      doc.addImage(imgData, "PNG", margin, position, contentWidth, contentHeight);
      heightLeft -= (pdfHeight - margin * 2);
      page++;
    }

    doc.save(`Project_Summary_${invoiceId}.pdf`);
  };

  const stepVariants: Variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  };

  const invoiceVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
  };

  const invoiceDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });


  if (!mounted) return null;

  return (
    <main className={`${montserrat.className} h-screen w-full flex flex-col bg-[#0a0a0a] text-white selection:bg-emerald-500/30 overflow-hidden`}>

      <AnimatePresence>
        {isEstimating && (
          <EpicLoading onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-5 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
            <span className="font-bold text-black text-sm">NB</span>
          </div>
          <span className="font-bold text-lg tracking-wider">NEWL<span className="font-light">BIE</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Configuration ID</span>
            <span className="font-mono text-emerald-400">{invoiceId}</span>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">

        <AnimatePresence mode="wait">
          {showPreview ? (
            <EstimationPreview
              selections={selections}
              pricing={pricing}
              onDownload={generatePdf}
              onReset={() => {
                setShowPreview(false);
                setCurrentStep(1);
              }}
            />
          ) : (
            <motion.div
              key="configurator"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex w-full h-full overflow-hidden"
            >
              {/* LEFT COLUMN - CONFIGURATOR */}
              <div className="w-full lg:w-[55%] h-full flex flex-col relative">

                {/* Progress Header (Minimalist Redesign) */}
                <div className="px-12 pt-10 pb-8 shrink-0">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-[0.3em]">
                        Step 0{currentStep} of 05
                      </span>
                      <h2 className="text-sm font-bold text-white/90">
                        {currentStep === 1 && "Project Foundation"}
                        {currentStep === 2 && "Design & Experience"}
                        {currentStep === 3 && "Core Features"}
                        {currentStep === 4 && "Infrastructure"}
                        {currentStep === 5 && "Support Model"}
                      </h2>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                      {Math.round((currentStep / 5) * 100)}% COMPLETE
                    </span>
                  </div>
                  
                  {/* Segmented Progress Bar */}
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div 
                        key={step} 
                        className="h-1 flex-1 rounded-full bg-white/5 relative overflow-hidden"
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${step <= currentStep ? "from-emerald-400 to-emerald-500" : "from-transparent to-transparent"}`}
                          initial={false}
                          animate={{ 
                            x: step <= currentStep ? "0%" : "-100%",
                            opacity: step === currentStep ? 1 : step < currentStep ? 0.4 : 0
                          }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                        {step === currentStep && (
                          <motion.div 
                            className="absolute inset-0 bg-white/40 blur-sm"
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scrolling Content */}
                <div className="flex-1 overflow-y-auto px-12 pb-40 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="max-w-2xl py-6">
                    <AnimatePresence mode="wait">
                      <StepRenderer
                        currentStep={currentStep}
                        selections={selections}
                        setSelections={setSelections}
                        stepVariants={stepVariants}
                        itemVariants={itemVariants}
                        toggleFeature={toggleFeature}
                        togglePerformance={togglePerformance}
                      />
                    </AnimatePresence>
                  </div>
                </div>

                {/* Fixed Footer Controls (Optimized) */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/98 to-transparent pt-20 z-20">
                  <div className="max-w-2xl">
                    <div className="flex justify-between items-center gap-4 md:gap-6">
                      <button
                        onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                        disabled={currentStep === 1}
                        className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-medium text-xs md:text-sm transition-all duration-300 ${currentStep === 1
                            ? "opacity-30 cursor-not-allowed text-gray-400"
                            : "text-white bg-white/5 hover:bg-white/10"
                          }`}
                      >
                        <ArrowLeft className="w-3.5 md:w-4 h-3.5 md:h-4" /> <span className="hidden md:inline">Back</span>
                      </button>

                      <div className="flex items-center gap-3 md:gap-4">
                        {/* Mobile Summary Toggle */}
                        <button
                          onClick={() => setShowMobileSummary(!showMobileSummary)}
                          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider text-emerald-400 border border-emerald-400/20 bg-emerald-500/5 active:scale-95 transition-all"
                        >
                          <ReceiptText size={14} /> Summary
                        </button>

                        {currentStep < 5 ? (
                          <button
                            onClick={() => setCurrentStep(prev => Math.min(prev + 1, 5))}
                            className="flex items-center gap-2 px-5 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-xs md:text-sm text-black bg-white hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                          >
                            Continue <ChevronRight className="w-3.5 md:w-4 h-3.5 md:h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={handleGetEstimation}
                            className="flex items-center gap-2 px-5 md:px-6 py-2 md:py-2.5 rounded-lg font-extrabold text-xs md:text-sm text-black bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_25px_rgba(52,211,153,0.25)] hover:scale-[1.02] uppercase tracking-wider"
                          >
                            ESTIMATE <ArrowRight className="w-3.5 md:w-4 h-3.5 md:h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    {currentStep === 5 && (
                      <div className="flex gap-4 text-[10px] text-gray-500 font-medium animate-in fade-in slide-in-from-bottom-2 duration-700 mt-4">
                        <span className="flex items-center gap-1">✔ Structured development process</span>
                        <span className="flex items-center gap-1">✔ Clearly defined deliverables</span>
                        <span className="flex items-center gap-1">✔ Post-launch support available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - PROJECT SUMMARY */}
              <div className={`
                fixed inset-0 z-[100] lg:relative lg:inset-auto lg:z-auto lg:w-[45%]
                ${showMobileSummary ? "flex flex-col" : "hidden lg:flex"}
              `}>
                {/* Backdrop for mobile */}
                <div 
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
                  onClick={() => setShowMobileSummary(false)}
                />
                
                {/* Mobile: slide-up sheet from bottom | Desktop: full side panel */}
                <div className="mt-auto lg:mt-0 h-[85vh] lg:h-full w-full relative z-[101] lg:z-auto rounded-t-2xl lg:rounded-none overflow-hidden">
                  <ProjectSummary
                    selections={selections}
                    pricing={pricing}
                    invoiceId={invoiceId}
                    invoiceDate={invoiceDate}
                    invoiceVariants={invoiceVariants}
                    forceVisible={true}
                  />
                </div>

                {/* Close Button Mobile */}
                <button
                  onClick={() => setShowMobileSummary(false)}
                  className="lg:hidden fixed top-[calc(15vh+12px)] right-4 z-[110] w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden off-screen ProjectSummary for PDF capture */}
      <div
        ref={pdfRef}
        className="fixed"
        style={{ left: '-9999px', top: 0, width: '800px', zIndex: -1 }}
      >
        <ProjectSummary
          selections={selections}
          pricing={pricing}
          invoiceId={invoiceId}
          invoiceDate={invoiceDate}
          invoiceVariants={invoiceVariants}
          forceVisible={true}
        />
      </div>
    </main>
  );
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center text-white">Loading Configurator...</div>}>
      <DetailsContent />
    </Suspense>
  );
}