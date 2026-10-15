"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  SUBSCRIPTION_PLANS,
  SubscriptionPlan,
  CustomerVehicle,
  INITIAL_CUSTOMER_VEHICLE,
  ServiceEntitlement,
  INITIAL_SERVICE_ENTITLEMENTS,
  ServiceRecord,
  INITIAL_SERVICE_RECORDS,
  ServiceCredit,
  INITIAL_SERVICE_CREDITS,
  CleanerShift,
  INITIAL_CLEANER_SHIFTS,
  QualityTicket,
  INITIAL_QUALITY_TICKETS,
  WhatsAppNotification,
  INITIAL_NOTIFICATIONS,
  CleanerJob,
  INITIAL_CLEANER_JOBS,
  Society,
  SOCIETIES_NORTH_BLR,
  ADD_ON_SERVICES,
  AddOnService,
} from "@/data/carwashData";

export type PortalView = "landing" | "mycar" | "cleaner" | "supervisor" | "qr-scan";

interface CarCallContextType {
  // Current active view / portal
  currentView: PortalView;
  setCurrentView: (view: PortalView) => void;

  // Subscribe / Onboarding Modal
  isSubscribeModalOpen: boolean;
  setIsSubscribeModalOpen: (open: boolean) => void;
  selectedPlanForModal: SubscriptionPlan | null;
  openSubscribeModal: (plan?: SubscriptionPlan) => void;

  // Notifications Modal
  isNotificationsModalOpen: boolean;
  setIsNotificationsModalOpen: (open: boolean) => void;
  notifications: WhatsAppNotification[];
  addNotification: (notif: Omit<WhatsAppNotification, "id" | "timestamp">) => void;

  // Customer Vehicle & Plan
  customerVehicle: CustomerVehicle;
  updateCustomerVehicle: (updates: Partial<CustomerVehicle>) => void;
  subscriptionPlans: SubscriptionPlan[];
  updatePlanPrice: (planId: string, newPrice: number) => void;

  // Entitlements & Upcoming Visits
  entitlements: ServiceEntitlement[];
  rescheduleEntitlement: (entitlementId: string, newDate: string, newSlot: string) => void;
  skipEntitlement: (entitlementId: string) => void;

  // Service Records & Digital History
  serviceRecords: ServiceRecord[];
  addServiceRecord: (record: Omit<ServiceRecord, "id" | "timestamp">) => void;
  rateServiceRecord: (recordId: string, rating: number, feedback?: string) => void;

  // Service Credits
  serviceCredits: ServiceCredit[];
  issueServiceCredit: (reason: string, equivalentService?: string) => void;

  // Cleaner Jobs & Shifts
  cleanerJobs: CleanerJob[];
  cleanerShifts: CleanerShift[];
  activeCleanerShift: CleanerShift;
  toggleCleanerShiftStatus: () => void;
  startCleanerJob: (jobId: string) => void;
  completeCleanerJob: (
    jobId: string,
    checklist: string[],
    photos: string[],
    notes?: string
  ) => void;
  markCleanerException: (jobId: string, reason: string) => void;

  // Quality Control & Complaints
  qualityTickets: QualityTicket[];
  createQualityTicket: (
    issue: string,
    category: QualityTicket["category"],
    vehicleReg?: string,
    cleanerName?: string
  ) => void;
  updateTicketStatus: (ticketId: string, newStatus: QualityTicket["status"], note?: string) => void;

  // Societies & Milestones
  societies: Society[];
  incrementSocietyCar: (societyId: string) => void;

  // Add-on Orders
  addOnServices: AddOnService[];
  bookAddOn: (addonId: string, preferredDate: string) => void;

