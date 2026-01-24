export type Participant = {
  id: string;
  name: string;
  surname: string;
  email: string;
  eventId: string;
  joinedAt: string;
  event: {
    id: string;
    title: string;
  };
};