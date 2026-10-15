export interface SubscriptionPlan {
  id: "basic" | "plus" | "care" | "pro" | "premium";
  name: string;
  pricePerMonth: number;
  promoFirstCyclePrice?: number;
  exteriorVisits: number;
  interiorVisits: number;
  totalVisits: number;
  positioning: string;
  isHero?: boolean;
  tagline: string;
  features: string[];
  cadenceDescription: string;
}

export interface ServiceStandardItem {
  id: string;
  title: string;
  description: string;
  type: "exterior" | "interior";
}

export interface AddOnService {
  id: string;
  name: string;
  indicativePrice: string;
  priceNum: number;
  duration: string;
  description: string;
  category: "detailing" | "interior" | "exterior" | "treatment";
}

export interface Society {
  id: string;
  name: string;
  locality: string;
  zone: string;
  activeCars: number;
  milestoneTarget: number;
  nextBenefit: string;
  isUnlocked: boolean;
  cleanersAssigned: number;
  gateLocation: string;
}

export interface ServiceRecord {
  id: string;
  visitId: string;
  vehicleId: string;
  vehicleReg: string;
  societyName: string;
  cleanerId: string;
  cleanerName: string;
  timestamp: string;
  serviceType: "Exterior + Interior" | "Exterior Only" | "Add-On Detailing";
  status: "Completed" | "In Progress" | "Exception" | "Scheduled";
  checklistCompleted: string[];
  photos: string[];
  notes?: string;
  rating?: number;
  ratingFeedback?: string;
  exceptionReason?: string;
}

export interface ServiceEntitlement {
  id: string;
  visitNumber: number;
  serviceType: "Exterior + Interior" | "Exterior Only";
  status: "Used" | "Upcoming" | "Scheduled" | "Missed" | "Credit Issued";
  scheduledDate?: string;
  scheduledSlot?: string;
  recordId?: string;
}

export interface ServiceCredit {
  id: string;
  issuedDate: string;
  reason: string;
  status: "Available" | "Redeemed" | "Expired";
  expiryDate: string;
  equivalentService: string;
}

export interface QualityTicket {
  id: string;
  vehicleReg: string;
  society: string;
  issue: string;
  category: "Missed Area" | "Timing" | "Cleaner Conduct" | "Water Spot" | "Other";
  status: "Open" | "Assigned" | "In progress" | "Resolved" | "Closed";
  createdAt: string;
  cleanerName: string;
  resolutionNote?: string;
  slaHoursRemaining: number;
}

export interface CleanerShift {
  id: string;
  cleanerName: string;
  phone: string;
  cluster: string;
  status: "On Shift" | "Break" | "Completed";
  assignedCars: number;
  completedCars: number;
  rating: number;
  checkInTime: string;
}

export interface WhatsAppNotification {
  id: string;
  timestamp: string;
  type: "welcome" | "scheduled" | "completed" | "exception" | "credit" | "complaint" | "referral" | "society";
  title: string;
  message: string;
  linkText?: string;
  linkAction?: string;
}

export interface CustomerVehicle {
  regNumber: string;
  make: string;
  model: string;
  color: string;
  societyId: string;
  societyName: string;
  parkingSlot: string;
  qrToken: string;
  planId: "basic" | "plus" | "care" | "pro" | "premium";
  billingCycleStart: string;
  billingCycleEnd: string;
  monthlyFee: number;
  referralCode: string;
  referralsCompleted: number;
  referralsTarget: number;
}

// ----------------------------------------------------
// PRD 2.0 SUBSCRIPTION PLANS
// ----------------------------------------------------
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    pricePerMonth: 299,
    exteriorVisits: 4,
    interiorVisits: 2,
    totalVisits: 4,
    positioning: "Entry",
    tagline: "Essential monthly hygiene for occasional drivers",
    features: [
      "4× Waterless exterior cleaning visits",
      "2× Basic cabin vacuuming visits",
      "Windshield, mirrors & tyre dressing",
      "2–3 Digital inspection photos per service",
      "CarCall Dual Windshield QR Protection",
      "RWA basement water-ban compliant",
    ],
    cadenceDescription: "1 visit per week (Alternating exterior & interior)",
  },
  {
    id: "plus",
    name: "Plus",
    pricePerMonth: 399,
    exteriorVisits: 4,
    interiorVisits: 4,
    totalVisits: 4,
    positioning: "Regular",
    tagline: "Balanced weekly exterior shine + full weekly cabin vacuum",
    features: [
      "4× Waterless exterior cleaning visits",
      "4× Basic cabin vacuuming visits (Every visit)",
      "Dashboard, console & door panel wipe down",
      "Accessible dust, crumb and footwell cleaning",
      "Streak-free glass & mirror finish",
      "Persistent digital vehicle service history",
    ],
    cadenceDescription: "1 visit per week (Exterior + Interior every visit)",
  },
  {
    id: "care",
    name: "Care ⭐",
    pricePerMonth: 499,
    promoFirstCyclePrice: 299,
    exteriorVisits: 6,
    interiorVisits: 4,
    totalVisits: 6,
    positioning: "Main Hero Plan",
    isHero: true,
    tagline: "“My car is regularly maintained, and I know every time it was serviced.”",
    features: [
      "6× Waterless exterior maintenance visits/mo",
      "4× Basic interior vacuum & console wipes",
      "Priority society scheduled route slot",
      "High-resolution digital photo proof on completion",
      "Automated WhatsApp completion reports",
      "Missed service credit protection policy",
      "Persistent digital service log book",
    ],
    cadenceDescription: "Week 1: Ext+Int • Week 2: Ext • Week 3: Ext+Int • Week 4: Ext + 2 Flexible mid-week visits",
  },
  {
    id: "pro",
    name: "Pro",
    pricePerMonth: 599,
    exteriorVisits: 8,
    interiorVisits: 4,
    totalVisits: 8,
    positioning: "High-Frequency",
    tagline: "Twice-a-week clean for daily highway & city commuters",
    features: [
      "8× Waterless exterior cleaning visits (2x / week)",
      "4× Basic cabin vacuuming visits",
      "Deep tyre shine & rim brake dust extraction",
      "Monsoon rain-repellent windshield wipe",
      "Full digital service history & photo audit",
      "Complimentary priority slot rescheduling",
    ],
    cadenceDescription: "2 visits per week (Alternating Ext+Int and Ext-only)",
  },
  {
    id: "premium",
    name: "Premium",
    pricePerMonth: 699,
    exteriorVisits: 8,
    interiorVisits: 8,
    totalVisits: 8,
    positioning: "Maximum Maintenance",
    tagline: "Showroom-clean condition 24/7 with zero customer effort",
    features: [
      "8× Waterless exterior cleaning visits",
      "8× Basic cabin vacuuming visits (Every single visit)",
      "Dedicated senior cleaner assignment",
      "Complete interior sanitization & dust extraction",
      "VIP supervisor quality audits every 2 weeks",
      "Instant replacement credits for weather holds",
    ],
    cadenceDescription: "2 visits per week (Exterior + Interior every visit)",
  },
];

