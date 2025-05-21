export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    category: string;
    image: string;
    price: string;
    ticketUrl: string;
    featured?: boolean;
  }
  
  export interface EmailSubmission {
    email: string;
    eventId: string;
    optIn: boolean;
  }
  
  export type EventCategory = 
    | 'All'
    | 'Music'
    | 'Arts'
    | 'Sports'
    | 'Food'
    | 'Nightlife'
    | 'Family'
    | 'Comedy';
  
  export type SortOption = 
    | 'newest'
    | 'upcoming'
    | 'popular';