"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Event } from "@/lib/types";
import { getEventById, getRelatedEvents } from "@/lib/mock-data";
import { formatDate, formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EventGrid } from "@/components/events/EventGrid";
import { Calendar, ChevronLeftIcon, Clock, MapPin, Share2 } from "lucide-react";
import { useTicketModal } from "@/hooks/use-ticket-modal";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const { openModal } = useTicketModal();
  const [event, setEvent] = useState<Event | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (typeof params.id !== "string") {
          router.push("/404");
          return;
        }

        const foundEvent = getEventById(params.id);

        if (!foundEvent) {
          router.push("/404");
          return;
        }

        setEvent(foundEvent);
        setRelatedEvents(getRelatedEvents(foundEvent.category, foundEvent.id));
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-80 w-full rounded-lg" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <div className="pt-4">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Event not found</h1>
        <p className="text-muted-foreground mb-8">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push("/")}>Back to Events</Button>
      </div>
    );
  }

  return (
    <div>
      {/* Event header */}
      <div className="bg-muted py-12">
        <div className="container">
          <Button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-2"
          >
            <ChevronLeftIcon />
            Back
          </Button>
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{formatTime(event.time)}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event details */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2">
            <div className="relative aspect-video mb-6 overflow-hidden rounded-lg">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                priority
              />
            </div>

            <h2 className="text-xl font-semibold mb-4">About This Event</h2>
            <p className="text-muted-foreground mb-6 whitespace-pre-line leading-relaxed">
              {event.description}
            </p>

            <div className="flex items-center justify-between py-4 border-t border-b">
              <div>
                <span className="block text-sm text-muted-foreground">
                  Price
                </span>
                <span className="font-semibold text-lg">{event.price}</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button onClick={() => openModal(event)}>Get Tickets</Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-card rounded-lg border p-6 sticky top-32">
              <h3 className="font-semibold mb-4">Event Information</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">
                    Date & Time
                  </h4>
                  <p>
                    {formatDate(event.date)} at {formatTime(event.time)}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">
                    Location
                  </h4>
                  <p>{event.venue}</p>
                  <p className="text-sm">{event.address}</p>
                </div>

                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">
                    Category
                  </h4>
                  <p>{event.category}</p>
                </div>

                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">Price</h4>
                  <p>{event.price}</p>
                </div>

                <Button
                  className="w-full mt-2"
                  onClick={() => openModal(event)}
                >
                  Get Tickets
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <div className="bg-muted py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <EventGrid events={relatedEvents} columns={3} />
          </div>
        </div>
      )}
    </div>
  );
}
