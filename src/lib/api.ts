// All dummy data and API calls in one file

export interface User {
  id: string;
  display_name: string;
  email: string;
  avatar_url: string;
  bio: string;
}

export interface Club {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover_url: string;
  privacy: 'public' | 'private';
  owner_id: string;
  member_count: number;
  unread_count?: number;
  last_message?: string;
  last_message_time?: string;
}

export interface Message {
  id: string;
  club_id: string;
  sender: User;
  type: 'text' | 'image' | 'poll' | 'event' | 'form';
  content: string;
  content_json?: any;
  created_at: string;
  isPinned?: boolean;
}

export interface Poll {
  id: string;
  club_id: string;
  creator: User;
  question: string;
  options: { id: string; text: string; votes: number }[];
  settings: { multiple_choice: boolean; anonymous: boolean };
  total_votes: number;
  created_at: string;
}

export interface Event {
  id: string;
  club_id: string;
  creator: User;
  title: string;
  description: string;
  starts_at: string;
  ends_at: string;
  location: string;
  attendees: { going: number; maybe: number; not_going: number };
  status: 'active' | 'expired';
  created_at: string;
}

export interface Form {
  id: string;
  club_id: string;
  creator: User;
  title: string;
  description: string;
  questions: FormQuestion[];
  response_count: number;
  created_at: string;
}

export interface FormQuestion {
  id: string;
  type: 'short_text' | 'long_text' | 'multiple_choice' | 'checkbox' | 'rating';
  question: string;
  options?: string[];
  required: boolean;
}

// Dummy current user
export const currentUser: User = {
  id: 'user-1',
  display_name: 'Alex Rivera',
  email: 'alex@example.com',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  bio: 'Community enthusiast & event organizer',
};

// Dummy clubs data
export const dummyClubs: Club[] = [
  {
    id: 'club-1',
    name: 'Tech Innovators',
    slug: 'tech-innovators',
    description: 'A community for developers and tech enthusiasts',
    cover_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    privacy: 'public',
    owner_id: 'user-2',
    member_count: 248,
    unread_count: 5,
    last_message: 'Hey everyone! Check out the new AI tools...',
    last_message_time: '2m ago',
  },
  {
    id: 'club-2',
    name: 'Design Masters',
    slug: 'design-masters',
    description: 'Where creativity meets excellence',
    cover_url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
    privacy: 'public',
    owner_id: 'user-3',
    member_count: 182,
    unread_count: 12,
    last_message: 'New Figma plugin released!',
    last_message_time: '15m ago',
  },
  {
    id: 'club-3',
    name: 'Startup Founders',
    slug: 'startup-founders',
    description: 'Building the future, one startup at a time',
    cover_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    privacy: 'private',
    owner_id: 'user-4',
    member_count: 94,
    unread_count: 0,
    last_message: 'Funding strategy discussion tomorrow',
    last_message_time: '1h ago',
  },
  {
    id: 'club-4',
    name: 'Fitness Warriors',
    slug: 'fitness-warriors',
    description: 'Get fit together, stay motivated',
    cover_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    privacy: 'public',
    owner_id: 'user-5',
    member_count: 326,
    last_message: 'Morning run at 6am!',
    last_message_time: '3h ago',
  },
];

// Dummy messages
export const dummyMessages: Message[] = [
  {
    id: 'msg-1',
    club_id: 'club-1',
    sender: {
      id: 'user-2',
      display_name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: '',
    },
    type: 'text',
    content: 'Hey everyone! Just discovered this amazing new AI tool for code review. Has anyone tried GitHub Copilot X yet?',
    created_at: '2024-01-15T10:30:00Z',
    isPinned: true,
  },
  {
    id: 'msg-2',
    club_id: 'club-1',
    sender: currentUser,
    type: 'text',
    content: 'Yeah, I\'ve been using it for a week now. The suggestions are incredible!',
    created_at: '2024-01-15T10:32:00Z',
  },
  {
    id: 'msg-3',
    club_id: 'club-1',
    sender: {
      id: 'user-6',
      display_name: 'Marcus Johnson',
      email: 'marcus@example.com',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      bio: '',
    },
    type: 'poll',
    content: 'What\'s your preferred programming language?',
    content_json: {
      poll_id: 'poll-1',
    },
    created_at: '2024-01-15T11:00:00Z',
  },
];

// Dummy polls
export const dummyPolls: Poll[] = [
  {
    id: 'poll-1',
    club_id: 'club-1',
    creator: {
      id: 'user-6',
      display_name: 'Marcus Johnson',
      email: 'marcus@example.com',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      bio: '',
    },
    question: 'What\'s your preferred programming language?',
    options: [
      { id: 'opt-1', text: 'TypeScript', votes: 42 },
      { id: 'opt-2', text: 'Python', votes: 38 },
      { id: 'opt-3', text: 'Rust', votes: 15 },
      { id: 'opt-4', text: 'Go', votes: 22 },
    ],
    settings: { multiple_choice: false, anonymous: false },
    total_votes: 117,
    created_at: '2024-01-15T11:00:00Z',
  },
];

