"use client";

import { useState, createContext, useContext } from "react";
import { Event } from "@/lib/types";

interface TicketModalContextProps {
  event: Event | null;
  isOpen: boolean;
  openModal: (event: Event) => void;
  closeModal: () => void;
}

const TicketModalContext = createContext<TicketModalContextProps>({
  event: null,
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function TicketModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (event: Event) => {
    setEvent(event);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setEvent(null);
    }, 300); // Clear event after animation
  };

  return (
    <TicketModalContext.Provider
      value={{ event, isOpen, openModal, closeModal }}
    >
      {children}
    </TicketModalContext.Provider>
  );
}

export const useTicketModal = () => useContext(TicketModalContext);
