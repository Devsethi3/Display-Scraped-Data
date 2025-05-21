import { Event } from "./types";

export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Sydney Symphony Orchestra: Beethoven's Fifth",
    description:
      "Experience the power of Beethoven's Fifth Symphony at the Sydney Opera House, performed by the world-renowned Sydney Symphony Orchestra. This iconic piece begins with perhaps the most famous four notes in classical music, setting the stage for a journey through struggle and triumph.",
    date: "2025-05-15",
    time: "19:30",
    venue: "Sydney Opera House",
    address: "Bennelong Point, Sydney NSW 2000",
    category: "Music",
    image: "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg",
    price: "$85 - $150",
    ticketUrl: "https://www.sydneysymphony.com",
    featured: true,
  },
  {
    id: "2",
    title: "Vivid Sydney Light Festival",
    description:
      "Vivid Sydney transforms the city into a wonderland of light art and projection. Celebrate creativity and innovation as the city's landmarks become canvases for spectacular light installations and projections.",
    date: "2025-05-20",
    time: "18:00",
    venue: "Sydney Harbour",
    address: "Circular Quay, Sydney NSW 2000",
    category: "Arts",
    image: "https://images.pexels.com/photos/2383013/pexels-photo-2383013.jpeg",
    price: "Free",
    ticketUrl: "https://www.vividsydney.com",
    featured: true,
  },
  {
    id: "3",
    title: "Sydney Harbour Bridge Climb",
    description:
      "Climb the iconic Sydney Harbour Bridge for breathtaking panoramic views of the city and harbor. This guided adventure takes you along the outer arch of the bridge to its summit, 134 meters above sea level.",
    date: "2025-05-18",
    time: "10:00",
    venue: "Sydney Harbour Bridge",
    address: "3 Cumberland St, The Rocks NSW 2000",
    category: "Sports",
    image: "https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg",
    price: "$198 - $388",
    ticketUrl: "https://www.bridgeclimb.com",
  },
  {
    id: "4",
    title: "Sydney Food Festival",
    description:
      "A celebration of Sydney's diverse culinary scene with food stalls, cooking demonstrations, and tastings from the city's best restaurants and chefs.",
    date: "2025-05-25",
    time: "11:00",
    venue: "Royal Botanic Garden",
    address: "Mrs Macquaries Rd, Sydney NSW 2000",
    category: "Food",
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
    price: "$25",
    ticketUrl: "https://www.sydneyfoodfestival.com.au",
  },
  {
    id: "5",
    title: "Tim Minchin Live",
    description:
      "Award-winning comedian, actor, and musician Tim Minchin brings his unique blend of musical comedy and satire to the State Theatre for an unforgettable night of entertainment.",
    date: "2025-06-02",
    time: "20:00",
    venue: "State Theatre",
    address: "49 Market St, Sydney NSW 2000",
    category: "Comedy",
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",
    price: "$70 - $120",
    ticketUrl: "https://www.ticketmaster.com.au",
  },
  {
    id: "6",
    title: "Sydney Craft Beer Festival",
    description:
      "Sample over 300 unique craft beers from 50+ independent breweries. Meet the brewers, enjoy live music, and indulge in gourmet food pairings.",
    date: "2025-06-10",
    time: "12:00",
    venue: "Australian Technology Park",
    address: "Locomotive St, Eveleigh NSW 2015",
    category: "Nightlife",
    image: "https://images.pexels.com/photos/1269043/pexels-photo-1269043.jpeg",
    price: "$45",
    ticketUrl: "https://www.sydneycraftbeerfestival.com.au",
  },
  {
    id: "7",
    title: "Disney on Ice: Dream Big",
    description:
      "Join Mickey, Minnie, and your favorite Disney characters for a magical ice skating spectacular that brings beloved stories to life through world-class skating and special effects.",
    date: "2025-07-15",
    time: "14:00",
    venue: "Qudos Bank Arena",
    address: "Olympic Blvd, Sydney Olympic Park NSW 2127",
    category: "Family",
    image: "https://images.pexels.com/photos/209424/pexels-photo-209424.jpeg",
    price: "$55 - $150",
    ticketUrl: "https://www.ticketek.com.au",
  },
  {
    id: "8",
    title: "Sydney Contemporary Art Fair",
    description:
      "Australia's premier international art fair presenting works from over 90 galleries from around the world. Discover new artists, attend talks, and witness live performances.",
    date: "2025-06-20",
    time: "10:00",
    venue: "Carriageworks",
    address: "245 Wilson St, Eveleigh NSW 2015",
    category: "Arts",
    image: "https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg",
    price: "$35",
    ticketUrl: "https://sydneycontemporary.com.au",
  },
];

export const getEventById = (id: string): Event | undefined => {
  return MOCK_EVENTS.find((event) => event.id === id);
};

export const getRelatedEvents = (
  category: string,
  currentEventId: string
): Event[] => {
  return MOCK_EVENTS.filter(
    (event) => event.category === category && event.id !== currentEventId
  ).slice(0, 3);
};
