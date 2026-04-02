export type Experience = {
  company: string;
  role: string;
  years: number;
};

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  isActive: boolean;
  skills: string[];
  experiences: Experience[];
}
