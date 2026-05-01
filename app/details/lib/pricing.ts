import { 
  Selections, projectTypes, designLevels, features, performanceOptions 
} from "./constants";

export function calculatePricing(selections: Selections) {
  let subtotal = 0;
  let minHours = 0;
  let maxHours = 0;

  if (selections.projectType) {
    const project = projectTypes.find(p => p.id === selections.projectType);
    if (project && project.hours) {
      subtotal += project.price;
      minHours += project.hours[0];
      maxHours += project.hours[1];
    }
  }
  if (selections.designLevel) {
    const design = designLevels.find(d => d.id === selections.designLevel);
    if (design && design.hours) {
      subtotal += design.price;
      minHours += design.hours[0];
      maxHours += design.hours[1];
    }
  }
  selections.features.forEach(featureId => {
    const feature = features.find(f => f.id === featureId);
    if (feature && feature.hours) {
      subtotal += feature.price;
      minHours += feature.hours[0];
      maxHours += feature.hours[1];
    }
  });
  selections.performance.forEach(perfId => {
    const perf = performanceOptions.find(p => p.id === perfId);
    if (perf && perf.hours) {
      subtotal += perf.price;
      minHours += perf.hours[0];
      maxHours += perf.hours[1];
    }
  });

  let complexityMultiplier = 1.0;

  const adjustedSubtotal = subtotal * complexityMultiplier;
  let total = adjustedSubtotal;
  
  let urgencyMultiplier = 1.0;
  total *= urgencyMultiplier;

  let discount = 0;
  if (selections.maintenance) {
    if (selections.maintenance === "basic") discount = 1500;
    else if (selections.maintenance === "growth") discount = 2000;
    else if (selections.maintenance === "premium") discount = 2500;
    total -= discount;
  }

  const finalPrice = subtotal > 0 ? Math.max(total, 8000) : 0;

  const minDays = Math.ceil((minHours / 6) * 1.3);
  const maxDays = Math.ceil((maxHours / 6) * 1.3);

  return {
    subtotal: adjustedSubtotal,
    minHours,
    maxHours,
    complexityMultiplier,
    discount,
    finalPrice,
    minDays,
    maxDays
  };
}
