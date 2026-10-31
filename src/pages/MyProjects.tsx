import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Tape } from '../components/common/Tape';
import { Project, ProjectStatus } from '../types';
import {
  FolderGit2,
  Users,
  Clock,
  CheckCircle2,
  Bookmark,
  PlusCircle,
  FileText,
  Trash2,
  Edit2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const MyProjects: React.FC = () => {
  const {
    projects,
    currentUser,
    users,
    applications,
    savedProjectIds,
    updateProject,
    deleteProject,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'created' | 'joined' | 'saved' | 'applications'>('created');

  // Created Projects
  const createdProjects = projects.filter((p) => p.ownerId === currentUser.id);

  // Joined Projects
  const joinedProjects = projects.filter(
    (p) => p.memberIds.includes(currentUser.id) && p.ownerId !== currentUser.id
  );

  // Saved Projects
  const savedProjects = projects.filter((p) => savedProjectIds.includes(p.id));

  // My Applications
  const myApplications = applications.filter((app) => app.applicantId === currentUser.id);

  const handleStatusChange = (project: Project, newStatus: ProjectStatus) => {
    updateProject({ ...project, status: newStatus });
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="relative mb-8 pb-6 border-b border-paper-border">
        <div className="absolute top-0 right-8 hidden sm:block">
          <Tape variant="yellow" width="w-28" rotate="-rotate-2" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-handwritten text-xl text-cobalt font-bold">
              ★ Personal Hub
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-ink-primary tracking-tight">
              MY PROJECTS & WORKSPACE
            </h1>
            <p className="text-sm text-ink-secondary">
              Track projects you lead, squads you've joined, and monitor your submitted collaboration requests.
            </p>
          </div>

          <Link
            to="/create-project"
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-cobalt hover:bg-cobalt-hover text-white font-display font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#1D1D1B]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Project</span>
          </Link>
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="flex items-center space-x-2 mt-8 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('created')}
            className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider border transition-colors flex items-center space-x-2 ${
              activeTab === 'created'
                ? 'bg-cobalt text-white border-cobalt shadow-[2px_2px_0px_#1D1D1B]'
                : 'bg-[#FFFEFA] text-ink-primary border-paper-border hover:bg-paper-bg'
            }`}
          >
            <span>Created Projects</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-black/20 rounded-full">
              {createdProjects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('joined')}
            className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider border transition-colors flex items-center space-x-2 ${
              activeTab === 'joined'
                ? 'bg-cobalt text-white border-cobalt shadow-[2px_2px_0px_#1D1D1B]'
                : 'bg-[#FFFEFA] text-ink-primary border-paper-border hover:bg-paper-bg'
            }`}
          >
            <span>Joined Teams</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-black/20 rounded-full">
              {joinedProjects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider border transition-colors flex items-center space-x-2 ${
              activeTab === 'applications'
                ? 'bg-cobalt text-white border-cobalt shadow-[2px_2px_0px_#1D1D1B]'
                : 'bg-[#FFFEFA] text-ink-primary border-paper-border hover:bg-paper-bg'
            }`}
          >
            <span>My Applications</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-black/20 rounded-full">
              {myApplications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider border transition-colors flex items-center space-x-2 ${
              activeTab === 'saved'
                ? 'bg-cobalt text-white border-cobalt shadow-[2px_2px_0px_#1D1D1B]'
                : 'bg-[#FFFEFA] text-ink-primary border-paper-border hover:bg-paper-bg'
            }`}
          >
            <span>Saved Projects</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-black/20 rounded-full">
              {savedProjects.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1: Created Projects */}
      {activeTab === 'created' && (
        <div className="space-y-6">
          {createdProjects.length === 0 ? (
            <div className="p-12 bg-[#FFFEFA] border border-paper-border text-center space-y-3">
              <FolderGit2 className="w-8 h-8 text-cobalt mx-auto" />
              <h3 className="font-display font-bold text-base text-ink-primary">
                You haven't posted any projects yet
              </h3>
              <p className="text-xs text-ink-secondary max-w-sm mx-auto">
                Got a hackathon concept, startup idea or research proposal? Post it to discover like-minded students.
              </p>
              <Link
                to="/create-project"
                className="inline-block px-4 py-2 bg-cobalt text-white text-xs font-bold uppercase tracking-wider mt-2"
              >
                Post Your First Project
              </Link>
            </div>
          ) : (
            createdProjects.map((project) => {
              const pendingCount = applications.filter(
                (a) => a.projectId === project.id && a.status === 'Pending'
              ).length;
              const members = users.filter((u) => project.memberIds.includes(u.id));

              return (
                <div
                  key={project.id}
                  className="bg-[#FFFEFA] border border-paper-border p-6 shadow-subtle flex flex-col md:flex-row items-start justify-between gap-6 relative"
                >
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase font-bold text-cobalt bg-cobalt-light px-2 py-0.5 border border-cobalt/20">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-semibold text-ink-secondary">
                        {project.collaborationMode}
                      </span>
                      <span className="text-[11px] font-mono text-ink-muted">
                        • Status: {project.status}
                      </span>
                    </div>

                    <Link to={`/project/${project.id}`}>
                      <h3 className="font-display font-extrabold text-xl text-ink-primary hover:text-cobalt transition-colors">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-ink-secondary line-clamp-2">
                      {project.tagline}
                    </p>

                    <div className="flex items-center space-x-4 text-xs text-ink-secondary pt-2">
                      <span className="flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-cobalt" />
                        <span>{project.memberIds.length} / {project.teamSize} members</span>
                      </span>
                      <span>•</span>
                      <span className="text-cobalt font-semibold">
                        {project.openPositions} spot{project.openPositions !== 1 ? 's' : ''} open
                      </span>
                      {pendingCount > 0 && (
                        <>
                          <span>•</span>
                          <span className="px-2 py-0.5 bg-scrapbook-yellow font-bold text-ink-primary">
                            {pendingCount} new applicant{pendingCount !== 1 ? 's' : ''}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Owner Controls */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-48 self-stretch justify-between border-t md:border-t-0 md:border-l border-paper-border pt-4 md:pt-0 md:pl-6">
                    <div className="space-y-2">
                      <Link
                        to={`/project/${project.id}`}
                        className="w-full py-2 bg-paper-bg hover:bg-white text-ink-primary text-xs font-bold border border-paper-border text-center block"
                      >
                        View Project Page
                      </Link>

                      <Link
                        to="/applications"
                        className="w-full py-2 bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold text-center block shadow-[2px_2px_0px_#1D1D1B]"
                      >
                        Review Applicants ({pendingCount})
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-paper-border flex items-center justify-between">
                      <select
                        value={project.status}
                        onChange={(e) => handleStatusChange(project, e.target.value as ProjectStatus)}
                        className="text-[11px] p-1 bg-paper-bg border border-paper-border font-medium text-ink-primary"
                      >
                        <option value="Recruiting">Recruiting</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Closed">Closed</option>
                      </select>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
                            deleteProject(project.id);
                          }
                        }}
                        className="p-1.5 text-ink-secondary hover:text-scrapbook-coral"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Joined Teams */}
      {activeTab === 'joined' && (
        <div className="space-y-6">
          {joinedProjects.length === 0 ? (
            <div className="p-12 bg-[#FFFEFA] border border-paper-border text-center space-y-3">
              <Users className="w-8 h-8 text-cobalt mx-auto" />
              <h3 className="font-display font-bold text-base text-ink-primary">
                You haven't joined any teams yet
              </h3>
              <p className="text-xs text-ink-secondary max-w-sm mx-auto">
                Discover exciting active projects and apply to join a roster.
              </p>
              <Link
                to="/projects"
                className="inline-block px-4 py-2 bg-cobalt text-white text-xs font-bold uppercase tracking-wider mt-2"
              >
                Browse Open Projects
              </Link>
            </div>
          ) : (
            joinedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#FFFEFA] border border-paper-border p-6 shadow-subtle flex flex-col sm:flex-row items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-cobalt bg-cobalt-light px-2 py-0.5 border border-cobalt/20">
                    {project.category} • Team Member
                  </span>
                  <Link to={`/project/${project.id}`}>
                    <h3 className="font-display font-extrabold text-lg text-ink-primary hover:text-cobalt">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-ink-secondary">{project.tagline}</p>
                </div>

                <Link
                  to={`/project/${project.id}`}
                  className="px-4 py-2 bg-cobalt text-white text-xs font-bold flex items-center space-x-1"
                >
                  <span>Team Workspace →</span>
                </Link>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: My Applications */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          {myApplications.length === 0 ? (
            <div className="p-12 bg-[#FFFEFA] border border-paper-border text-center space-y-3">
              <FileText className="w-8 h-8 text-cobalt mx-auto" />
              <h3 className="font-display font-bold text-base text-ink-primary">
                No active applications
              </h3>
              <p className="text-xs text-ink-secondary max-w-sm mx-auto">
                When you apply to projects, your pending reviews and outcomes will appear here.
              </p>
              <Link
                to="/projects"
                className="inline-block px-4 py-2 bg-cobalt text-white text-xs font-bold uppercase tracking-wider mt-2"
              >
                Explore Opportunities
              </Link>
            </div>
          ) : (
            myApplications.map((app) => {
              const project = projects.find((p) => p.id === app.projectId);
              if (!project) return null;

              return (
                <div
                  key={app.id}
                  className="bg-[#FFFEFA] border border-paper-border p-6 shadow-subtle space-y-3"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-paper-border">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink-secondary">
                      Application to {project.title}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 ${
                        app.status === 'Pending'
                          ? 'bg-scrapbook-yellow text-ink-primary'
                          : app.status === 'Accepted'
                          ? 'bg-scrapbook-green text-[#1D1D1B]'
                          : 'bg-scrapbook-coral/30 text-[#A63725]'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <p className="text-xs text-ink-primary italic">
                    "{app.message}"
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-ink-secondary">
                    <span>Submitted on {new Date(app.createdAt).toLocaleDateString()}</span>
                    <Link
                      to={`/project/${project.id}`}
                      className="text-cobalt font-bold hover:underline"
                    >
                      View Project Details →
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 4: Saved Projects */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedProjects.length === 0 ? (
            <div className="col-span-full p-12 bg-[#FFFEFA] border border-paper-border text-center space-y-2">
              <Bookmark className="w-8 h-8 text-cobalt mx-auto" />
              <p className="text-sm font-bold text-ink-primary">
                No bookmarked projects
              </p>
              <p className="text-xs text-ink-secondary">
                Click the bookmark icon on any project card to save it for later review.
              </p>
            </div>
          ) : (
            savedProjects.map((p) => (
              <div
                key={p.id}
                className="bg-[#FFFEFA] border border-paper-border p-5 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-cobalt bg-cobalt-light px-2 py-0.5 inline-block mb-2">
                    {p.category}
                  </span>
                  <Link to={`/project/${p.id}`}>
                    <h4 className="font-display font-bold text-base text-ink-primary hover:text-cobalt">
                      {p.title}
                    </h4>
                  </Link>
                  <p className="text-xs text-ink-secondary line-clamp-2 mt-1">
                    {p.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-paper-border flex justify-between items-center text-xs">
                  <span className="text-ink-secondary">{p.openPositions} open spots</span>
                  <Link to={`/project/${p.id}`} className="text-cobalt font-bold hover:underline">
                    View →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};

