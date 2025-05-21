import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Event, SortOption } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString("en-AU", options);
}

export function formatTime(timeString: string): string {
  // Convert 24-hour format to 12-hour format
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minutes} ${period}`;
}

export function sortEvents(events: Event[], sortBy: SortOption): Event[] {
  const sortedEvents = [...events];

  switch (sortBy) {
    case "newest":
      return sortedEvents.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    case "upcoming":
      return sortedEvents.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    case "popular":
      // For now, just prioritize featured events
      return sortedEvents.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    default:
      return sortedEvents;
  }
}

export function filterEventsByCategory(
  events: Event[],
  category: string
): Event[] {
  if (category === "All") {
    return events;
  }

  return events.filter((event) => event.category === category);
}

export function filterEventsBySearch(
  events: Event[],
  searchTerm: string
): Event[] {
  const term = searchTerm.toLowerCase().trim();

  if (!term) {
    return events;
  }

  return events.filter(
    (event) =>
      event.title.toLowerCase().includes(term) ||
      event.description.toLowerCase().includes(term) ||
      event.venue.toLowerCase().includes(term) ||
      event.category.toLowerCase().includes(term)
  );
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