// ----------------------------------------------------
// PRD 3.1 & 3.2 SERVICE STANDARDS
// ----------------------------------------------------
export const EXTERIOR_STANDARDS: ServiceStandardItem[] = [
  {
    id: "ext-1",
    title: "Waterless Exterior Cleaning",
    description: "High-lubricity polymer wash lifts dirt without scratching clearcoat or leaving water puddles in basement bays.",
    type: "exterior",
  },
  {
    id: "ext-2",
    title: "Windshield & Exterior Glass",
    description: "Streak-free crystal clear glass cleaner applied to windshield, rear windscreen, and side windows.",
    type: "exterior",
  },
  {
    id: "ext-3",
    title: "Rearview Mirrors",
    description: "Anti-glare clean and smudge removal on driver and passenger ORVMs.",
    type: "exterior",
  },
  {
    id: "ext-4",
    title: "Wheels & Rims",
    description: "Brake dust wipe down and rim spoke cleaning using dedicated microfiber cloths.",
    type: "exterior",
  },
  {
    id: "ext-5",
    title: "Tyres Dressing",
    description: "Deep black tyre dressing restores OEM matte-gloss sheen and protects sidewalls from fading.",
    type: "exterior",
  },
  {
    id: "ext-6",
    title: "Final Inspection & 2–3 Photos",
    description: "Supervisor-grade walkthrough check with 2 to 3 photos uploaded directly to customer digital history.",
    type: "exterior",
  },
];

export const INTERIOR_STANDARDS: ServiceStandardItem[] = [
  {
    id: "int-1",
    title: "Vacuum Floor & Footwells",
    description: "High-suction turbine extraction removes dry gravel, dried mud, and particulate debris.",
    type: "interior",
  },
  {
    id: "int-2",
    title: "Vacuum Floor Mats",
    description: "Rubber or 7D mats lifted, dry brushed, and deep vacuumed front and rear.",
    type: "interior",
  },
  {
    id: "int-3",
    title: "Basic Seat Vacuum",
    description: "Crevice vacuuming across fabric folds and leather seat contours.",
    type: "interior",
  },
  {
    id: "int-4",
    title: "Dashboard Wipe",
    description: "Anti-static microfiber wipe of dashboard surface and speedometer binnacle.",
    type: "interior",
  },
  {
    id: "int-5",
    title: "Centre-Console Wipe",
    description: "Cleaning cup holders, gear lever trim, and handbrake console.",
    type: "interior",
  },
  {
    id: "int-6",
    title: "Door-Panel Wipe",
    description: "Bottle holders, armrests, and door release handles wiped clean.",
    type: "interior",
  },
  {
    id: "int-7",
    title: "Interior Glass Wipe",
    description: "Inside windshield haze and finger smudges removed for glare-free driving.",
    type: "interior",
  },
  {
    id: "int-8",
    title: "Accessible Dust & Crumb Removal",
    description: "Soft bristle brush dust extraction from AC louvers and switchgear.",
    type: "interior",
  },
];

// ----------------------------------------------------
// PRD 3.3 ROUTINE EXCLUSIONS & ADD-ON MARKETPLACE
// ----------------------------------------------------
export const ROUTINE_EXCLUSIONS = [
  "Deep seat steam cleaning & stain extraction",
  "Carpet foam shampooing",
  "Severe food/chemical stain removal",
  "Leather nourishing & conditioning balms",
  "Machine rotary polishing or swirl removal",
  "Carnauba paste waxing or paint sealant",
  "Ceramic or Graphene multi-year coatings",
  "Engine bay degreasing and pressure wash",
];

