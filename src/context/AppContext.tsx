import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Project,
  Application,
  Message,
  Conversation,
  ApplicationStatus,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PROJECTS,
  INITIAL_APPLICATIONS,
  INITIAL_MESSAGES,
  INITIAL_CONVERSATIONS,
} from '../data/seedData';

interface CompatibilityResult {
  score: number;
  reasons: string[];
}

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
}

interface AppContextType {
  currentUser: User;
  users: User[];
  projects: Project[];
  applications: Application[];
  messages: Message[];
  conversations: Conversation[];
  savedProfileIds: string[];
  savedProjectIds: string[];
  toasts: ToastMessage[];
  switchUser: (userId: string) => void;
  updateUserProfile: (updatedUser: Partial<User>) => void;
  createProject: (newProject: Omit<Project, 'id' | 'createdAt' | 'ownerId' | 'memberIds' | 'status'>) => Project;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  applyToProject: (data: {
    projectId: string;
    message: string;
    skillsContribution: string;
    availability: string;
    portfolioLink?: string;
  }) => boolean;
  hasApplied: (projectId: string, applicantId?: string) => boolean;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => void;
  toggleSaveProfile: (userId: string) => void;
  isProfileSaved: (userId: string) => boolean;
  toggleSaveProject: (projectId: string) => void;
  isProjectSaved: (projectId: string) => boolean;
  sendMessage: (receiverId: string, content: string) => Message;
  getConversationMessages: (otherUserId: string) => Message[];
  getUserConversations: () => {
    otherUser: User;
    lastMessage?: Message;
    unreadCount: number;
  }[];
  calculateCompatibility: (targetUser: User, baseUser?: User) => CompatibilityResult;
  showToast: (text: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER_ID: 'teamup_current_user_id',
  USERS: 'teamup_users_v1',
  PROJECTS: 'teamup_projects_v1',
  APPLICATIONS: 'teamup_applications_v1',
  MESSAGES: 'teamup_messages_v1',
  CONVERSATIONS: 'teamup_conversations_v1',
  SAVED_PROFILES: 'teamup_saved_profiles_v1',
  SAVED_PROJECTS: 'teamup_saved_projects_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Users
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_USERS;
  });

  // Current User
  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    return saved || 'u1';
  });

  const currentUser = users.find((u) => u.id === currentUserId) || users[0] || INITIAL_USERS[0];

  // Projects
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PROJECTS;
  });

  // Applications
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_APPLICATIONS;
  });

  // Messages
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_MESSAGES;
  });

  // Conversations
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CONVERSATIONS;
  });

  // Saved Profiles
  const [savedProfileIds, setSavedProfileIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_PROFILES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['u2', 'u3', 'u8'];
  });

  // Saved Projects
  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_PROJECTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['p2', 'p6'];
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_PROFILES, JSON.stringify(savedProfileIds));
  }, [savedProfileIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_PROJECTS, JSON.stringify(savedProjectIds));
  }, [savedProjectIds]);

  // Switch demo user
  const switchUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUserId(userId);
      showToast(`Switched active demo user to ${target.name}`, 'info');
    }
  };

  // Update current user profile
  const updateUserProfile = (updatedFields: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...updatedFields } : u))
    );
    showToast('Your profile has been updated!', 'success');
  };

  // Create Project
  const createProject = (
    newProjectData: Omit<Project, 'id' | 'createdAt' | 'ownerId' | 'memberIds' | 'status'>
  ): Project => {
    const newId = `p-${Date.now()}`;
    const project: Project = {
      ...newProjectData,
      id: newId,
      ownerId: currentUser.id,
      memberIds: [currentUser.id],
      status: 'Recruiting',
      createdAt: new Date().toISOString(),
    };

    setProjects((prev) => [project, ...prev]);
    showToast(`Project "${project.title}" created successfully!`, 'success');
    return project;
  };

  // Update Project
  const updateProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    showToast('Project updated successfully.', 'success');
  };

  // Delete Project
  const deleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    showToast('Project removed.', 'info');
  };

  // Apply to project
  const hasApplied = (projectId: string, applicantId: string = currentUser.id): boolean => {
    return applications.some(
      (app) => app.projectId === projectId && app.applicantId === applicantId
    );
  };

  const applyToProject = (data: {
    projectId: string;
    message: string;
    skillsContribution: string;
    availability: string;
    portfolioLink?: string;
  }): boolean => {
    if (hasApplied(data.projectId, currentUser.id)) {
      showToast('You have already applied to this project.', 'warning');
      return false;
    }

    const targetProject = projects.find((p) => p.id === data.projectId);
    if (targetProject?.ownerId === currentUser.id) {
      showToast('You cannot apply to your own project.', 'warning');
      return false;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      projectId: data.projectId,
      applicantId: currentUser.id,
      message: data.message,
      skillsContribution: data.skillsContribution,
      availability: data.availability,
      portfolioLink: data.portfolioLink,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    setApplications((prev) => [newApp, ...prev]);
    showToast('Application sent to project lead!', 'success');
    return true;
  };

  // Update application status (Accept / Reject)
  const updateApplicationStatus = (applicationId: string, status: ApplicationStatus) => {
    const targetApp = applications.find((a) => a.id === applicationId);
    if (!targetApp) return;

    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status } : a))
    );

    // If accepted, add applicant to project memberIds and reduce openPositions
    if (status === 'Accepted') {
      setProjects((prev) =>
        prev.map((proj) => {
          if (proj.id === targetApp.projectId) {
            const alreadyMember = proj.memberIds.includes(targetApp.applicantId);
            const newMembers = alreadyMember
              ? proj.memberIds
              : [...proj.memberIds, targetApp.applicantId];
            const newOpenPositions = Math.max(0, proj.openPositions - 1);
            return {
              ...proj,
              memberIds: newMembers,
              openPositions: newOpenPositions,
              status: newOpenPositions === 0 ? 'In Progress' : proj.status,
            };
          }
          return proj;
        })
      );
      showToast('Applicant accepted and added to the project roster!', 'success');
    } else if (status === 'Rejected') {
      showToast('Application marked as rejected.', 'info');
    }
  };

  // Saved Profiles toggle
  const toggleSaveProfile = (targetUserId: string) => {
    setSavedProfileIds((prev) => {
      const isSaved = prev.includes(targetUserId);
      const next = isSaved ? prev.filter((id) => id !== targetUserId) : [...prev, targetUserId];
      showToast(isSaved ? 'Removed from saved profiles.' : 'Profile saved to your board!', 'info');
      return next;
    });
  };

  const isProfileSaved = (targetUserId: string): boolean => {
    return savedProfileIds.includes(targetUserId);
  };

  // Saved Projects toggle
  const toggleSaveProject = (targetProjectId: string) => {
    setSavedProjectIds((prev) => {
      const isSaved = prev.includes(targetProjectId);
      const next = isSaved ? prev.filter((id) => id !== targetProjectId) : [...prev, targetProjectId];
      showToast(isSaved ? 'Removed from saved projects.' : 'Project saved to your list!', 'info');
      return next;
    });
  };

  const isProjectSaved = (targetProjectId: string): boolean => {
    return savedProjectIds.includes(targetProjectId);
  };

  // Messaging
  const getConversationKey = (userA: string, userB: string) => {
    const sorted = [userA, userB].sort();
    return `conv-${sorted[0]}-${sorted[1]}`;
  };

  const sendMessage = (receiverId: string, content: string): Message => {
    const convId = getConversationKey(currentUser.id, receiverId);
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      conversationId: convId,
      senderId: currentUser.id,
      receiverId,
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);

    // Update conversation record
    setConversations((prev) => {
      const existing = prev.find((c) => c.id === convId);
      if (existing) {
        return prev.map((c) =>
          c.id === convId
            ? {
                ...c,
                lastMessage: content,
                lastMessageTime: newMsg.createdAt,
              }
            : c
        );
      }
      return [
        {
          id: convId,
          participantIds: [currentUser.id, receiverId],
          lastMessage: content,
          lastMessageTime: newMsg.createdAt,
          unreadCount: 0,
        },
        ...prev,
      ];
    });

    return newMsg;
  };

  const getConversationMessages = (otherUserId: string): Message[] => {
    const convId = getConversationKey(currentUser.id, otherUserId);
    return messages.filter((m) => m.conversationId === convId);
  };

  const getUserConversations = () => {
    // Find all users with whom the current user has exchanged messages
    const interlocutorsMap = new Map<string, { lastMessage?: Message; unreadCount: number }>();

    messages.forEach((m) => {
      if (m.senderId === currentUser.id || m.receiverId === currentUser.id) {
        const otherId = m.senderId === currentUser.id ? m.receiverId : m.senderId;
        const existing = interlocutorsMap.get(otherId);
        if (!existing || new Date(m.createdAt) > new Date(existing.lastMessage?.createdAt || 0)) {
          interlocutorsMap.set(otherId, {
            lastMessage: m,
            unreadCount: 0,
          });
        }
      }
    });

    // Also include anyone who has an explicit conversation even if messages were cleared
    conversations.forEach((c) => {
      if (c.participantIds.includes(currentUser.id)) {
        const otherId = c.participantIds.find((id) => id !== currentUser.id);
        if (otherId && !interlocutorsMap.has(otherId)) {
          interlocutorsMap.set(otherId, { unreadCount: 0 });
        }
      }
    });

    return Array.from(interlocutorsMap.entries())
      .map(([otherId, data]) => {
        const otherUser = users.find((u) => u.id === otherId);
        return otherUser ? { otherUser, ...data } : null;
      })
      .filter((item): item is { otherUser: User; lastMessage?: Message; unreadCount: number } => Boolean(item))
      .sort((a, b) => {
        const timeA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt).getTime() : 0;
        const timeB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt).getTime() : 0;
        return timeB - timeA;
      });
  };

  // Compatibility score algorithm
  const calculateCompatibility = (targetUser: User, baseUser: User = currentUser): CompatibilityResult => {
    if (targetUser.id === baseUser.id) {
      return { score: 100, reasons: ['Self compatibility'] };
    }

    let score = 40; // baseline campus proximity
    const reasons: string[] = [];

    // 1. Shared skills (up to 20 pts)
    const sharedSkills = targetUser.skills.filter((sk) =>
      baseUser.skills.some((bs) => bs.toLowerCase() === sk.toLowerCase())
    );
    if (sharedSkills.length > 0) {
      const pts = Math.min(20, sharedSkills.length * 8);
      score += pts;
      reasons.push(`Shared expertise in ${sharedSkills.slice(0, 2).join(' & ')}`);
    }

    // 2. Complementary skills (tech + design, or code + research) (up to 15 pts)
    const hasDesign = (u: User) =>
      u.skills.some((s) => ['Figma', 'UI Design', 'UI/UX Design', 'User Research'].includes(s));
    const hasCode = (u: User) =>
      u.skills.some((s) => ['React', 'TypeScript', 'Rust', 'Python', 'C++', 'Go'].includes(s));

    if ((hasDesign(baseUser) && hasCode(targetUser)) || (hasCode(baseUser) && hasDesign(targetUser))) {
      score += 15;
      reasons.push('Complementary skill combo: Designer + Developer pairing');
    }

    // 3. Shared interests (up to 15 pts)
    const sharedInterests = targetUser.interests.filter((it) =>
      baseUser.interests.some((bi) => bi.toLowerCase() === it.toLowerCase())
    );
    if (sharedInterests.length > 0) {
      score += Math.min(15, sharedInterests.length * 8);
      reasons.push(`Shared passions: ${sharedInterests.slice(0, 2).join(', ')}`);
    }

    // 4. Collaboration preferences match (up to 15 pts)
    const sharedCollab = targetUser.collaborationPreferences.filter((cp) =>
      baseUser.collaborationPreferences.includes(cp)
    );
    if (sharedCollab.length > 0) {
      score += Math.min(15, sharedCollab.length * 8);
      reasons.push(`Mutual collaboration interest in ${sharedCollab[0]}`);
    }

    // 5. Availability compatibility (5 pts)
    if (targetUser.availability === baseUser.availability) {
      score += 5;
      reasons.push(`Matching weekly commitment (${targetUser.availability})`);
    }

    const finalScore = Math.min(98, Math.max(52, score));
    return {
      score: finalScore,
      reasons: reasons.length > 0 ? reasons : ['Diverse disciplinary perspectives from different campus faculties'],
    };
  };

  // Reset demo data
  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
    localStorage.removeItem(STORAGE_KEYS.SAVED_PROFILES);
    localStorage.removeItem(STORAGE_KEYS.SAVED_PROJECTS);

    setUsers(INITIAL_USERS);
    setCurrentUserId('u1');
    setProjects(INITIAL_PROJECTS);
    setApplications(INITIAL_APPLICATIONS);
    setMessages(INITIAL_MESSAGES);
    setConversations(INITIAL_CONVERSATIONS);
    setSavedProfileIds(['u2', 'u3', 'u8']);
    setSavedProjectIds(['p2', 'p6']);

    showToast('Demo data successfully restored to initial state!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        projects,
        applications,
        messages,
        conversations,
        savedProfileIds,
        savedProjectIds,
        toasts,
        switchUser,
        updateUserProfile,
        createProject,
        updateProject,
        deleteProject,
        applyToProject,
        hasApplied,
        updateApplicationStatus,
        toggleSaveProfile,
        isProfileSaved,
        toggleSaveProject,
        isProjectSaved,
        sendMessage,
        getConversationMessages,
        getUserConversations,
        calculateCompatibility,
        showToast,
        removeToast,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

