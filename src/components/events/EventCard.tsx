"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Event } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/lib/utils";
import { useTicketModal } from "@/hooks/use-ticket-modal";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export function EventCard({ event, featured = false }: EventCardProps) {
  const { openModal } = useTicketModal();
  
  const handleGetTickets = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openModal(event);
  };
  
  return (
    <Link 
      href={`/events/${event.id}`}
      className="group block h-full transition-all duration-300"
    >
      <div 
        className={`relative h-full overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg ${
          featured ? "flex flex-col md:flex-row" : "flex flex-col"
        }`}
      >
        <div 
          className={`relative ${
            featured 
              ? "h-56 w-full md:h-auto md:w-2/5 lg:w-2/5" 
              : "h-48 w-full"
          }`}
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="secondary" className="font-medium">
              {event.category}
            </Badge>
          </div>
        </div>
        
        <div 
          className={`flex flex-col ${
            featured 
              ? "flex-1 p-6" 
              : "flex-1 p-4"
          }`}
        >
          <h3 
            className={`font-semibold text-card-foreground group-hover:text-primary transition-colors ${
              featured ? "text-xl mb-3" : "text-lg mb-2"
            }`}
          >
            {event.title}
          </h3>
          
          <div className="mb-3 text-sm text-muted-foreground">
            <div className="flex items-center mb-1">
              <Calendar className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center mb-1">
              <Clock className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
              <span>{formatTime(event.time)}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
              <span>{event.venue}</span>
            </div>
          </div>
          
          {featured && (
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {event.description}
            </p>
          )}
          
          <div className="mt-auto flex items-center justify-between">
            <span className="font-semibold">{event.price}</span>
            <Button 
              size={featured ? "default" : "sm"}
              onClick={handleGetTickets}
            >
              Get Tickets
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}