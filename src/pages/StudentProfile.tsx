import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Tape } from '../components/common/Tape';
import { StickyNote } from '../components/common/StickyNote';
import {
  Bookmark,
  MessageSquare,
  Share2,
  Globe,
  ExternalLink,
  Award,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Edit3,
  X,
  Plus,
} from 'lucide-react';
import { User } from '../types';

export const StudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    users,
    currentUser,
    toggleSaveProfile,
    isProfileSaved,
    updateUserProfile,
    calculateCompatibility,
    projects,
    showToast,
  } = useApp();

  // Find profile by ID, or fallback to current user
  const profileUser = users.find((u) => u.id === id) || currentUser;
  const isOwnProfile = profileUser.id === currentUser.id;
  const isSaved = isProfileSaved(profileUser.id);
  const compat = calculateCompatibility(profileUser, currentUser);

  // Edit Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<User>>({
    name: profileUser.name,
    headline: profileUser.headline,
    bio: profileUser.bio,
    story: profileUser.story || '',
    skills: [...profileUser.skills],
    interests: [...profileUser.interests],
    availability: profileUser.availability,
    department: profileUser.department,
    year: profileUser.year,
    campus: profileUser.campus,
  });

  const [newSkillInput, setNewSkillInput] = useState('');
  const [newInterestInput, setNewInterestInput] = useState('');

  // Handle Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(editForm);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && editForm.skills) {
      if (!editForm.skills.includes(newSkillInput.trim())) {
        setEditForm({ ...editForm, skills: [...editForm.skills, newSkillInput.trim()] });
      }
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (editForm.skills) {
      setEditForm({
        ...editForm,
        skills: editForm.skills.filter((s) => s !== skillToRemove),
      });
    }
  };

  const handleAddInterest = () => {
    if (newInterestInput.trim() && editForm.interests) {
      if (!editForm.interests.includes(newInterestInput.trim())) {
        setEditForm({ ...editForm, interests: [...editForm.interests, newInterestInput.trim()] });
      }
      setNewInterestInput('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    if (editForm.interests) {
      setEditForm({
        ...editForm,
        interests: editForm.interests.filter((i) => i !== interestToRemove),
      });
    }
  };

  // Find projects that this user is a member of
  const userProjects = projects.filter((p) => p.memberIds.includes(profileUser.id));

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-paper-border">
        <div className="flex items-center space-x-2 text-xs font-semibold text-ink-secondary">
          <Link to="/explore" className="hover:text-cobalt">
            ← Back to Discovery
          </Link>
          <span>/</span>
          <span className="text-ink-primary">{profileUser.name}</span>
        </div>

        <div className="flex items-center space-x-2">
          {isOwnProfile ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-cobalt hover:bg-cobalt-hover text-white text-xs font-display font-bold shadow-[2px_2px_0px_#1D1D1B]"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit My Profile</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => toggleSaveProfile(profileUser.id)}
                className={`p-2 border transition-colors ${
                  isSaved
                    ? 'bg-cobalt-light text-cobalt border-cobalt'
                    : 'bg-[#FFFEFA] border-paper-border text-ink-secondary hover:text-ink-primary'
                }`}
                title="Save Profile"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-cobalt text-cobalt' : ''}`} />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast('Profile link copied to clipboard!', 'info');
                }}
                className="p-2 border border-paper-border bg-[#FFFEFA] text-ink-secondary hover:text-ink-primary transition-colors"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <Link
                to={`/messages?userId=${profileUser.id}`}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-cobalt hover:bg-cobalt-hover text-white text-xs font-display font-bold shadow-[2px_2px_0px_#1D1D1B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message {profileUser.name.split(' ')[0]}</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Scrapbook Portfolio Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FFFEFA] border border-paper-border p-6 shadow-lifted relative rotate-[-0.5deg]">
            {/* Top Washi Tape */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Tape variant="yellow" width="w-24" rotate="rotate-1" />
            </div>

            {/* Profile Photo with Polaroid border */}
            <div className="bg-[#FFFEFA] p-2 border border-paper-border shadow-xs mb-4">
              <div className="aspect-square overflow-hidden bg-[#ECE7DC]">
                <img
                  src={profileUser.avatar}
                  alt={profileUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name & Academic Identity */}
            <div className="text-center space-y-1 mb-4">
              <h1 className="font-display font-extrabold text-2xl text-ink-primary">
                {profileUser.name}
              </h1>
              <p className="text-xs font-semibold text-cobalt font-mono">
                {profileUser.handle}
              </p>
              <p className="text-xs text-ink-secondary font-medium">
                {profileUser.headline}
              </p>
            </div>

            {/* Academic Badges */}
            <div className="space-y-2 py-3 border-y border-paper-border text-xs">
              <div className="flex items-center text-ink-secondary">
                <Calendar className="w-3.5 h-3.5 mr-2 text-cobalt flex-shrink-0" />
                <span>{profileUser.year}</span>
              </div>
              <div className="flex items-center text-ink-secondary">
                <Award className="w-3.5 h-3.5 mr-2 text-cobalt flex-shrink-0" />
                <span className="font-semibold text-ink-primary">{profileUser.department}</span>
              </div>
              <div className="flex items-center text-ink-secondary">
                <MapPin className="w-3.5 h-3.5 mr-2 text-cobalt flex-shrink-0" />
                <span>{profileUser.campus}</span>
              </div>
              <div className="flex items-center text-ink-secondary">
                <Clock className="w-3.5 h-3.5 mr-2 text-cobalt flex-shrink-0" />
                <span>Availability: <strong>{profileUser.availability}</strong></span>
              </div>
            </div>

            {/* Social & Portfolio Links */}
            <div className="pt-4 flex items-center justify-center space-x-3">
              {profileUser.portfolioLinks.github && (
                <a
                  href={profileUser.portfolioLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-paper-border hover:bg-paper-bg text-ink-primary hover:text-cobalt transition-colors"
                  title="GitHub Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              )}
              {profileUser.portfolioLinks.portfolio && (
                <a
                  href={profileUser.portfolioLinks.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-paper-border hover:bg-paper-bg text-ink-primary hover:text-cobalt transition-colors"
                  title="Personal Portfolio"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {profileUser.portfolioLinks.linkedin && (
                <a
                  href={profileUser.portfolioLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-paper-border hover:bg-paper-bg text-ink-primary hover:text-cobalt transition-colors"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              {profileUser.portfolioLinks.twitter && (
                <a
                  href={profileUser.portfolioLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-paper-border hover:bg-paper-bg text-ink-primary hover:text-cobalt transition-colors"
                  title="Twitter / X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Compatibility Breakdown (when viewing someone else) */}
          {!isOwnProfile && (
            <div className="bg-[#E7EBFF]/60 border border-cobalt/25 p-5 shadow-subtle relative rotate-[0.5deg]">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-cobalt" />
                <h3 className="font-display font-bold text-sm text-cobalt">
                  {compat.score}% Compatibility With You
                </h3>
              </div>
              <p className="text-xs text-ink-secondary mb-3 leading-relaxed">
                Calculated based on skill overlap, design+engineering synergy, and matching schedule commitment.
              </p>
              <ul className="space-y-1.5 text-xs text-ink-primary">
                {compat.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cobalt flex-shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sticky Note: Open For */}
          <div className="w-full">
            <StickyNote color="yellow" rotate="-rotate-1">
              <p className="font-handwritten text-lg leading-snug">
                Open for: {profileUser.collaborationPreferences.join(', ')}
              </p>
              <p className="text-xs font-sans text-ink-secondary mt-1">
                Reach out if you are submitting to upcoming university competitions!
              </p>
            </StickyNote>
          </div>
        </div>

        {/* Right Column: Bio, Story, Skills, Achievements, Past Projects */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Bio & Extended Story */}
          <div className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-8 shadow-subtle space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-handwritten text-xl text-cobalt font-bold">
                ★ Personal Manifesto
              </span>
              <span className="h-0.5 w-12 bg-cobalt inline-block" />
            </div>
            <h2 className="font-display font-extrabold text-2xl text-ink-primary">
              ABOUT {profileUser.name.toUpperCase()}
            </h2>
            <p className="text-base text-ink-primary leading-relaxed">
              {profileUser.bio}
            </p>
            {profileUser.story && (
              <p className="text-sm text-ink-secondary leading-relaxed pt-2 border-t border-paper-border italic font-serif">
                "{profileUser.story}"
              </p>
            )}
          </div>

          {/* Skills & Passions */}
          <div className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-8 shadow-subtle space-y-6">
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-ink-primary mb-3">
                Core Technical & Creative Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileUser.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-semibold px-3 py-1.5 bg-[#FBF9F4] text-ink-primary border border-paper-border shadow-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-paper-border">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-ink-primary mb-3">
                Research & Creative Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileUser.interests.map((interest) => (
                  <span
                    key={interest}
                    className="text-xs font-medium px-3 py-1 bg-scrapbook-yellowLight text-ink-primary border border-scrapbook-yellow/50"
                  >
                    ★ {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Past Projects / Portfolio Works */}
          <div className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-8 shadow-subtle space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-handwritten text-lg text-cobalt font-bold">
                  ★ Proven Execution
                </span>
                <h3 className="font-display font-extrabold text-2xl text-ink-primary">
                  FEATURED WORK & PREVIOUS BUILDS
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {profileUser.pastProjects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#FBF9F4] border border-paper-border flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-display font-bold text-base text-ink-primary">
                        {proj.title}
                      </h4>
                      <span className="text-[11px] font-semibold text-cobalt px-2 py-0.5 bg-cobalt-light">
                        {proj.role}
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      {proj.desc}
                    </p>
                    {proj.tags && (
                      <div className="flex flex-wrap gap-1 pt-1.5">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono text-ink-muted px-1.5 py-0.5 bg-white border border-paper-border"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold text-cobalt hover:underline flex-shrink-0"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Competition Trophies */}
          {profileUser.achievements && profileUser.achievements.length > 0 && (
            <div className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-8 shadow-subtle space-y-4">
              <h3 className="font-display font-extrabold text-xl text-ink-primary">
                CAMPUS HONORS & COMPETITION WINS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profileUser.achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-paper-bg border border-paper-border flex items-center space-x-3"
                  >
                    <div className="w-9 h-9 bg-scrapbook-yellow/50 text-ink-primary flex items-center justify-center font-bold text-sm border border-scrapbook-yellow">
                      {ach.badge ? ach.badge.split(' ')[0] : '🏆'}
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-xs text-ink-primary truncate">
                        {ach.title}
                      </p>
                      <p className="text-[11px] text-ink-secondary truncate">
                        {ach.event} • {ach.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Active Projects on TeamUp */}
          {userProjects.length > 0 && (
            <div className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-8 shadow-subtle space-y-4">
              <h3 className="font-display font-extrabold text-xl text-ink-primary">
                ACTIVE ON TEAMUP ({userProjects.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userProjects.map((p) => (
                  <Link
                    key={p.id}
                    to={`/project/${p.id}`}
                    className="p-4 border border-paper-border bg-paper-bg hover:bg-white hover:border-cobalt transition-all group block"
                  >
                    <span className="text-[10px] uppercase font-bold text-cobalt bg-cobalt-light px-1.5 py-0.5 inline-block mb-1.5">
                      {p.category}
                    </span>
                    <h4 className="font-display font-bold text-sm text-ink-primary group-hover:text-cobalt transition-colors line-clamp-1">
                      {p.title}
                    </h4>
                    <p className="text-xs text-ink-secondary line-clamp-2 mt-1">
                      {p.tagline}
                    </p>
                    <div className="mt-3 text-[11px] font-semibold text-cobalt flex items-center space-x-1">
                      <span>View Project Page →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FFFEFA] border-2 border-ink-primary p-6 sm:p-8 max-w-2xl w-full shadow-lifted relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-paper-border mb-6">
              <h3 className="font-display font-black text-xl text-ink-primary">
                EDIT YOUR BUILDER PROFILE
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-ink-secondary hover:text-ink-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={editForm.headline}
                    onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                    className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={editForm.year}
                    onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                    className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  Weekly Availability
                </label>
                <select
                  value={editForm.availability}
                  onChange={(e) => setEditForm({ ...editForm, availability: e.target.value })}
                  className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                >
                  <option value="10-15 hrs/wk">10-15 hrs/wk</option>
                  <option value="15-20 hrs/wk">15-20 hrs/wk</option>
                  <option value="20+ hrs/wk">20+ hrs/wk</option>
                  <option value="Weekends only">Weekends only</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  Personal Intro (Bio)
                </label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  Extended Background / Story
                </label>
                <textarea
                  rows={3}
                  value={editForm.story}
                  onChange={(e) => setEditForm({ ...editForm, story: e.target.value })}
                  className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                />
              </div>

              {/* Skills edit */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  Skills
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {editForm.skills?.map((sk) => (
                    <span
                      key={sk}
                      className="inline-flex items-center space-x-1 text-xs px-2 py-0.5 bg-paper-bg border border-paper-border"
                    >
                      <span>{sk}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(sk)}
                        className="text-ink-secondary hover:text-scrapbook-coral"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    placeholder="Add a skill (e.g. Docker, Figma)..."
                    className="flex-1 p-2 bg-paper-bg border border-paper-border text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-2 bg-paper-bg border border-paper-border text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-paper-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-paper-border text-xs font-bold text-ink-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-cobalt hover:bg-cobalt-hover text-white text-xs font-display font-bold shadow-[2px_2px_0px_#1D1D1B]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