  // Success Toast message
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CarCallContext = createContext<CarCallContextType | undefined>(undefined);

export function CarCallProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<PortalView>("landing");
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<SubscriptionPlan | null>(null);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Entities state
  const [customerVehicle, setCustomerVehicle] = useState<CustomerVehicle>(INITIAL_CUSTOMER_VEHICLE);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>(SUBSCRIPTION_PLANS);
  const [entitlements, setEntitlements] = useState<ServiceEntitlement[]>(INITIAL_SERVICE_ENTITLEMENTS);
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>(INITIAL_SERVICE_RECORDS);
  const [serviceCredits, setServiceCredits] = useState<ServiceCredit[]>(INITIAL_SERVICE_CREDITS);
  const [cleanerJobs, setCleanerJobs] = useState<CleanerJob[]>(INITIAL_CLEANER_JOBS);
  const [cleanerShifts, setCleanerShifts] = useState<CleanerShift[]>(INITIAL_CLEANER_SHIFTS);
  const [qualityTickets, setQualityTickets] = useState<QualityTicket[]>(INITIAL_QUALITY_TICKETS);
  const [notifications, setNotifications] = useState<WhatsAppNotification[]>(INITIAL_NOTIFICATIONS);
  const [societies, setSocieties] = useState<Society[]>(SOCIETIES_NORTH_BLR);
  const [addOnServices] = useState<AddOnService[]>(ADD_ON_SERVICES);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const openSubscribeModal = (plan?: SubscriptionPlan) => {
    setSelectedPlanForModal(plan || subscriptionPlans.find((p) => p.id === "care") || subscriptionPlans[2]);
    setIsSubscribeModalOpen(true);
  };