// Dummy events
export const dummyEvents: Event[] = [
  {
    id: 'event-1',
    club_id: 'club-1',
    creator: {
      id: 'user-2',
      display_name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: '',
    },
    title: 'Tech Meetup: AI & Machine Learning',
    description: 'Join us for an exciting discussion about the latest trends in AI and ML. Guest speakers from top tech companies!',
    starts_at: '2024-01-20T18:00:00Z',
    ends_at: '2024-01-20T21:00:00Z',
    location: 'Innovation Hub, Downtown',
    attendees: { going: 45, maybe: 12, not_going: 3 },
    status: 'active',
    created_at: '2024-01-10T09:00:00Z',
  },
  {
    id: 'event-2',
    club_id: 'club-2',
    creator: {
      id: 'user-3',
      display_name: 'Emma Taylor',
      email: 'emma@example.com',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      bio: '',
    },
    title: 'Design Sprint Workshop',
    description: 'Learn the Google Design Sprint methodology in this hands-on workshop.',
    starts_at: '2024-01-22T10:00:00Z',
    ends_at: '2024-01-22T16:00:00Z',
    location: 'Creative Space, WeWork',
    attendees: { going: 28, maybe: 8, not_going: 2 },
    status: 'active',
    created_at: '2024-01-12T14:00:00Z',
  },
  {
    id: 'event-3',
    club_id: 'club-1',
    creator: {
      id: 'user-2',
      display_name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: '',
    },
    title: 'Hackathon 2024',
    description: '24-hour hackathon to build innovative solutions',
    starts_at: '2024-01-05T08:00:00Z',
    ends_at: '2024-01-06T08:00:00Z',
    location: 'Tech Campus',
    attendees: { going: 120, maybe: 15, not_going: 8 },
    status: 'expired',
    created_at: '2024-01-01T10:00:00Z',
  },
];

// Dummy forms
export const dummyForms: Form[] = [
  {
    id: 'form-1',
    club_id: 'club-1',
    creator: currentUser,
    title: 'Event Feedback Survey',
    description: 'Help us improve future events',
    questions: [
      {
        id: 'q-1',
        type: 'rating',
        question: 'How would you rate the event overall?',
        required: true,
      },
      {
        id: 'q-2',
        type: 'long_text',
        question: 'What did you enjoy most?',
        required: false,
      },
      {
        id: 'q-3',
        type: 'multiple_choice',
        question: 'Would you attend similar events?',
        options: ['Definitely', 'Probably', 'Not sure', 'No'],
        required: true,
      },
    ],
    response_count: 42,
    created_at: '2024-01-15T12:00:00Z',
  },
];

// API functions (all return dummy data)
export const api = {
  // Auth
  login: async (email: string, password: string) => {
    return { success: true, user: currentUser };
  },
  
  signup: async (email: string, password: string, display_name: string) => {
    return { success: true, user: { ...currentUser, email, display_name } };
  },

  // Clubs
  getClubs: async () => {
    return dummyClubs;
  },

  searchClubs: async (query: string, filters?: { topic?: string; privacy?: string }) => {
    return dummyClubs.filter(club => 
      club.name.toLowerCase().includes(query.toLowerCase()) ||
      club.description.toLowerCase().includes(query.toLowerCase())
    );
  },

  getClub: async (clubId: string) => {
    return dummyClubs.find(c => c.id === clubId);
  },

  joinClub: async (clubId: string) => {
    return { success: true };
  },

  // Messages
  getMessages: async (clubId: string) => {
    return dummyMessages.filter(m => m.club_id === clubId);
  },

  sendMessage: async (clubId: string, content: string, type: Message['type'] = 'text') => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      club_id: clubId,
      sender: currentUser,
      type,
      content,
      created_at: new Date().toISOString(),
    };
    return newMessage;
  },

  // Polls
  getPoll: async (pollId: string) => {
    return dummyPolls.find(p => p.id === pollId);
  },

  votePoll: async (pollId: string, optionId: string) => {
    return { success: true };
  },

  createPoll: async (clubId: string, question: string, options: string[]) => {
    return { success: true, poll_id: `poll-${Date.now()}` };
  },

  // Events
  getEvents: async (filter: 'active' | 'all' | 'expired' = 'all') => {
    if (filter === 'all') return dummyEvents;
    return dummyEvents.filter(e => e.status === filter);
  },

  getEvent: async (eventId: string) => {
    return dummyEvents.find(e => e.id === eventId);
  },

  rsvpEvent: async (eventId: string, response: 'going' | 'maybe' | 'not_going') => {
    return { success: true };
  },

  createEvent: async (clubId: string, eventData: Partial<Event>) => {
    return { success: true, event_id: `event-${Date.now()}` };
  },

  // Forms
  getForm: async (formId: string) => {
    return dummyForms.find(f => f.id === formId);
  },

  createForm: async (clubId: string, formData: Partial<Form>) => {
    return { success: true, form_id: `form-${Date.now()}` };
  },

  submitFormResponse: async (formId: string, answers: any) => {
    return { success: true };
  },
};
