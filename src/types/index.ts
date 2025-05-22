export type EventStatus = "upcoming" | "ongoing" | "past" | "cancelled";
export type TicketStatus = "pending" | "confirmed" | "checked-in" | "cancelled";

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  date: string; // ISO string format
  startTime: string; // 24hr format - "14:00"
  endTime: string; // 24hr format - "18:00"
  location: string;
  imageUrl: string;
  price: number;
  byob: boolean;
  maxCapacity: number;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  email: string;
  mpesaPhone?: string;
  quantity: number;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  tId: string;
}

export interface User {
  id: string;
  username: string;
  password: string; // this would be hashed in a real application
  name: string;
  role: "admin" | "staff";
}
