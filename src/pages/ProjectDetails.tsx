import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Tape } from '../components/common/Tape';
import { StickyNote } from '../components/common/StickyNote';
import {
  Bookmark,
  Share2,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  X,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    projects,
    users,
    currentUser,
    applyToProject,
    hasApplied,
    toggleSaveProject,
    isProjectSaved,
    showToast,
  } = useApp();

  const project = projects.find((p) => p.id === id);

  // Application Modal state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    message: '',
    skillsContribution: '',
    availability: currentUser.availability || '15-20 hrs/wk',
    portfolioLink: currentUser.portfolioLinks.github || currentUser.portfolioLinks.portfolio || '',
  });

  if (!project) {
    return (
      <div className="py-24 text-center max-w-md mx-auto space-y-4">
        <h2 className="font-display font-black text-2xl text-ink-primary">
          Project Not Found
        </h2>
        <p className="text-xs text-ink-secondary">
          The collaboration project you are looking for does not exist or may have been closed.
        </p>
        <Link
          to="/projects"
          className="inline-block px-5 py-2.5 bg-cobalt text-white text-xs font-bold uppercase tracking-wider"
        >
          Browse Active Projects
        </Link>
      </div>
    );
  }

  const owner = users.find((u) => u.id === project.ownerId) || currentUser;
  const members = users.filter((u) => project.memberIds.includes(u.id));
  const isOwner = project.ownerId === currentUser.id;
  const isMember = project.memberIds.includes(currentUser.id);
  const alreadyApplied = hasApplied(project.id, currentUser.id);
  const isSaved = isProjectSaved(project.id);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationForm.message.trim() || !applicationForm.skillsContribution.trim()) {
      showToast('Please complete the required application fields.', 'warning');
      return;
    }

    const success = applyToProject({
      projectId: project.id,
      message: applicationForm.message.trim(),
      skillsContribution: applicationForm.skillsContribution.trim(),
      availability: applicationForm.availability,
      portfolioLink: applicationForm.portfolioLink.trim(),
    });

    if (success) {
      setShowApplyModal(false);
      try {
        confetti({
          particleCount: 60,
          spread: 50,
          origin: { y: 0.5 },
        });
      } catch (err) {}
    }
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-paper-border gap-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-ink-secondary">
          <Link to="/projects" className="hover:text-cobalt">
            ← Back to All Projects
          </Link>
          <span>/</span>
          <span className="text-ink-primary uppercase tracking-wider font-bold">
            {project.category}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => toggleSaveProject(project.id)}
            className={`p-2 border transition-colors flex items-center space-x-1.5 text-xs font-bold ${
              isSaved
                ? 'bg-cobalt-light text-cobalt border-cobalt'
                : 'bg-[#FFFEFA] border-paper-border text-ink-secondary hover:text-ink-primary'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-cobalt text-cobalt' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              showToast('Project link copied to clipboard!', 'info');
            }}
            className="p-2 border border-paper-border bg-[#FFFEFA] text-ink-secondary hover:text-ink-primary transition-colors flex items-center space-x-1.5 text-xs font-bold"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          {isOwner ? (
            <Link
              to="/applications"
              className="px-4 py-2 bg-cobalt hover:bg-cobalt-hover text-white text-xs font-display font-bold shadow-[2px_2px_0px_#1D1D1B]"
            >
              Manage Applications
            </Link>
          ) : isMember ? (
            <span className="px-4 py-2 bg-scrapbook-green text-[#1D1D1B] text-xs font-display font-bold border border-scrapbook-greenDark/20">
              ✓ You are on this team
            </span>
          ) : alreadyApplied ? (
            <span className="px-4 py-2 bg-scrapbook-yellow text-[#1D1D1B] text-xs font-display font-bold border border-ink-primary">
              ⏳ Application Pending
            </span>
          ) : project.openPositions > 0 ? (
            <button
              onClick={() => setShowApplyModal(true)}
              className="px-6 py-2.5 bg-cobalt hover:bg-cobalt-hover text-white text-xs font-display font-bold uppercase tracking-wider shadow-[3px_3px_0px_#1D1D1B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply to Join</span>
            </button>
          ) : (
            <span className="px-4 py-2 bg-paper-bg text-ink-muted text-xs font-bold border border-paper-border">
              Roster Full
            </span>
          )}
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Cols: Project Details & Goals */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Card with Cover Photo */}
          <div className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-8 shadow-subtle relative rotate-[-0.3deg]">
            <div className="absolute -top-3 left-10">
              <Tape variant="yellow" width="w-24" rotate="-rotate-2" />
            </div>

            {/* Category & Status */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 bg-cobalt-light text-cobalt border border-cobalt/20">
                {project.category}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-scrapbook-yellow text-ink-primary">
                {project.openPositions} Position{project.openPositions !== 1 ? 's' : ''} Open
              </span>
              <span className="text-xs text-ink-muted">
                Status: <strong>{project.status}</strong>
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display font-black text-2xl sm:text-4xl text-ink-primary tracking-tight leading-tight">
              {project.title}
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-ink-secondary mt-2 leading-relaxed">
              {project.tagline}
            </p>

            {/* Cover Photography */}
            <div className="aspect-[16/9] overflow-hidden bg-[#ECE7DC] my-6 border border-[#E6E0D5] shadow-xs">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Full Description */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-ink-primary">
                The Mission & Scope
              </h3>
              <p className="text-sm text-ink-primary leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>
          </div>

          {/* Goals & Deliverables */}
          <div className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-8 shadow-subtle space-y-4">
            <h3 className="font-display font-extrabold text-xl text-ink-primary flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-cobalt inline-block" />
              <span>KEY DELIVERABLES & MILESTONES</span>
            </h3>

            <div className="space-y-2.5 pt-2">
              {project.goals.map((goal, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3 bg-paper-bg border border-paper-border"
                >
                  <CheckCircle2 className="w-4 h-4 text-cobalt flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-ink-primary leading-relaxed">
                    {goal}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Skills & Talents */}
          <div className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-8 shadow-subtle space-y-4">
            <h3 className="font-display font-extrabold text-xl text-ink-primary">
              SKILLS & EXPERTISE SOUGHT
            </h3>
            <p className="text-xs text-ink-secondary">
              Applicants with experience in any of these areas are strongly encouraged to submit:
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-bold px-3 py-1.5 bg-[#FBF9F4] text-cobalt border border-cobalt/30 shadow-xs"
                >
                  #{skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Project Logistics & Roster */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Logistics Summary Box */}
          <div className="bg-[#FFFEFA] border border-paper-border p-6 shadow-lifted relative rotate-[0.3deg]">
            <div className="absolute -top-3 right-8">
              <Tape variant="coral" width="w-20" rotate="rotate-2" />
            </div>

            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-ink-primary mb-4 pb-2 border-b border-paper-border">
              Project Logistics
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-ink-secondary flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-cobalt" />
                  <span>Commitment:</span>
                </span>
                <span className="font-semibold text-ink-primary text-right">{project.commitment}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-ink-secondary flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cobalt" />
                  <span>Collab Mode:</span>
                </span>
                <span className="font-semibold text-ink-primary">{project.collaborationMode}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-ink-secondary flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cobalt" />
                  <span>Duration:</span>
                </span>
                <span className="font-semibold text-ink-primary">{project.duration}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-ink-secondary flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-cobalt" />
                  <span>Team Size:</span>
                </span>
                <span className="font-semibold text-ink-primary">
                  {project.memberIds.length} / {project.teamSize} members
                </span>
              </div>

              <div className="flex items-start justify-between pt-2 border-t border-paper-border">
                <span className="text-ink-secondary">Deadline:</span>
                <span className="font-bold text-scrapbook-coral">{project.applicationDeadline}</span>
              </div>
            </div>

            {/* Bottom CTA Button inside logistics */}
            <div className="pt-6">
              {!isOwner && !isMember && !alreadyApplied && project.openPositions > 0 && (
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="w-full py-3 bg-cobalt hover:bg-cobalt-hover text-white font-display font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#1D1D1B] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center block"
                >
                  Apply to Join Team →
                </button>
              )}
            </div>
          </div>

          {/* Project Lead Card */}
          <div className="bg-[#FFFEFA] border border-paper-border p-6 shadow-subtle space-y-3">
            <span className="text-[10px] uppercase font-bold text-ink-secondary tracking-wider block">
              Project Lead / Creator
            </span>
            <div className="flex items-start space-x-3">
              <Link to={`/profile/${owner.id}`}>
                <img
                  src={owner.avatar}
                  alt={owner.name}
                  className="w-12 h-12 object-cover border border-paper-border"
                />
              </Link>
              <div className="min-w-0">
                <Link
                  to={`/profile/${owner.id}`}
                  className="font-display font-bold text-sm text-ink-primary hover:text-cobalt truncate block"
                >
                  {owner.name}
                </Link>
                <p className="text-xs text-ink-secondary truncate">{owner.year}</p>
                <p className="text-[11px] text-cobalt font-semibold truncate">
                  {owner.department.split('&')[0]}
                </p>
              </div>
            </div>
            <p className="text-xs text-ink-secondary line-clamp-2 italic pt-1">
              "{owner.bio}"
            </p>
            <div className="pt-2">
              <Link
                to={`/messages?userId=${owner.id}`}
                className="text-xs font-bold text-cobalt hover:underline flex items-center space-x-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message Lead</span>
              </Link>
            </div>
          </div>

          {/* Current Team Members Roster */}
          <div className="bg-[#FFFEFA] border border-paper-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-paper-border">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-primary">
                Active Team Roster ({members.length})
              </h4>
              <span className="text-[10px] font-bold text-cobalt">
                {project.openPositions} Spot{project.openPositions !== 1 ? 's' : ''} Left
              </span>
            </div>

            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-9 h-9 object-cover border border-paper-border"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/profile/${member.id}`}
                      className="font-display font-bold text-xs text-ink-primary hover:text-cobalt block truncate"
                    >
                      {member.name}
                    </Link>
                    <p className="text-[10px] text-ink-secondary truncate">
                      {member.id === project.ownerId ? '👑 Project Lead' : member.headline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Note */}
          <StickyNote color="mint" rotate="-rotate-1">
            <p className="font-handwritten text-lg leading-snug">
              "We prioritize energy, dedication, and open communication over pure resume pedigree."
            </p>
          </StickyNote>

        </div>
      </div>

      {/* Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FFFEFA] border-2 border-ink-primary p-6 sm:p-8 max-w-lg w-full shadow-lifted relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-paper-border mb-4">
              <div>
                <span className="font-handwritten text-base text-cobalt font-bold">
                  ★ Join the Roster
                </span>
                <h3 className="font-display font-black text-xl text-ink-primary">
                  APPLICATION TO {project.title}
                </h3>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-ink-secondary hover:text-ink-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  Why do you want to join this project? *
                </label>
                <textarea
                  rows={3}
                  value={applicationForm.message}
                  onChange={(e) =>
                    setApplicationForm({ ...applicationForm, message: e.target.value })
                  }
                  placeholder="Share what excites you about this problem and why you want to collaborate..."
                  className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  What skills can you contribute? *
                </label>
                <textarea
                  rows={2}
                  value={applicationForm.skillsContribution}
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      skillsContribution: e.target.value,
                    })
                  }
                  placeholder="e.g. React frontend, WebGL shaders, rapid prototyping under hackathon crunch..."
                  className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                    Your Weekly Availability
                  </label>
                  <select
                    value={applicationForm.availability}
                    onChange={(e) =>
                      setApplicationForm({ ...applicationForm, availability: e.target.value })
                    }
                    className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                  >
                    <option value="10-15 hrs/wk">10-15 hrs/wk</option>
                    <option value="15-20 hrs/wk">15-20 hrs/wk</option>
                    <option value="20+ hrs/wk">20+ hrs/wk</option>
                    <option value="Hackathon sprint only">Hackathon sprint only</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                    Portfolio / GitHub Link
                  </label>
                  <input
                    type="url"
                    value={applicationForm.portfolioLink}
                    onChange={(e) =>
                      setApplicationForm({
                        ...applicationForm,
                        portfolioLink: e.target.value,
                      })
                    }
                    placeholder="https://github.com/..."
                    className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-paper-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 border border-paper-border text-xs font-bold text-ink-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-cobalt hover:bg-cobalt-hover text-white text-xs font-display font-bold uppercase tracking-wider shadow-[2px_2px_0px_#1D1D1B]"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

