export type Order = {
  id: string;
  title: string;
  description: string;
  contentType: string;
  wordCount: number;
  clientName: string;
  clientEmail: string;
  status: "Pending" | "In Progress" | "Completed";
  deadline: string;
  createdAt: string;
};

export type Client = { 
  id: string; 
  firstName: string; 
  lastName: string; 
  company: string; 
  email: string; 
  createdAt: string 
};

export type Invoice = { 
  id: string; 
  invoiceNumber: string; 
  clientName: string; 
  amount: string; 
  status: "Draft" | "Pending" | "Paid" | "Overdue"; 
  date: string 
};

export type Timer = { 
  id: string; 
  task: string; 
  project: string; 
  time: string; 
  seconds: number; 
  status: "Running" | "Paused" | "Completed"; 
  createdAt: string 
};
