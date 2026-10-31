import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Tape } from '../components/common/Tape';
import {
  CheckCircle2,
  XCircle,
  ExternalLink,
  MessageSquare,
  Clock,
  User,
  FolderGit2,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Applications: React.FC = () => {
  const {
    applications,
    projects,
    users,
    currentUser,
    updateApplicationStatus,
    showToast,
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('All');

  // Find all projects owned by the current user
  const userOwnedProjects = projects.filter((p) => p.ownerId === currentUser.id);
  const userOwnedProjectIds = userOwnedProjects.map((p) => p.id);

  // Applications targeting projects owned by the current user
  const receivedApplications = applications.filter((app) =>
    userOwnedProjectIds.includes(app.projectId)
  );

  // Filtered applications
  const filteredApps = receivedApplications.filter((app) => {
    if (filterStatus !== 'All' && app.status !== filterStatus) return false;
    if (selectedProjectId !== 'All' && app.projectId !== selectedProjectId) return false;
    return true;
  });

  const handleAccept = (applicationId: string, applicantName: string) => {
    updateApplicationStatus(applicationId, 'Accepted');
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  const handleReject = (applicationId: string) => {
    updateApplicationStatus(applicationId, 'Rejected');
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="relative mb-8 pb-6 border-b border-paper-border">
        <div className="absolute top-0 right-8 hidden sm:block">
          <Tape variant="yellow" width="w-28" rotate="rotate-2" />
        </div>

        <div className="max-w-2xl space-y-2">
          <span className="font-handwritten text-xl text-cobalt font-bold">
            ★ Project Lead Desk
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-ink-primary tracking-tight">
            REVIEW TEAM APPLICATIONS
          </h1>
          <p className="text-sm text-ink-secondary">
            Manage incoming requests to join your project rosters. Accept top talent to expand your team.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto">
            {['All', 'Pending', 'Accepted', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider border transition-colors ${
                  filterStatus === status
                    ? 'bg-cobalt text-white border-cobalt shadow-[2px_2px_0px_#1D1D1B]'
                    : 'bg-[#FFFEFA] text-ink-primary border-paper-border hover:border-ink-secondary'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Project Filter */}
          {userOwnedProjects.length > 1 && (
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="p-2 bg-[#FFFEFA] border border-paper-border text-xs font-semibold text-ink-primary"
            >
              <option value="All">All Your Projects</option>
              {userOwnedProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Notice if not project owner */}
      {userOwnedProjects.length === 0 && (
        <div className="p-6 bg-paper-bg border border-paper-border text-center space-y-3 mb-8">
          <FolderGit2 className="w-8 h-8 text-cobalt mx-auto" />
          <h3 className="font-display font-bold text-base text-ink-primary">
            You don't own any active projects yet
          </h3>
          <p className="text-xs text-ink-secondary max-w-sm mx-auto">
            Post a project to recruit teammates, or switch to another demo profile (like Maya Chen or Devon Vance) to see incoming applications.
          </p>
          <div className="pt-2 flex justify-center space-x-3">
            <Link
              to="/create-project"
              className="px-4 py-2 bg-cobalt text-white text-xs font-bold uppercase tracking-wider"
            >
              Post a Project
            </Link>
          </div>
        </div>
      )}

      {/* Empty List */}
      {userOwnedProjects.length > 0 && filteredApps.length === 0 && (
        <div className="p-12 bg-[#FFFEFA] border border-paper-border text-center space-y-3 shadow-subtle">
          <div className="w-10 h-10 bg-cobalt-light text-cobalt rounded-none flex items-center justify-center mx-auto font-bold text-lg">
            ✓
          </div>
          <h3 className="font-display font-bold text-lg text-ink-primary">
            All caught up!
          </h3>
          <p className="text-xs text-ink-secondary">
            No applications match your selected filter ({filterStatus}).
          </p>
        </div>
      )}

      {/* Applications List */}
      <div className="space-y-6">
        {filteredApps.map((app, idx) => {
          const applicant = users.find((u) => u.id === app.applicantId);
          const targetProject = projects.find((p) => p.id === app.projectId);
          if (!applicant || !targetProject) return null;

          const isPending = app.status === 'Pending';
          const isAccepted = app.status === 'Accepted';
          const isRejected = app.status === 'Rejected';

          return (
            <div
              key={app.id}
              className="bg-[#FFFEFA] border border-paper-border p-6 shadow-subtle hover:shadow-lifted transition-all relative"
            >
              {/* Application Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-paper-border gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-paper-bg text-ink-primary border border-paper-border">
                    Project: {targetProject.title}
                  </span>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                      isPending
                        ? 'bg-scrapbook-yellow text-ink-primary'
                        : isAccepted
                        ? 'bg-scrapbook-green text-[#1D1D1B]'
                        : 'bg-scrapbook-coral/30 text-[#A63725]'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <span className="text-[11px] text-ink-muted">
                  Applied on {new Date(app.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Applicant Profile Bar */}
              <div className="py-4 flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <Link to={`/profile/${applicant.id}`}>
                    <img
                      src={applicant.avatar}
                      alt={applicant.name}
                      className="w-14 h-14 object-cover border-2 border-paper-border shadow-xs"
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/profile/${applicant.id}`}
                      className="font-display font-extrabold text-lg text-ink-primary hover:text-cobalt transition-colors"
                    >
                      {applicant.name}
                    </Link>
                    <p className="text-xs text-ink-secondary">
                      {applicant.year} • {applicant.department}
                    </p>
                    <p className="text-[11px] font-semibold text-cobalt mt-0.5">
                      ⏱ {app.availability}
                    </p>
                  </div>
                </div>

                {/* Quick actions: View profile or Message */}
                <div className="flex items-center space-x-2 self-start md:self-auto">
                  <Link
                    to={`/profile/${applicant.id}`}
                    className="px-3 py-1.5 border border-paper-border bg-paper-bg hover:bg-white text-ink-primary text-xs font-bold"
                  >
                    View Portfolio
                  </Link>
                  <Link
                    to={`/messages?userId=${applicant.id}`}
                    className="px-3 py-1.5 bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold flex items-center space-x-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </Link>
                </div>
              </div>

              {/* Applicant Message & Contribution */}
              <div className="bg-[#FBF9F4] p-4 border border-paper-border space-y-3 mb-4 text-xs">
                <div>
                  <span className="font-bold uppercase tracking-wider text-ink-secondary text-[10px] block mb-1">
                    Application Note:
                  </span>
                  <p className="text-ink-primary leading-relaxed whitespace-pre-line">
                    "{app.message}"
                  </p>
                </div>

                <div className="pt-2 border-t border-paper-border">
                  <span className="font-bold uppercase tracking-wider text-ink-secondary text-[10px] block mb-1">
                    Skills & Value Contribution:
                  </span>
                  <p className="text-ink-primary font-medium">
                    {app.skillsContribution}
                  </p>
                </div>

                {app.portfolioLink && (
                  <div className="pt-1">
                    <a
                      href={app.portfolioLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-cobalt font-bold hover:underline"
                    >
                      <span>{app.portfolioLink}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Decision Action Buttons */}
              {isPending && (
                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    onClick={() => handleReject(app.id)}
                    className="px-4 py-2 border border-scrapbook-coral/40 text-scrapbook-coral hover:bg-scrapbook-coralLight text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleAccept(app.id, applicant.name)}
                    className="px-5 py-2 bg-cobalt hover:bg-cobalt-hover text-white text-xs font-display font-bold uppercase tracking-wider shadow-[2px_2px_0px_#1D1D1B] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accept to Team</span>
                  </button>
                </div>
              )}

              {isAccepted && (
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#276A35] pt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accepted! Added to the active project member roster.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