export const ADD_ON_SERVICES: AddOnService[] = [
  {
    id: "addon-deep-interior",
    name: "Deep Interior Cleaning",
    indicativePrice: "₹499 – ₹799",
    priceNum: 599,
    duration: "60 mins",
    description: "Deep sanitization, intensive seat shampoo, roof fabric clean, and heavy crevice extraction.",
    category: "interior",
  },
  {
    id: "addon-seat-shampoo",
    name: "Seat / Carpet Shampoo",
    indicativePrice: "₹499+",
    priceNum: 499,
    duration: "45 mins",
    description: "Enzyme foam extraction lifts stubborn coffee, ink, juice, and muddy pet stains from upholstery.",
    category: "interior",
  },
  {
    id: "addon-exterior-polish",
    name: "Exterior Machine Polish",
    indicativePrice: "₹699+",
    priceNum: 799,
    duration: "75 mins",
    description: "Removes fine spiderweb swirl marks, oxidation haze, and restores deep glossy paint reflection.",
    category: "exterior",
  },
  {
    id: "addon-full-detailing",
    name: "Full Showroom Detailing",
    indicativePrice: "₹1,499+",
    priceNum: 1499,
    duration: "120 mins",
    description: "Comprehensive multi-stage interior deep clean + exterior 3-step gloss sealant + engine bay dressing.",
    category: "detailing",
  },
  {
    id: "addon-headlight",
    name: "Headlight Clarity Restoration",
    indicativePrice: "₹499+",
    priceNum: 499,
    duration: "30 mins",
    description: "Clears yellowed, oxidized plastic headlight lenses for maximum night driving visibility.",
    category: "treatment",
  },
  {
    id: "addon-odour",
    name: "Citrus Ozone Odour Treatment",
    indicativePrice: "₹299+",
    priceNum: 299,
    duration: "25 mins",
    description: "Eliminates air-conditioner fungus, cigarette smoke, and pet smells at the molecular level.",
    category: "treatment",
  },
];

// ----------------------------------------------------
// NORTH BENGALURU SOCIETIES (Initial Cluster)
// ----------------------------------------------------
export const SOCIETIES_NORTH_BLR: Society[] = [
  {
    id: "sobha-city",
    name: "Sobha City",
    locality: "Thanisandra / Hegde Nagar",
    zone: "North Bengaluru",
    activeCars: 48,
    milestoneTarget: 60,
    nextBenefit: "20% Society Community Discount on all plans",
    isUnlocked: false,
    cleanersAssigned: 3,
    gateLocation: "Gate 2 Basement Parking B1-B3",
  },
  {
    id: "prestige-willow",
    name: "Prestige Willow Green",
    locality: "Vidyaranyapura",
    zone: "North Bengaluru",
    activeCars: 18,
    milestoneTarget: 20,
    nextBenefit: "1 Free Extra Deep Interior Add-on for all cars",
    isUnlocked: false,
    cleanersAssigned: 2,
    gateLocation: "Main Gate, Basement Podium 1",
  },
  {
    id: "brigade-caladium",
    name: "Brigade Caladium",
    locality: "Hebbal",
    zone: "North Bengaluru",
    activeCars: 34,
    milestoneTarget: 40,
    nextBenefit: "Permanent Priority Morning Slot Allocation",
    isUnlocked: false,
    cleanersAssigned: 2,
    gateLocation: "Block A & B Basement Bay",
  },
  {
    id: "godrej-platinum",
    name: "Godrej Platinum",
    locality: "Hebbal Kempapura",
    zone: "North Bengaluru",
    activeCars: 28,
    milestoneTarget: 30,
    nextBenefit: "₹100 Monthly Renewal Subsidy",
    isUnlocked: false,
    cleanersAssigned: 2,
    gateLocation: "Tower 1 Basement Level 2",
  },
  {
    id: "mantri-webcity",
    name: "Mantri Webcity",
    locality: "Hennur Main Road",
    zone: "North Bengaluru",
    activeCars: 22,
    milestoneTarget: 40,
    nextBenefit: "Free Dual Windshield QR Pack for every car",
    isUnlocked: false,
    cleanersAssigned: 2,
    gateLocation: "Phase 1 Covered Parking",
  },
];

// ----------------------------------------------------
// INITIAL MOCK VEHICLE & CUSTOMER STATE
// ----------------------------------------------------
export const INITIAL_CUSTOMER_VEHICLE: CustomerVehicle = {
  regNumber: "KA 04 MN 4821",
  make: "Hyundai",
  model: "Creta SX(O)",
  color: "Polar White",
  societyId: "sobha-city",
  societyName: "Sobha City, Thanisandra",
  parkingSlot: "Basement 2, Slot #104",
  qrToken: "CC-BLR-8492",
  planId: "care",
  billingCycleStart: "01 Oct 2026",
  billingCycleEnd: "31 Oct 2026",
  monthlyFee: 499,
  referralCode: "CARCALL-RAHUL4821",
  referralsCompleted: 2,
  referralsTarget: 3,
};

