"use client";

import { useState, useEffect } from "react";
import { Event, EventCategory, SortOption } from "@/lib/types";
import { MOCK_EVENTS } from "@/lib/mock-data";
import {
  filterEventsByCategory,
  filterEventsBySearch,
  sortEvents,
} from "@/lib/utils";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<EventCategory>("All");
  const [sortBy, setSortBy] = useState<SortOption>("upcoming");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch events
  useEffect(() => {
    // Simulate API call with timeout
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // In a real application, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEvents(MOCK_EVENTS);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Apply filters whenever events, category, sortBy, or searchTerm changes
  useEffect(() => {
    let result = [...events];

    // Apply category filter
    result = filterEventsByCategory(result, category);

    // Apply search filter
    result = filterEventsBySearch(result, searchTerm);

    // Apply sorting
    result = sortEvents(result, sortBy);

    setFilteredEvents(result);
  }, [events, category, sortBy, searchTerm]);

  return {
    events: filteredEvents,
    isLoading,
    category,
    setCategory,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    featuredEvents: events.filter((event) => event.featured),
  };
}
