export const kpis = [
  {
    key: "risk",
    label: "High Stockout Risk",
    value: "24",
    sub: "Clinics at risk",
    delta: "18% vs last week",
    up: true,
    tone: "danger" as const,
  },
  {
    key: "expiring",
    label: "Expiring Stock",
    value: "₹2.48L",
    sub: "Value at risk",
    delta: "12% vs last week",
    up: true,
    tone: "warning" as const,
  },
  {
    key: "accuracy",
    label: "Forecast Accuracy",
    value: "92.6%",
    sub: "Overall accuracy",
    delta: "4.3% vs last week",
    up: false,
    tone: "success" as const,
  },
  {
    key: "clinics",
    label: "Total Clinics",
    value: "1,248",
    sub: "Active clinics",
    delta: "35 new this week",
    up: false,
    tone: "info" as const,
  },
];

export const sparkData = [3, 5, 4, 6, 5, 8, 7, 9, 8, 11].map((v, i) => ({ i, v }));

export type ForecastPoint = {
  date: string;
  historical?: number;
  forecast?: number;
  upper?: number;
  lower?: number;
};

export const forecastSeries: ForecastPoint[] = [
  { date: "Apr 20", historical: 4000 },
  { date: "Apr 23", historical: 4300 },
  { date: "Apr 27", historical: 4150 },
  { date: "Apr 30", historical: 5200 },
  { date: "May 4", historical: 6200 },
  { date: "May 7", historical: 6900 },
  { date: "May 11", historical: 5600 },
  { date: "May 14", historical: 5400 },
  { date: "May 18", historical: 4200 },
  { date: "May 21", historical: 3900, forecast: 3900, upper: 4300, lower: 3400 },
  { date: "May 25", forecast: 4400, upper: 5100, lower: 3600 },
  { date: "May 28", forecast: 4600, upper: 5400, lower: 3700 },
  { date: "Jun 1", forecast: 4550, upper: 5600, lower: 3600 },
  { date: "Jun 4", forecast: 4750, upper: 5900, lower: 3700 },
  { date: "Jun 8", forecast: 5100, upper: 6400, lower: 3900 },
  { date: "Jun 11", forecast: 5620, upper: 7450, lower: 3800 },
];

export const clinicHealth = [
  { name: "Patel Nagar", score: 86 },
  { name: "Rohini Sec-7", score: 72 },
  { name: "Dwarka Sec-3", score: 49 },
  { name: "Najafgarh", score: 32 },
  { name: "Mangolpuri", score: 18 },
];

export type Risk = "High" | "Medium" | "Low";

export const riskMedicines: {
  medicine: string;
  atRisk: number;
  stock: number;
  demand: number;
  risk: Risk;
}[] = [
  { medicine: "Amoxicillin 500mg", atRisk: 18, stock: 2150, demand: 4980, risk: "High" },
  { medicine: "ORS Sachet", atRisk: 14, stock: 1320, demand: 3450, risk: "High" },
  { medicine: "Paracetamol 500mg", atRisk: 10, stock: 3200, demand: 5620, risk: "Medium" },
  { medicine: "Azithromycin 500mg", atRisk: 8, stock: 1100, demand: 2300, risk: "Medium" },
  { medicine: "Metformin 500mg", atRisk: 6, stock: 6000, demand: 4200, risk: "Low" },
];

export type AlertKind = "stockout" | "expiring" | "demand";