// ----------------------------------------------------
// INITIAL ENTITLEMENTS FOR HERO PLAN (CarCall Care = 6 visits)
// ----------------------------------------------------
export const INITIAL_SERVICE_ENTITLEMENTS: ServiceEntitlement[] = [
  {
    id: "ENT-2026-10-01",
    visitNumber: 1,
    serviceType: "Exterior + Interior",
    status: "Used",
    scheduledDate: "03 Oct 2026",
    scheduledSlot: "07:30 AM - 08:15 AM",
    recordId: "REC-8492-01",
  },
  {
    id: "ENT-2026-10-02",
    visitNumber: 2,
    serviceType: "Exterior Only",
    status: "Used",
    scheduledDate: "08 Oct 2026",
    scheduledSlot: "08:00 AM - 08:35 AM",
    recordId: "REC-8492-02",
  },
  {
    id: "ENT-2026-10-03",
    visitNumber: 3,
    serviceType: "Exterior + Interior",
    status: "Scheduled",
    scheduledDate: "13 Oct 2026",
    scheduledSlot: "07:30 AM - 08:15 AM",
  },
  {
    id: "ENT-2026-10-04",
    visitNumber: 4,
    serviceType: "Exterior Only",
    status: "Upcoming",
    scheduledDate: "18 Oct 2026",
    scheduledSlot: "08:00 AM - 08:35 AM",
  },
  {
    id: "ENT-2026-10-05",
    visitNumber: 5,
    serviceType: "Exterior + Interior",
    status: "Upcoming",
    scheduledDate: "23 Oct 2026",
    scheduledSlot: "07:30 AM - 08:15 AM",
  },
  {
    id: "ENT-2026-10-06",
    visitNumber: 6,
    serviceType: "Exterior Only",
    status: "Upcoming",
    scheduledDate: "28 Oct 2026",
    scheduledSlot: "08:00 AM - 08:35 AM",
  },
];

// ----------------------------------------------------
// INITIAL DIGITAL SERVICE RECORDS (Proof & History)
// ----------------------------------------------------
export const INITIAL_SERVICE_RECORDS: ServiceRecord[] = [
  {
    id: "REC-8492-02",
    visitId: "ENT-2026-10-02",
    vehicleId: "VEH-8492",
    vehicleReg: "KA 04 MN 4821",
    societyName: "Sobha City, Thanisandra",
    cleanerId: "CLN-01",
    cleanerName: "Raju M.",
    timestamp: "08 Oct 2026, 08:34 AM",
    serviceType: "Exterior Only",
    status: "Completed",
    checklistCompleted: [
      "Waterless exterior cleaning",
      "Windshield and exterior glass",
      "Rearview mirrors clean",
      "Wheels & brake dust wipe",
      "Tyres gloss dressing applied",
      "Final inspection completed",
    ],
    photos: [
      "/images/carcall-more-foam.jpg",
      "/images/carcall-hand-wash.jpg",
      "/images/carcall-dusty-to-detailed.jpg",
    ],
    notes: "Basement B2, slot 104. No dust left. Wheels wiped clean.",
    rating: 5,
    ratingFeedback: "Super glossy finish! Very punctual as always.",
  },
  {
    id: "REC-8492-01",
    visitId: "ENT-2026-10-01",
    vehicleId: "VEH-8492",
    vehicleReg: "KA 04 MN 4821",
    societyName: "Sobha City, Thanisandra",
    
    cleanerId: "CLN-01",
    cleanerName: "Raju M.",
    timestamp: "03 Oct 2026, 08:14 AM",
    serviceType: "Exterior + Interior",
    status: "Completed",
    checklistCompleted: [
      "Waterless exterior cleaning",
      "Windshield and exterior glass",
      "Rearview mirrors clean",
      "Wheels & brake dust wipe",
      "Tyres gloss dressing applied",
      "Vacuum floor and footwells",
      "Vacuum floor mats (7D mats)",
      "Basic seat vacuuming",
      "Dashboard anti-static wipe",
      "Centre-console & cup holders wipe",
      "Door panels & armrests wiped",
      "Interior glass haze removal",
      "Accessible crumb & AC vent dust removal",
    ],
    photos: [
      "/images/carcall-we-come-to-you.jpg",
      "/images/carcall-fresh-again.jpg",
      "/images/carcall-hand-wash.jpg",
    ],
    notes: "Full exterior waterless + thorough interior vacuum. Key handed over smoothly.",
    rating: 5,
    ratingFeedback: "Cabin smells crisp and clean. Floor mats were spotless.",
  },
];

// ----------------------------------------------------
// INITIAL SERVICE CREDITS
// ----------------------------------------------------
export const INITIAL_SERVICE_CREDITS: ServiceCredit[] = [
  {
    id: "CRD-2026-091",
    issuedDate: "27 Sep 2026",
    reason: "Heavy Monsoon Rain Hold (Covered parking occupied during slot)",
    status: "Available",
    expiryDate: "27 Nov 2026",
    equivalentService: "1× Flexible Exterior Waterless Maintenance Visit",
  },
];

// ----------------------------------------------------
// INITIAL CLEANER ROSTER & SHIFTS
// ----------------------------------------------------
export const INITIAL_CLEANER_SHIFTS: CleanerShift[] = [
  {
    id: "CLN-01",
    cleanerName: "Raju M.",
    phone: "+91 98450 12345",
    cluster: "Sobha City Cluster (Thanisandra)",
    status: "On Shift",
    assignedCars: 14,
    completedCars: 11,
    rating: 4.94,
    checkInTime: "06:15 AM",
  },
  {
    id: "CLN-02",
    cleanerName: "Suresh K.",
    phone: "+91 97420 54321",
    cluster: "Prestige Willow Green (Vidyaranyapura)",
    status: "On Shift",
    assignedCars: 12,
    completedCars: 9,
    rating: 4.88,
    checkInTime: "06:30 AM",
  },
  {
    id: "CLN-03",
    cleanerName: "Anand P.",
    phone: "+91 96110 98765",
    cluster: "Brigade Caladium & Godrej (Hebbal)",
    status: "On Shift",
    assignedCars: 15,
    completedCars: 13,
    rating: 4.96,
    checkInTime: "06:00 AM",
  },
];

