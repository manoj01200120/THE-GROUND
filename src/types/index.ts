export type ApplicationStatus = 'PENDING' | 'REVIEWING' | 'SHORTLISTED' | 'ACCEPTED' | 'REJECTED';

export type InquiryStatus = 'NEW' | 'QUALIFIED' | 'PROPOSAL' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';

export type ProjectStage = 'DISCOVERY' | 'DECISION' | 'TEAM' | 'BUILD' | 'VALIDATE' | 'SHIP' | 'MAINTAIN' | 'LEARN';

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'PAUSED' | 'SHIPPED' | 'ARCHIVED';

export interface StudentApplicationData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  course: string;
  year: string;
  city: string;
  skills: string[];
  interests: string;
  experience: string;
  projects: string;
  learningGoals: string;
  availability: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
  resumeUrl?: string;
  status?: ApplicationStatus;
  notes?: string;
  createdAt?: string | Date;
}

export interface ClientInquiryData {
  id?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  role: string;
  problem: string;
  expectedOutcome: string;
  budget: string;
  timeline: string;
  additionalInfo?: string;
  status?: InquiryStatus;
  notes?: string;
  createdAt?: string | Date;
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  problem: string;
  owner: string;
  stage: ProjectStage;
  status: ProjectStatus;
  deadline?: string | Date | null;
  progress: number;
  client?: string | null;
  documents?: string | null;
  blockers?: string | null;
  outcome?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  members: ProjectMemberData[];
}

export interface ProjectMemberData {
  id?: string;
  projectId?: string;
  name: string;
  role: string;
  email: string;
  avatar?: string | null;
}

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: string;
}
