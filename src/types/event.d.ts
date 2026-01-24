export type Event = {
  id: string;
  code: string;
  title: string;
  description: string;
  date: string;
  isActive: boolean;
  image?: string;
  location?: string;
  participants?: Participant[];
};

export type EventForm = {
  title: string;
  description?: string;
  date: string;
  isActive?: boolean;
  image?: string;
  location?: string;
};