// ----------------------------------------------------
// INITIAL QUALITY & COMPLAINT TICKETS (Supervisor Queue)
// ----------------------------------------------------
export const INITIAL_QUALITY_TICKETS: QualityTicket[] = [
  {
    id: "TCK-4081",
    vehicleReg: "KA 04 MN 4821",
    society: "Sobha City",
    issue: "Water spot left on rear right quarter glass after rain",
    category: "Water Spot",
    status: "Resolved",
    createdAt: "04 Oct 2026, 09:20 AM",
    cleanerName: "Raju M.",
    resolutionNote: "Cleaner revisited at 11:00 AM. Microfiber dry buff completed. Customer happy.",
    slaHoursRemaining: 0,
  },
  {
    id: "TCK-4092",
    vehicleReg: "KA 50 P 9912",
    society: "Prestige Willow Green",
    issue: "Driver door armrest still had light dust",
    category: "Missed Area",
    status: "In progress",
    createdAt: "08 Oct 2026, 08:45 AM",
    cleanerName: "Suresh K.",
    resolutionNote: "Supervisor spot-check scheduled for 01:30 PM shift.",
    slaHoursRemaining: 3,
  },
  {
    id: "TCK-4105",
    vehicleReg: "KA 04 AB 1109",
    society: "Brigade Caladium",
    issue: "Cleaner arrived 15 mins late due to society security entry delay",
    category: "Timing",
    status: "Open",
    createdAt: "08 Oct 2026, 09:10 AM",
    cleanerName: "Anand P.",
    slaHoursRemaining: 6,
  },
];

// ----------------------------------------------------
// INITIAL WHATSAPP NOTIFICATIONS (Simulated)
// ----------------------------------------------------
export const INITIAL_NOTIFICATIONS: WhatsAppNotification[] = [
  {
    id: "NOTIF-01",
    timestamp: "08 Oct 2026, 08:35 AM",
    type: "completed",
    title: "✨ Service Completed — KA 04 MN 4821",
    message: "Raju M. has completed your scheduled Waterless Exterior cleaning at Sobha City (B2-104). 3 inspection photos have been uploaded to your digital record.",
    linkText: "View Photos & Digital Record",
    linkAction: "mycar",
  },
  {
    id: "NOTIF-02",
    timestamp: "07 Oct 2026, 07:00 PM",
    type: "scheduled",
    title: "⏰ Upcoming Car Maintenance Tomorrow",
    message: "Your CarCall Care maintenance visit is scheduled for tomorrow at 08:00 AM. Assigned technician: Raju M. (+91 98450 12345).",
  },
  {
    id: "NOTIF-03",
    timestamp: "01 Oct 2026, 10:00 AM",
    type: "welcome",
    title: "🎉 Welcome to CarCall Care (₹499/mo)",
    message: "Your recurring subscription for Hyundai Creta (KA 04 MN 4821) is active! 6 monthly service entitlements generated for October 2026.",
    linkText: "Open My Car Portal",
    linkAction: "mycar",
  },
  {
    id: "NOTIF-04",
    timestamp: "27 Sep 2026, 09:15 AM",
    type: "credit",
    title: "🎟️ Service Credit Issued",
    message: "Due to heavy rain hold, 1 replacement service credit (#CRD-2026-091) has been credited to your vehicle balance. Valid for 60 days.",
  },
];

// ----------------------------------------------------
// TODAY'S ASSIGNED JOBS FOR CLEANER PWA
// ----------------------------------------------------
export interface CleanerJob {
  id: string;
  vehicleReg: string;
  vehicleModel: string;
  color: string;
  society: string;
  parkingSlot: string;
  timeSlot: string;
  serviceType: "Exterior + Interior" | "Exterior Only";
  status: "Scheduled" | "Started" | "Completed" | "Exception";
  qrToken: string;
  entitlementId: string;
  exceptionReason?: string;
  photosUploaded?: string[];
}

export const INITIAL_CLEANER_JOBS: CleanerJob[] = [
  {
    id: "JOB-101",
    vehicleReg: "KA 04 MN 4821",
    vehicleModel: "Hyundai Creta SX(O)",
    color: "Polar White",
    society: "Sobha City, Thanisandra",
    parkingSlot: "Basement 2, Slot #104",
    timeSlot: "07:30 AM",
    serviceType: "Exterior + Interior",
    status: "Completed",
    qrToken: "CC-BLR-8492",
    entitlementId: "ENT-2026-10-01",
    photosUploaded: [
      "/images/carcall-more-foam.jpg",
      "/images/carcall-hand-wash.jpg",
      "/images/carcall-dusty-to-detailed.jpg",
    ],
  },
  {
    id: "JOB-102",
    vehicleReg: "KA 04 JK 3201",
    vehicleModel: "Honda City V",
    color: "Meteoroid Grey",
    society: "Sobha City, Thanisandra",
    parkingSlot: "Basement 1, Slot #042",
    timeSlot: "08:15 AM",
    serviceType: "Exterior Only",
    status: "Scheduled",
    qrToken: "CC-BLR-1094",
    entitlementId: "ENT-2026-10-02",
  },
  {
    id: "JOB-103",
    vehicleReg: "KA 51 Z 8844",
    vehicleModel: "Tata Nexon EV",
    color: "Daytona Grey",
    society: "Sobha City, Thanisandra",
    parkingSlot: "Basement 2, Slot #210",
    timeSlot: "09:00 AM",
    serviceType: "Exterior + Interior",
    status: "Scheduled",
    qrToken: "CC-BLR-5531",
    entitlementId: "ENT-2026-10-03",
  },
  {
    id: "JOB-104",
    vehicleReg: "KA 03 MX 7720",
    vehicleModel: "Kia Seltos GTX+",
    color: "Gravity Grey",
    society: "Sobha City, Thanisandra",
    parkingSlot: "Podium 1, Slot #012",
    timeSlot: "09:45 AM",
    serviceType: "Exterior Only",
    status: "Scheduled",
    qrToken: "CC-BLR-6642",
    entitlementId: "ENT-2026-10-04",
  },
  {
    id: "JOB-105",
    vehicleReg: "KA 04 ND 9011",
    vehicleModel: "Maruti Brezza ZXi",
    color: "Pearl Arctic White",
    society: "Sobha City, Thanisandra",
    parkingSlot: "Basement 2, Slot #188",
    timeSlot: "10:30 AM",
    serviceType: "Exterior Only",
    status: "Exception",
    exceptionReason: "Vehicle Inaccessible (Car parked with cover locked)",
    qrToken: "CC-BLR-7719",
    entitlementId: "ENT-2026-10-05",
  },
];

