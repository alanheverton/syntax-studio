export const dashboardStats = {
  totalOrders: 142,
  pending: 12,
  inProgress: 28,
};

export const recentOrders = [
  { id: "ord_1", title: "Blog Post - AI Trends", client: "Wavespace", status: "Pending", deadline: "Oct 24, 2026" },
  { id: "ord_2", title: "Landing Page Copy", client: "Syntax Studio", status: "In Progress", deadline: "Oct 26, 2026" },
  { id: "ord_3", title: "Q3 Email Newsletter", client: "TechFlow", status: "Completed", deadline: "Oct 20, 2026" },
  { id: "ord_4", title: "Product Descriptions", client: "Nova Retail", status: "In Progress", deadline: "Oct 29, 2026" },
  { id: "ord_5", title: "About Us Page Rewrite", client: "GreenLeaf", status: "Pending", deadline: "Nov 02, 2026" },
];

export const clientSettingsOptions = [
  { id: "payment_reminders", title: "Send Payment Reminders", description: "At Customizable Intervals", value: false, icon: "Timer" },
  { id: "late_fees", title: "Charge Late Fees", description: "Percentage or Flat-Rate Fees", value: false, icon: "CreditCard" },
  { id: "currency", title: "Currency & Language", description: "USD, English", value: false, icon: "Globe" },
  { id: "invoices", title: "Invoice Attachments", description: "Attach PDF Copy To Emails", value: false, icon: "FileText" },
];