export const alerts: {
  id: string;
  kind: AlertKind;
  title: string;
  body: string;
  action: string;
}[] = [
  {
    id: "a1",
    kind: "stockout",
    title: "High stockout risk: Amoxicillin 500mg",
    body: "18 clinics may run out in next 7 days",
    action: "View Clinics",
  },
  {
    id: "a2",
    kind: "expiring",
    title: "Expiring stock: 2 batches",
    body: "₹82,400 worth stock expiring in 30 days",
    action: "View Batches",
  },
  {
    id: "a3",
    kind: "demand",
    title: "Demand spike predicted",
    body: "ORS sachet demand may increase by 68%",
    action: "View Forecast",
  },
  {
    id: "a4",
    kind: "stockout",
    title: "Low stock: ORS Sachet",
    body: "Dwarka Sec-3 below reorder threshold",
    action: "Place Order",
  },
  {
    id: "a5",
    kind: "expiring",
    title: "Metformin 500mg batch expiring",
    body: "Batch METS00-APR25 expires 12 Jun 2025",
    action: "View Batch",
  },
  {
    id: "a6",
    kind: "demand",
    title: "Seasonal demand shift",
    body: "Antipyretics demand up 22% across North zone",
    action: "View Forecast",
  },
  {
    id: "a7",
    kind: "stockout",
    title: "Azithromycin below buffer",
    body: "8 clinics under 3-day cover",
    action: "Redistribute",
  },
];

export const inventory: {
  medicine: string;
  units: number;
  status: "Good" | "Low (Reorder)" | "Expiring Soon";
  batch: string;
  expiry: string;
}[] = [
  { medicine: "Paracetamol 500mg", units: 3200, status: "Good", batch: "PARA-JAN25", expiry: "14 Mar 2026" },
  { medicine: "Amoxicillin 500mg", units: 450, status: "Low (Reorder)", batch: "AMOX-FEB25", expiry: "02 Jan 2026" },
  { medicine: "ORS Sachet", units: 320, status: "Low (Reorder)", batch: "ORS-MAR25", expiry: "30 Nov 2026" },
  { medicine: "Metformin 500mg", units: 2800, status: "Expiring Soon", batch: "METS00-APR25", expiry: "12 Jun 2025" },
  { medicine: "Amlodipine 5mg", units: 1150, status: "Good", batch: "AMLO-JAN25", expiry: "21 Aug 2026" },
  { medicine: "Azithromycin 500mg", units: 280, status: "Low (Reorder)", batch: "AZI-FEB25", expiry: "17 May 2026" },
];

export const clinics = [
  { name: "Jan Aushadhi Kendra – Patel Nagar", zone: "Central", health: 86, stockouts: 0, lastSync: "2 min ago" },
  { name: "Jan Aushadhi Kendra – Rohini Sec-7", zone: "North", health: 72, stockouts: 1, lastSync: "9 min ago" },
  { name: "Jan Aushadhi Kendra – Dwarka Sec-3", zone: "South West", health: 49, stockouts: 3, lastSync: "24 min ago" },
  { name: "Jan Aushadhi Kendra – Najafgarh", zone: "West", health: 32, stockouts: 5, lastSync: "1 hr ago" },
  { name: "Jan Aushadhi Kendra – Mangolpuri", zone: "North West", health: 18, stockouts: 7, lastSync: "3 hr ago" },
];

export const redistribution = [
  { medicine: "Amoxicillin 500mg", from: "Central Warehouse", to: "Mangolpuri", units: 800, eta: "2 – 3 days" },
  { medicine: "ORS Sachet", from: "Patel Nagar", to: "Dwarka Sec-3", units: 600, eta: "1 day" },
  { medicine: "Metformin 500mg", from: "Rohini Sec-7", to: "Najafgarh", units: 1200, eta: "2 days" },
  { medicine: "Azithromycin 500mg", from: "Central Warehouse", to: "Dwarka Sec-3", units: 400, eta: "3 days" },
];

export const accuracyTrend = [
  { month: "Dec", accuracy: 84 },
  { month: "Jan", accuracy: 86 },
  { month: "Feb", accuracy: 88 },
  { month: "Mar", accuracy: 89 },
  { month: "Apr", accuracy: 91 },
  { month: "May", accuracy: 92.6 },
];

export const zoneDemand = [
  { zone: "Central", units: 24000 },
  { zone: "North", units: 31000 },
  { zone: "South West", units: 18500 },
  { zone: "West", units: 21200 },
  { zone: "North West", units: 15800 },
];