// ----------------------------------------------------
// CONTACT & PLATFORM CONSTANTS
// ----------------------------------------------------
export const CARCALL_CONTACT = {
  businessName: "CarCall",
  productName: "CarCall Cleaning",
  version: "Version 2.0 | September 2026",
  tagline: "Recurring society-based vehicle maintenance & digital service history",
  phone: "+91 89700 07467",
  phoneRaw: "918970007467",
  email: "care@carcall.in",
  mainWebsite: "https://carcall.in",
  address: "GSS Complex, HMT Layout 4th Block, Vidyaranyapura, Bengaluru, Karnataka 560097",
  city: "Bengaluru, Karnataka (North Bengaluru Cluster)",
  hours: "Cleaner Operations: 6:00 AM - 12:00 PM | Support 24X7",
};

// ----------------------------------------------------
// FAQS (PRD v2.0 Aligned)
// ----------------------------------------------------
export interface FaqItem {
  question: string;
  answer: string;
  category: "Subscription & Cadence" | "Apartment Rules & Water" | "Service Standards" | "QR & Digital Records";
}

export const FAQS: FaqItem[] = [
  {
    question: "How does CarCall Cleaning differ from a conventional one-off car wash?",
    answer: "CarCall is a recurring society-based vehicle maintenance layer. Instead of waiting in lines or booking one-off washes, customers subscribe to predictable monthly maintenance visits (such as our Hero Plan 'CarCall Care' with 6 visits/month). Every visit creates a verified digital service history with photos.",
    category: "Subscription & Cadence",
  },
  {
    question: "Will our Apartment Association (RWA) or security allow this in our basement?",
    answer: "Yes, 100%! We exclusively use eco-friendly waterless polymer washes and low-moisture misting. There are zero puddles, zero messy floor runoff, and zero water wastage, fully compliant with strict apartment society water guidelines across North Bengaluru.",
    category: "Apartment Rules & Water",
  },
  {
    question: "What is included in the Hero Plan — CarCall Care at ₹499/month?",
    answer: "CarCall Care provides 6 visits per month: 6 exterior waterless cleans and 4 basic cabin vacuums. Cadence: Week 1 (Ext+Int), Week 2 (Ext), Week 3 (Ext+Int), Week 4 (Ext), plus 2 flexible exterior visits scheduled during the month. 2–3 digital inspection photos are uploaded every service.",
    category: "Service Standards",
  },
  {
    question: "Does the CarCall windshield QR sticker expose my personal phone number to strangers?",
    answer: "Never. The QR sticker contains only a unique opaque token. When a bystander or parking guard scans it, they can send you instant 1-tap alerts (such as blocked parking, window open, headlights left on) through CarCall's encrypted proxy without ever seeing your phone number.",
    category: "QR & Digital Records",
  },
  {
    question: "What happens if a visit is missed due to heavy rain or locked gates?",
    answer: "Our system follows a strict Missed Service & Credit Policy (PRD Section 10). We distinguish between operational holds and customer requests. Eligible missed visits receive an automatic replacement service credit valid for 60 days, clearly visible in your 'My Car' dashboard.",
    category: "Subscription & Cadence",
  },
  {
    question: "Can I book deep seat shampoo, polishing, or ceramic detailing?",
    answer: "Yes! To keep our routine subscription fast and scalable, deep restorative services are available as separately priced add-ons (Deep Interior ₹599, Seat Shampoo ₹499+, Exterior Polish ₹799+, Full Detailing ₹1,499+). You can order them directly in 'My Car'.",
    category: "Service Standards",
  },
  {
    question: "How does the Society Density benefit work?",
    answer: "Society density drives operational efficiency. When 20, 40, or 60 cars in your society (such as Sobha City or Prestige Willow Green) enroll in CarCall, all resident subscribers unlock collective community perks such as 20% recurring discounts or free extra visits.",
    category: "Subscription & Cadence",
  },
  {
    question: "How does the Referral Program work?",
    answer: "Every customer gets a personal referral link in 'My Car'. When 3 neighbours in your apartment subscribe and complete their first active cycle, you unlock 1 completely FREE month of recurring car care!",
    category: "Subscription & Cadence",
  },
];