  const addNotification = (notif: Omit<WhatsAppNotification, "id" | "timestamp">) => {
    const newNotif: WhatsAppNotification = {
      ...notif,
      id: `NOTIF-${Date.now()}`,
      timestamp: "Just now",
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updateCustomerVehicle = (updates: Partial<CustomerVehicle>) => {
    setCustomerVehicle((prev) => {
      const updated = { ...prev, ...updates };
      return updated;
    });
    showToast("Vehicle & Subscription profile updated!");
  };

  const updatePlanPrice = (planId: string, newPrice: number) => {
    setSubscriptionPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, pricePerMonth: newPrice } : p))
    );
    showToast(`Plan price updated to ₹${newPrice}/mo`);
  };

  const rescheduleEntitlement = (entitlementId: string, newDate: string, newSlot: string) => {
    setEntitlements((prev) =>
      prev.map((ent) =>
        ent.id === entitlementId
          ? { ...ent, scheduledDate: newDate, scheduledSlot: newSlot, status: "Scheduled" }
          : ent
      )
    );
    showToast(`Visit rescheduled to ${newDate} (${newSlot})`);
    addNotification({
      type: "scheduled",
      title: "🗓️ Visit Rescheduled",
      message: `Your maintenance visit has been moved to ${newDate} (${newSlot}). Technician will arrive on time.`,
    });
  };

  const skipEntitlement = (entitlementId: string) => {
    setEntitlements((prev) =>
      prev.map((ent) => (ent.id === entitlementId ? { ...ent, status: "Missed" } : ent))
    );
    // Under customer-requested skip, record policy
    showToast("Visit marked as skipped. Entitlement logged.");
    addNotification({
      type: "exception",
      title: "ℹ️ Customer Skip Recorded",
      message: "You have requested to skip this week's maintenance visit. Your next scheduled visit will proceed as normal.",
    });
  };

  const addServiceRecord = (record: Omit<ServiceRecord, "id" | "timestamp">) => {
    const newRecord: ServiceRecord = {
      ...record,
      id: `REC-${Date.now().toString().slice(-4)}`,
      timestamp: "Today, just now",
    };
    setServiceRecords((prev) => [newRecord, ...prev]);
  };

  const rateServiceRecord = (recordId: string, rating: number, feedback?: string) => {
    setServiceRecords((prev) =>
      prev.map((rec) =>
        rec.id === recordId ? { ...rec, rating, ratingFeedback: feedback } : rec
      )
    );
    showToast(`Thank you for rating ${rating} ⭐!`);
    addNotification({
      type: "completed",
      title: "⭐ Rating Received",
      message: `You rated your service ${rating}/5 stars. Thank you for helping us maintain high quality standards!`,
    });
  };

  const issueServiceCredit = (reason: string, equivalentService?: string) => {
    const newCredit: ServiceCredit = {
      id: `CRD-${Date.now().toString().slice(-4)}`,
      issuedDate: "Today",
      reason,
      status: "Available",
      expiryDate: "In 60 days",
      equivalentService: equivalentService || "1× Flexible Exterior Waterless Maintenance Visit",
    };
    setServiceCredits((prev) => [newCredit, ...prev]);
    showToast("1 Service Replacement Credit issued!");
    addNotification({
      type: "credit",
      title: "🎟️ Replacement Service Credit Issued",
      message: `A service replacement credit has been added to your balance: "${reason}". Valid for 60 days.`,
    });
  };

  // Cleaner Operations
  const activeCleanerShift = cleanerShifts[0];

  const toggleCleanerShiftStatus = () => {
    setCleanerShifts((prev) =>
      prev.map((s, idx) =>
        idx === 0
          ? { ...s, status: s.status === "On Shift" ? "Break" : "On Shift" }
          : s
      )
    );
    showToast(
      activeCleanerShift.status === "On Shift"
        ? "Shift status set to On Break"
        : "Shift status set to On Shift"
    );
  };

  const startCleanerJob = (jobId: string) => {
    setCleanerJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: "Started" } : j))
    );
    showToast("Service started. Checklist active.");
  };

  const completeCleanerJob = (
    jobId: string,
    checklist: string[],
    photos: string[],
    notes?: string
  ) => {
    const job = cleanerJobs.find((j) => j.id === jobId);
    if (!job) return;

    // 1. Update Job status
    setCleanerJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              status: "Completed",
              photosUploaded: photos.length > 0 ? photos : ["/images/carcall-more-foam.jpg", "/images/carcall-hand-wash.jpg"],
            }
          : j
      )
    );

    // 2. Increment completed count for cleaner
    setCleanerShifts((prev) =>
      prev.map((s, idx) => (idx === 0 ? { ...s, completedCars: s.completedCars + 1 } : s))
    );

    // 3. Mark matching entitlement as Used if matching customer vehicle
    if (job.vehicleReg === customerVehicle.regNumber) {
      setEntitlements((prev) => {
        const firstUpcoming = prev.find((e) => e.status === "Upcoming" || e.status === "Scheduled");
        if (!firstUpcoming) return prev;
        return prev.map((e) =>
          e.id === firstUpcoming.id ? { ...e, status: "Used", recordId: `REC-${Date.now()}` } : e
        );
      });

      // 4. Create Service Record
      const newRec: ServiceRecord = {
        id: `REC-${Date.now().toString().slice(-4)}`,
        visitId: job.entitlementId,
        vehicleId: "VEH-8492",
        vehicleReg: job.vehicleReg,
        societyName: job.society,
        cleanerId: activeCleanerShift.id,
        cleanerName: activeCleanerShift.cleanerName,
        timestamp: "Today, just now",
        serviceType: job.serviceType,
        status: "Completed",
        checklistCompleted: checklist,
        photos:
          photos.length > 0
            ? photos
            : ["/images/carcall-more-foam.jpg", "/images/carcall-hand-wash.jpg", "/images/carcall-dusty-to-detailed.jpg"],
        notes: notes || "Waterless wash completed. Wheels dressed. Inspection clean.",
      };
      setServiceRecords((prev) => [newRec, ...prev]);

      // 5. Trigger WhatsApp notification
      addNotification({
        type: "completed",
        title: `✨ Service Completed — ${job.vehicleReg}`,
        message: `${activeCleanerShift.cleanerName} completed your ${job.serviceType} at ${job.parkingSlot}. ${checklist.length} checklist items verified. Photos attached.`,
        linkText: "View Photos in My Car",
        linkAction: "mycar",
      });
    }

    showToast(`Job ${job.vehicleReg} completed successfully!`);
  };

  const markCleanerException = (jobId: string, reason: string) => {
    const job = cleanerJobs.find((j) => j.id === jobId);
    if (!job) return;

    setCleanerJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, status: "Exception", exceptionReason: reason } : j
      )
    );

    // If it's our customer vehicle, trigger exception notice and issue replacement credit
    if (job.vehicleReg === customerVehicle.regNumber) {
      addNotification({
        type: "exception",
        title: `⚠️ Exception Logged: ${job.vehicleReg}`,
        message: `Technician reported: "${reason}". A reschedule option or credit has been authorized.`,
      });

      if (reason.toLowerCase().includes("inaccessible") || reason.toLowerCase().includes("unavailable")) {
        issueServiceCredit(`Operational Hold / ${reason}`);
      }
    }

    showToast(`Exception recorded: ${reason}`);
  };

  // Quality & Complaints
  const createQualityTicket = (
    issue: string,
    category: QualityTicket["category"],
    vehicleReg: string = customerVehicle.regNumber,
    cleanerName: string = "Raju M."
  ) => {
    const newTicket: QualityTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicleReg,
      society: customerVehicle.societyName,
      issue,
      category,
      status: "Open",
      createdAt: "Today, just now",
      cleanerName,
      slaHoursRemaining: 8,
    };
    setQualityTickets((prev) => [newTicket, ...prev]);
    showToast("Complaint ticket created. Supervisor assigned (8hr SLA).");
    addNotification({
      type: "complaint",
      title: `🎫 Quality Ticket Created (#${newTicket.id})`,
      message: `Your report regarding "${category}" has been logged. Supervisor will review and resolve within our SLA.`,
    });
  };

  const updateTicketStatus = (
    ticketId: string,
    newStatus: QualityTicket["status"],
    note?: string
  ) => {
    setQualityTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: newStatus,
              resolutionNote: note || t.resolutionNote,
              slaHoursRemaining: newStatus === "Resolved" || newStatus === "Closed" ? 0 : t.slaHoursRemaining,
            }
          : t
      )
    );
    showToast(`Ticket #${ticketId} status updated to ${newStatus}`);
    if (newStatus === "Resolved") {
      addNotification({
        type: "complaint",
        title: `✅ Ticket #${ticketId} Resolved`,
        message: note || "Supervisor has verified the resolution. Thank you for your feedback!",
      });
    }
  };

  const incrementSocietyCar = (societyId: string) => {
    setSocieties((prev) =>
      prev.map((s) => {
        if (s.id === societyId) {
          const newActive = s.activeCars + 1;
          const isUnlocked = newActive >= s.milestoneTarget;
          return {
            ...s,
            activeCars: newActive,
            isUnlocked,
          };
        }
        return s;
      })
    );
    showToast("Society active cars incremented!");
  };

  const bookAddOn = (addonId: string, preferredDate: string) => {
    const addon = addOnServices.find((a) => a.id === addonId);
    if (!addon) return;

    showToast(`Add-on "${addon.name}" scheduled for ${preferredDate}!`);
    addNotification({
      type: "scheduled",
      title: `🛠️ Add-On Booked: ${addon.name}`,
      message: `Scheduled for ${preferredDate} alongside your routine maintenance visit. Price: ${addon.indicativePrice}.`,
    });
  };

  return (
    <CarCallContext.Provider
      value={{
        currentView,
        setCurrentView,
        isSubscribeModalOpen,
        setIsSubscribeModalOpen,
        selectedPlanForModal,
        openSubscribeModal,
        isNotificationsModalOpen,
        setIsNotificationsModalOpen,
        notifications,
        addNotification,
        customerVehicle,
        updateCustomerVehicle,
        subscriptionPlans,
        updatePlanPrice,
        entitlements,
        rescheduleEntitlement,
        skipEntitlement,
        serviceRecords,
        addServiceRecord,
        rateServiceRecord,
        serviceCredits,
        issueServiceCredit,
        cleanerJobs,
        cleanerShifts,
        activeCleanerShift,
        toggleCleanerShiftStatus,
        startCleanerJob,
        completeCleanerJob,
        markCleanerException,
        qualityTickets,
        createQualityTicket,
        updateTicketStatus,
        societies,
        incrementSocietyCar,
        addOnServices,
        bookAddOn,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CarCallContext.Provider>
  );
}

export function useCarCall() {
  const context = useContext(CarCallContext);
  if (!context) {
    throw new Error("useCarCall must be used within a CarCallProvider");
  }
  return context;
}
