export type ApplicationStatus = 'PENDING' | 'REVIEWING' | 'SHORTLISTED' | 'ACCEPTED' | 'REJECTED';

export type InquiryStatus = 'NEW' | 'REVIEWING' | 'CONTACTED' | 'IN_DISCUSSION' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';

export type ProjectStage = 'DISCOVERY' | 'DECISION' | 'TEAM' | 'BUILD' | 'VALIDATE' | 'SHIP' | 'MAINTAIN' | 'LEARN';

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'PAUSED' | 'SHIPPED' | 'ARCHIVED';

export interface StudentApplicationData {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  collegeOrOrganization: string;
  currentStatus: 'Student' | 'Professional' | 'Other' | string;
  courseOrRole?: string | null;
  yearOrSemester?: string | null;
  status?: ApplicationStatus;
  adminNotes?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ClientInquiryData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  companyOrOrganization: string;
  role: string;
  problem: string;
  desiredOutcome: string;
  budget: string;
  currency: 'INR' | 'USD' | string;
  timeline: string;
  additionalInformation?: string | null;
  status?: InquiryStatus;
  adminNotes?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
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