// ----------------------------------------------------
// TESTIMONIALS (Society & Density Proof)
// ----------------------------------------------------
export interface Testimonial {
  name: string;
  car: string;
  location: string;
  society: string;
  comment: string;
  rating: number;
  packageUsed: string;
  avatarText: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Arvind Rao",
    car: "Hyundai Creta SX(O)",
    location: "Thanisandra, North Bengaluru",
    society: "Sobha City",
    comment: "Our society doesn't allow wet washing because of basement puddles. CarCall's waterless service keeps my Creta showroom clean with zero water on the floor. Love the digital photos after every visit!",
    rating: 5,
    packageUsed: "CarCall Care (₹499/mo)",
    avatarText: "AR",
  },
  {
    name: "Sunita Krishnamurthy",
    car: "Honda City ZX",
    location: "Vidyaranyapura, Bengaluru",
    society: "Prestige Willow Green",
    comment: "The 6-visit monthly cadence is perfect. Every Friday my cabin is vacuumed and exterior shines for the weekend. Raju, our assigned cleaner, is exceptionally polite and punctual.",
    rating: 5,
    packageUsed: "CarCall Care (₹499/mo)",
    avatarText: "SK",
  },
  {
    name: "Vikram Nambiar",
    car: "Tata Safari Dark Edition",
    location: "Hebbal, North Bengaluru",
    society: "Brigade Caladium",
    comment: "I used to pay local wash boys who scratched my paint with dirty rags. CarCall's scratch-free microfibers and persistent digital history preserve my car's resale value.",
    rating: 5,
    packageUsed: "CarCall Pro (₹599/mo)",
    avatarText: "VN",
  },
  {
    name: "Meera Deshpande",
    car: "Kia Seltos",
    location: "Hennur Road, Bengaluru",
    society: "Mantri Webcity",
    comment: "The windshield QR is genius! A guard alerted me that my parking lights were left on without knowing my phone number. Saved my battery. Total peace of mind.",
    rating: 5,
    packageUsed: "CarCall Plus (₹399/mo)",
    avatarText: "MD",
  },
];

// ----------------------------------------------------
// SERVICE LOCATIONS
// ----------------------------------------------------
export const SERVICE_LOCATIONS = [
  {
    title: "Apartment Complexes",
    subtitle: "Basements & Designated Bays",
    description: "Strict society water rules? Our specialized eco-wash uses zero water runoff, fully approved by RWA/society management in North Bengaluru.",
    highlight: "RWA & Security Approved",
  },
  {
    title: "Gated Villas & Communities",
    subtitle: "Driveways & Porches",
    description: "Scheduled recurring maintenance at your driveway without disturbing household routines or leaving messy puddles.",
    highlight: "Driveway Friendly",
  },
  {
    title: "Corporate Tech Parks",
    subtitle: "While You Work",
    description: "Get your car showroom-ready while attending work meetings. Touchless exterior washing while parked.",
    highlight: "Zero Productivity Loss",
  },
];

// ----------------------------------------------------
// TRUST PILLARS
// ----------------------------------------------------
export interface TrustPillar {
  title: string;
  description: string;
  icon: string;
}

export const TRUST_PILLARS: TrustPillar[] = [
  {
    title: "6 Visits / Month Cadence",
    description: "Predictable recurring vehicle maintenance with dedicated society routes.",
    icon: "Clock",
  },
  {
    title: "100% Background-Verified Pros",
    description: "Trained technicians with verified ID badges and strict paint handling protocols.",
    icon: "ShieldCheck",
  },
  {
    title: "Zero Water Puddles",
    description: "Polymer waterless wash compliant with all apartment basement RWA rules.",
    icon: "Leaf",
  },
  {
    title: "Digital Proof & QR Identity",
    description: "Every service logs 2–3 photos and checklist items into your vehicle's digital history.",
    icon: "Sparkles",
  },
];

// ----------------------------------------------------
// CAR CARE SCENARIOS (Real Situations)
// ----------------------------------------------------
export interface CarCareScenario {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  badgeColor: string;
  iconName: string;
  situation: string;
  howCarCallHelps: string;
  stat: string;
}

export const CAR_CARE_SCENARIOS: CarCareScenario[] = [
  {
    id: "daily-dust",
    title: "Daily Commute Dust & Soot",
    category: "Paint Protection",
    subtitle: "Safely lift abrasive city road grime without clear-coat scratches",
    badgeColor: "bg-red-50 text-red-600 border-red-200",
    iconName: "Sparkles",
    situation: "Heavy traffic exhaust soot and street dust accumulate on your paint daily.",
    howCarCallHelps:
      "Waterless high-lubricity polymers dissolve and lift abrasive dust particles before plush 600 GSM microfibers touch the car. Zero swirl marks, pure showroom shine.",
    stat: "Prevents 95% of fine clear-coat scratches vs dry cloth wiping",
  },
  {
    id: "basement-dust",
    title: "Apartment Basement Dust",
    category: "Basement Care",
    subtitle: "RWA-compliant low-water wash directly in your parking bay",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    iconName: "Building2",
    situation: "Basement construction dust and concrete powder settle on your parked car overnight.",
    howCarCallHelps:
      "Our self-sufficient mobile team brings waterless formulas, creating zero floor puddles and keeping apartment management happy.",
    stat: "100% RWA water-ban compliant with zero messy runoff",
  },
  {
    id: "monsoon-mud",
    title: "Monsoon Mud & Rain Spots",
    category: "Seasonal Care",
    subtitle: "Deep wheel arch rinse & hydrophobic rain repellent treatment",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    iconName: "Droplets",
    situation: "Muddy wheel arches, road tar splashes, and mineral-heavy rain spots after monsoons.",
    howCarCallHelps:
      "Streak-free glass treatment beads rainwater away for crystal-clear night driving and tyre dressing protects sidewalls.",
    stat: "Restores windshield clarity and repels road splatter",
  },
  {
    id: "pet-kids",
    title: "Kids Spills & Pet Hair",
    category: "Interior Hygiene",
    subtitle: "Turbine extraction vacuuming & anti-static console wipe",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconName: "ShieldCheck",
    situation: "Biscuit crumbs, juice stains, muddy pet paws, and lingering cabin odours.",
    howCarCallHelps:
      "High-suction turbine vacuuming digs deep into fabric crevices, floor mats, and boot carpeting, followed by console wipes.",
    stat: "Eliminates 99% of dust mites, crumbs, and trapped allergens",
  },
  {
    id: "society-rag",
    title: "The 'Daily Cloth' Swirl Problem",
    category: "Damage Prevention",
    subtitle: "Stop local cleaners from destroying your clear-coat with dirty water",
    badgeColor: "bg-slate-50 text-slate-800 border-slate-200",
    iconName: "ShieldAlert",
    situation: "Local apartment wash boys wipe 20 cars with a single gritty bucket and dry cloth.",
    howCarCallHelps:
      "We replace destructive daily scratching with scheduled high-lubricity waterless cleans. Your original paint stays swirl-free for years.",
    stat: "Preserves vehicle resale value by keeping clear-coat scratch-free",
  },
];

