import React from "react";
import { Ticket, Event } from "../types";
import { formatDisplayDate, formatTime, getStatusText } from "../utils/helpers";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Ticket as TicketIcon,
  Info,
} from "lucide-react";

interface TicketStatusResultProps {
  ticket: Ticket;
  event: Event;
}

const TicketStatusResult: React.FC<TicketStatusResultProps> = ({
  ticket,
  event,
}) => {
  const statusInfo = getStatusText(ticket.status);

  const paymentLink = `https://pay.rnrsociallab.com/?amount=${
    event.price * ticket.quantity
  }&ticketId=${ticket.tId}&phone=${ticket.mpesaPhone}`;

  return (
    <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden animate-fadeIn">
      <div className="bg-gradient-to-r from-secondary to-secondary-dark p-6 border-b border-border">
        <h3 className="font-extrabold text-3xl text-white mb-2 tracking-wide">
          {event.title}
        </h3>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-secondary-foreground">
          <div className="flex items-center">
            <Calendar size={18} className="mr-2 text-primary-light" />
            <span>{formatDisplayDate(event.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={18} className="mr-2 text-primary-light" />
            <span>
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-border pb-4">
          <div className="space-y-1 mb-4 sm:mb-0">
            <div className="text-sm text-muted-foreground">Ticket ID</div>
            <div className="font-mono text-lg font-semibold text-foreground">
              {ticket.id}
            </div>
          </div>
          <div
            className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${statusInfo.colorClass}`}
          >
            {statusInfo.text}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
          <div className="flex items-start gap-3">
            <User size={20} className="text-primary-dark mt-1" />
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="text-foreground font-medium">{ticket.email}</div>
            </div>
          </div>

          {ticket.mpesaPhone && (
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-primary-dark mt-1" />
              <div>
                <div className="text-sm text-muted-foreground">
                  M-Pesa Phone
                </div>
                <div className="text-foreground font-medium">
                  {ticket.mpesaPhone}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <TicketIcon size={20} className="text-primary-dark mt-1" />
            <div>
              <div className="text-sm text-muted-foreground">Quantity</div>
              <div className="text-foreground font-medium">
                {ticket.quantity} {ticket.quantity === 1 ? "ticket" : "tickets"}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <div className="text-sm text-muted-foreground">Total Amount</div>
              <div className="font-bold text-2xl text-green-700">
                KES {(event.price * ticket.quantity).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {ticket.status === "pending" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm flex items-start gap-3 shadow-inner">
            <Info size={20} className="text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-yellow-700 mb-2 text-base">
                Payment Required!
              </p>
              <p className="text-yellow-600 mb-3">
                Please complete your payment via M-Pesa to confirm your
                reservation.
              </p>
              {/* <div className="space-y-1 mb-4">
                <p className="text-yellow-600">
                  M-Pesa Pay Bill:{" "}
                  <span className="font-mono font-bold text-yellow-800">
                    123456
                  </span>
                </p>
                <p className="text-yellow-600">
                  Account Number:{" "}
                  <span className="font-mono font-bold text-yellow-800">
                    {ticket.id}
                  </span>
                </p>
              </div> */}
              <a
                href={paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Pay Now Via M-Pesa
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketStatusResult;
