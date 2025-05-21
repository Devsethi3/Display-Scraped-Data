"use client";

import { useEffect, useState } from "react";
import { EventHero } from "@/components/events/EventHero";
import { EventGrid } from "@/components/events/EventGrid";
import { EventFilters } from "@/components/events/EventFilters";
import { CategoryTabs } from "@/components/events/CategoryTabs";
import { useEvents } from "@/hooks/use-events";
import { Skeleton } from "@/components/ui/skeleton";
import { useTicketModal } from "@/hooks/use-ticket-modal";

export default function Home() {
  const {
    events,
    isLoading,
    category,
    setCategory,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    featuredEvents,
  } = useEvents();

  return (
    <div>
      {/* Hero Section */}
      <EventHero
        title="Discover Sydney's Best Events"
        subtitle="Find and book tickets to the most exciting concerts, festivals, exhibitions, and more happening around Sydney."
        ctaText="Explore Events"
        ctaAction={() => window.scrollTo({ top: 600, behavior: "smooth" })}
      />

      {/* Featured Event Section */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
          {isLoading ? (
            <Skeleton className="h-80 w-full rounded-lg" />
          ) : (
            <EventGrid events={featuredEvents.slice(0, 1)} featured={true} />
          )}
        </div>
      </section>

      {/* Category Tabs */}
      <CategoryTabs activeCategory={category} setCategory={setCategory} />

      {/* Filters */}
      <EventFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* All Events */}
      <section className="py-8">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">
            {category === "All" ? "All Events" : `${category} Events`}
          </h2>
          <EventGrid events={events} isLoading={isLoading} columns={3} />
        </div>
      </section>
    </div>
  );
}
