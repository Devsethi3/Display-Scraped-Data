import { EventCard } from "@/components/events/EventCard";
import { Event } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface EventGridProps {
  events: Event[];
  isLoading?: boolean;
  featured?: boolean;
  columns?: number;
}

export function EventGrid({
  events,
  isLoading = false,
  featured = false,
  columns = 3,
}: EventGridProps) {
  // Default columns
  let gridCols = `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`;

  // Customize columns if featured grid
  if (featured) {
    gridCols = "grid-cols-1";
  }

  if (isLoading) {
    return (
      <div className={`grid ${gridCols} gap-6`}>
        {Array.from({ length: featured ? 1 : 6 }).map((_, i) => (
          <div
            key={i}
            className={`${featured ? "h-80" : "h-96"} animate-pulse`}
          >
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No events found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} featured={featured} />
      ))}
    </div>
  );
}