// ----------------------------------------------------
// BACKWARD-COMPATIBLE VEHICLE SEGMENTS & PACKAGES
// ----------------------------------------------------
export interface VehicleSegment {
  id: string;
  name: string;
  tagline: string;
  examples: string;
  priceMultiplier: number;
  iconName: string;
}

export const VEHICLE_SEGMENTS: VehicleSegment[] = [
  {
    id: "hatchback",
    name: "Hatchback",
    tagline: "Compact & City Cars",
    examples: "Swift, i20, Baleno, Tiago, Polo",
    priceMultiplier: 1.0,
    iconName: "Car",
  },
  {
    id: "sedan",
    name: "Sedan",
    tagline: "Executive & Mid-Size",
    examples: "Honda City, Verna, Ciaz, Slavia, Virtus",
    priceMultiplier: 1.15,
    iconName: "CarFront",
  },
  {
    id: "csuv",
    name: "Compact SUV",
    tagline: "Urban Crossovers",
    examples: "Creta, Seltos, Brezza, Nexon, Sonet",
    priceMultiplier: 1.25,
    iconName: "CarTaxiFront",
  },
  {
    id: "suv_luxury",
    name: "Full SUV / Luxury",
    tagline: "Full-Size & Premium",
    examples: "Fortuner, XUV700, Safari, BMW, Audi, Mercedes",
    priceMultiplier: 1.45,
    iconName: "Shield",
  },
];

export interface WashPackage {
  id: string;
  title: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  basePrice: number;
  originalPrice: number;
  duration: string;
  features: string[];
  recommendedFor: string;
}

export const WASH_PACKAGES: WashPackage[] = [
  {
    id: "basic_wash",
    title: "Basic Monthly Clean",
    tagline: "4× Exterior + 2× Interior visits/mo",
    badge: "Entry",
    basePrice: 299,
    originalPrice: 499,
    duration: "30 mins / visit",
    recommendedFor: "Occasional drivers",
    features: [
      "4× Waterless exterior cleaning visits",
      "2× Basic cabin vacuuming visits",
      "Windshield, mirrors & tyre dressing",
      "2–3 Digital inspection photos per service",
      "Apartment basement RWA water-ban compliant",
    ],
  },
  {
    id: "care_hero",
    title: "CarCall Care ⭐",
    tagline: "6× Exterior + 4× Interior visits/mo",
    badge: "Hero Plan",
    isPopular: true,
    basePrice: 499,
    originalPrice: 799,
    duration: "35–45 mins / visit",
    recommendedFor: "Regular city drivers & families",
    features: [
      "6× Waterless exterior maintenance visits/mo",
      "4× Basic interior vacuum & console wipes",
      "High-resolution digital photo proof on completion",
      "Automated WhatsApp completion reports",
      "Missed service credit protection policy",
      "Persistent digital vehicle service history",
    ],
  },
  {
    id: "premium_care",
    title: "CarCall Premium",
    tagline: "8× Exterior + 8× Interior visits/mo",
    badge: "Maximum Care",
    basePrice: 699,
    originalPrice: 999,
    duration: "45 mins / visit",
    recommendedFor: "Luxury cars & daily highway commuters",
    features: [
      "8× Waterless exterior cleaning visits",
      "8× Basic cabin vacuuming visits (Every visit)",
      "Dedicated senior cleaner assignment",
      "Complete interior sanitization & dust extraction",
      "VIP supervisor quality audits every 2 weeks",
    ],
  },
];

export const CARCALL_QR_ADDON = {
  id: "carcall_qr_bundle",
  title: "CarCall Dual Windshield QR Sticker Pack",
  subtitle: "2 Tamper-Proof Stickers (Front + Rear Windshield)",
  originalPrice: 499,
  addonPrice: 299,
  savings: 200,
  features: [
    "Instant WhatsApp & Phone alerts for parking or towing blocks without exposing your phone number",
    "Emergency accident alert connects bystanders to your family in 1 tap",
    "Pasted inside windshield glass — 100% vandal and scratch proof",
    "Zero monthly charges, lifelong protection via CarCall dashboard",
  ],
};

