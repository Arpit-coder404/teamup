export type ProjectCategory =
  | 'Hackathon'
  | 'Research'
  | 'Startup'
  | 'Course Project'
  | 'Open Source'
  | 'Design'
  | 'Competition'
  | 'Society';

export type CollaborationMode = 'In-person' | 'Remote' | 'Hybrid';

export type CommitmentLevel = 'Low (<10 hrs/wk)' | 'Medium (10-20 hrs/wk)' | 'High (20+ hrs/wk)';

export type ProjectStatus = 'Recruiting' | 'In Progress' | 'Completed' | 'Closed';

export type ApplicationStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Withdrawn';

export interface PortfolioLinks {
  github?: string;
  linkedin?: string;
  portfolio?: string;
  twitter?: string;
  dribbble?: string;
  behance?: string;
}

export interface Achievement {
  title: string;
  event: string;
  year: string;
  badge?: string;
}

export interface PastProject {
  title: string;
  role: string;
  desc: string;
  link?: string;
  tags?: string[];
}

export interface User {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar: string;
  headline: string;
  year: string;
  department: string;
  campus: string;
  bio: string;
  story?: string;
  skills: string[];
  interests: string[];
  portfolioLinks: PortfolioLinks;
  availability: string;
  collaborationPreferences: string[];
  achievements: Achievement[];
  pastProjects: PastProject[];
  createdAt: string;
  isAvailableForHire?: boolean;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  description: string;
  goals: string[];
  requiredSkills: string[];
  teamSize: number;
  openPositions: number;
  duration: string;
  commitment: CommitmentLevel;
  collaborationMode: CollaborationMode;
  applicationDeadline: string;
  ownerId: string;
  memberIds: string[];
  status: ProjectStatus;
  coverImage: string;
  tags: string[];
  featured?: boolean;
  createdAt: string;
}

export interface Application {
  id: string;
  projectId: string;
  applicantId: string;
  message: string;
  skillsContribution: string;
  availability: string;
  portfolioLink?: string;
  status: ApplicationStatus;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

export interface SavedProfile {
  userId: string;
  savedUserId: string;
  savedAt: string;
}

export interface SavedProject {
  userId: string;
  projectId: string;
  savedAt: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  skills: string[];
  year: string;
  department: string;
  availability: string;
  collaborationMode?: string;
  commitment?: string;
}

