export type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  linkedIn: string;
  photo: string;
};

export type MemberForm = {
  name: string;
  email: string;
  linkedIn: string;
  role: string;
};

export interface MemberProps {
  team: Member[];
}