
import { Event, Ticket, User } from '../types';
import { format, addDays, subDays, parseISO } from 'date-fns';

// Helper function to create dates relative to today
const today = new Date();
const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

// Sample events
export const events: Event[] = [
  {
    id: 'ev-001',
    title: 'F1 Grand Prix Watch Party',
    description: `Join us for an exciting Formula 1 Grand Prix watch party at RNR Social Club! Experience the thrill of high-speed racing on our big screens with fellow F1 enthusiasts.

    What to expect:
    - Multiple large screens showing every angle of the race
    - Commentary and race predictions
    - F1 trivia during breaks with prizes
    - Great atmosphere with like-minded fans

    Remember, this is a BYOB (Bring Your Own Beverage) and BYOF (Bring Your Own Food) event. We'll provide the venue, the excitement, and the community - you bring your favorite drinks and snacks!

    Doors open 1 hour before race start. Limited capacity, so reserve your spot now!`,
    shortDescription: 'Experience the excitement of F1 racing on the big screen with fellow enthusiasts!',
    date: formatDate(addDays(today, 7)),
    startTime: '14:00',
    endTime: '18:00',
    location: 'RNR Social Club, Eldoret Town',
    imageUrl: '/images/f1-event.jpg',
    price: 500,
    maxCapacity: 50,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ev-002',
    title: 'Champions League Final Viewing',
    description: `It's the biggest night in European club football! Join us at RNR Social Club to watch the UEFA Champions League Final on the big screen.

    What to expect:
    - Pre-match analysis and discussion
    - Multiple large screens with HD quality
    - Half-time games and predictions
    - Post-match celebrations

    This is a BYOB (Bring Your Own Beverage) and BYOF (Bring Your Own Food) event. Feel free to bring your favorite drinks and snacks to enjoy during the match.

    Doors open 2 hours before kick-off. Don't miss this epic football night with fellow fans!`,
    shortDescription: 'Watch the biggest match in European football with passionate fans in a vibrant atmosphere!',
    date: formatDate(addDays(today, 14)),
    startTime: '19:45',
    endTime: '23:00',
    location: 'RNR Social Club, Eldoret Town',
    imageUrl: '/images/football-event.jpg',
    price: 700,
    maxCapacity: 80,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ev-003',
    title: 'NBA Finals Game Watch Party',
    description: `Basketball fans unite! Join us for Game 1 of the NBA Finals at RNR Social Club.

    What to expect:
    - Live screening on multiple large screens
    - Basketball trivia with prizes
    - Special basketball-themed event
    - Passionate basketball community

    This is a BYOB (Bring Your Own Beverage) and BYOF (Bring Your Own Food) event. Please bring your own refreshments to enjoy during the game.

    Come early to get the best seats. The excitement starts 30 minutes before tip-off!`,
    shortDescription: 'Join fellow basketball fans to watch the NBA Finals in an electric atmosphere!',
    date: formatDate(addDays(today, 10)),
    startTime: '03:00',
    endTime: '06:30',
    location: 'RNR Social Club, Eldoret Town',
    imageUrl: '/images/basketball-event.jpg',
    price: 500,
    maxCapacity: 40,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ev-004',
    title: 'Premier League Derby Day',
    description: `Experience the intensity of a Premier League derby match at RNR Social Club! Join us for this special screening with fellow football fans.

    What to expect:
    - Live match on multiple screens
    - Pre-match and half-time analysis
    - Football trivia competition
    - Post-match discussion

    This is a BYOB (Bring Your Own Beverage) and BYOF (Bring Your Own Food) event. Feel free to bring your favorite drinks and snacks to enjoy during the match.

    Doors open 1 hour before kick-off. Reserve your spot now for this exciting football event!`,
    shortDescription: 'Experience the intensity and drama of a Premier League derby with passionate fans!',
    date: formatDate(addDays(today, 3)),
    startTime: '17:30',
    endTime: '20:00',
    location: 'RNR Social Club, Eldoret Town',
    imageUrl: '/images/premier-league-event.jpg',
    price: 600,
    maxCapacity: 60,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ev-005',
    title: 'MotoGP Race Screening',
    description: `Feel the adrenaline as we screen the latest MotoGP race at RNR Social Club. Join other motorsport enthusiasts for this exciting event!

    What to expect:
    - Live race on our big screens
    - Pre-race analysis and predictions
    - Racing trivia with prizes
    - Post-race discussion

    This is a BYOB (Bring Your Own Beverage) and BYOF (Bring Your Own Food) event. Please bring your own refreshments to enjoy during the race.

    Doors open 1 hour before the race starts. Limited seats available, so book early!`,
    shortDescription: 'Experience the thrill of MotoGP racing with fellow motorsport fans!',
    date: formatDate(subDays(today, 7)),
    startTime: '13:00',
    endTime: '15:30',
    location: 'RNR Social Club, Eldoret Town',
    imageUrl: '/images/motogp-event.jpg',
    price: 500,
    maxCapacity: 35,
    status: 'past',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Sample tickets
export const tickets: Ticket[] = [
  {
    id: 'tkt-001',
    eventId: 'ev-001',
    email: 'john.doe@example.com',
    mpesaPhone: '254712345678',
    quantity: 2,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tkt-002',
    eventId: 'ev-001',
    email: 'jane.smith@example.com',
    mpesaPhone: '254723456789',
    quantity: 1,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tkt-003',
    eventId: 'ev-002',
    email: 'mike.johnson@example.com',
    mpesaPhone: '254734567890',
    quantity: 3,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tkt-004',
    eventId: 'ev-003',
    email: 'sarah.brown@example.com',
    quantity: 2,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tkt-005',
    eventId: 'ev-005',
    email: 'david.wilson@example.com',
    mpesaPhone: '254756789012',
    quantity: 4,
    status: 'checked-in',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Sample admin users
export const users: User[] = [
  {
    id: 'usr-001',
    username: 'admin',
    password: 'rnradmin2023', // This would be hashed in a real application
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: 'usr-002',
    username: 'staff',
    password: 'rnrstaff2023', // This would be hashed in a real application
    name: 'Staff User',
    role: 'staff',
  },
];
