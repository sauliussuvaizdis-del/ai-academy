// Pure calculation functions behind the ROI and pricing calculators.

export interface RoiInput {
  hoursSavedPerWeek: number
  hourlyCost: number
  weeksPerYear: number
  extraRevenuePerMonth: number
  toolCostPerMonth: number
  buildCost: number
}

export interface RoiResult {
  monthlyBenefit: number
  monthlyNet: number
  annualBenefit: number
  annualToolCost: number
  firstYearNet: number
  roiPercent: number | null
  paybackMonths: number | null
}

export function calcRoi(i: RoiInput): RoiResult {
  const annualTime = i.hoursSavedPerWeek * i.hourlyCost * i.weeksPerYear
  const annualBenefit = annualTime + i.extraRevenuePerMonth * 12
  const monthlyBenefit = annualBenefit / 12
  const annualToolCost = i.toolCostPerMonth * 12
  const monthlyNet = monthlyBenefit - i.toolCostPerMonth
  const firstYearNet = annualBenefit - annualToolCost - i.buildCost
  const firstYearCost = i.buildCost + annualToolCost
  return {
    monthlyBenefit,
    monthlyNet,
    annualBenefit,
    annualToolCost,
    firstYearNet,
    roiPercent: firstYearCost > 0 ? (firstYearNet / firstYearCost) * 100 : null,
    paybackMonths: monthlyNet > 0 ? i.buildCost / monthlyNet : null,
  }
}

export interface PriceInput {
  buildHours: number
  dayRate: number
  hoursPerDay: number
  contingencyPercent: number
  toolSetupCosts: number
  toolMarkupPercent: number
  retainerHoursPerMonth: number
  monthlyToolCosts: number
  vatRegistered: boolean
}

export interface PriceResult {
  hourlyRate: number
  labour: number
  contingency: number
  toolsCharged: number
  buildPriceExVat: number
  buildVat: number
  buildPriceIncVat: number
  retainerExVat: number
  retainerIncVat: number
  firstYearValueExVat: number
}

const round2 = (n: number) => Math.round(n * 100) / 100

export function calcPrice(i: PriceInput): PriceResult {
  const hourlyRate = i.hoursPerDay > 0 ? i.dayRate / i.hoursPerDay : 0
  const labour = i.buildHours * hourlyRate
  const contingency = labour * (i.contingencyPercent / 100)
  const toolsCharged = i.toolSetupCosts * (1 + i.toolMarkupPercent / 100)
  const buildPriceExVat = round2(labour + contingency + toolsCharged)
  const vatRate = i.vatRegistered ? 0.2 : 0
  const retainerExVat = round2(i.retainerHoursPerMonth * hourlyRate + i.monthlyToolCosts * (1 + i.toolMarkupPercent / 100))
  return {
    hourlyRate: round2(hourlyRate),
    labour: round2(labour),
    contingency: round2(contingency),
    toolsCharged: round2(toolsCharged),
    buildPriceExVat,
    buildVat: round2(buildPriceExVat * vatRate),
    buildPriceIncVat: round2(buildPriceExVat * (1 + vatRate)),
    retainerExVat,
    retainerIncVat: round2(retainerExVat * (1 + vatRate)),
    firstYearValueExVat: round2(buildPriceExVat + retainerExVat * 12),
  }
}

export const gbp = (n: number, dp = 0) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: dp, maximumFractionDigits: dp }).format(n)
