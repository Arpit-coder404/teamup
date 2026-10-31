import React, { useState, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User } from '../types';
import { Tape } from '../components/common/Tape';
import { StickyNote } from '../components/common/StickyNote';
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  MessageSquare,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  X,
  Compass,
  Send,
  UserPlus,
  Filter,
} from 'lucide-react';
import { POPULAR_SKILLS } from '../data/seedData';

export const ExplorePage: React.FC = () => {
  const {
    users,
    currentUser,
    toggleSaveProfile,
    isProfileSaved,
    calculateCompatibility,
    projects,
    showToast,
  } = useApp();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL query params
  const initialSkill = searchParams.get('skill') || '';

  // Local filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('For You');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [activeSkills, setActiveSkills] = useState<string[]>(initialSkill ? [initialSkill] : []);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  // Invite to Project modal state
  const [inviteModalUser, setInviteModalUser] = useState<User | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  // Categories tabs
  const CATEGORY_TABS = [
    'For You',
    'Hackathons',
    'Startups',
    'Research',
    'Design',
    'Course Projects',
    'Society Work',
    'Saved Profiles',
  ];

  // List of departments from current users
  const departments = useMemo(() => {
    const deps = new Set(users.map((u) => u.department.split('&')[0].trim()));
    return ['All', ...Array.from(deps)];
  }, [users]);

  // Filter & match calculation
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        // Exclude current logged in user from discovery of teammates
        if (user.id === currentUser.id) return false;

        // Search text matching
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = user.name.toLowerCase().includes(q);
          const matchBio = user.bio.toLowerCase().includes(q);
          const matchHeadline = user.headline.toLowerCase().includes(q);
          const matchSkills = user.skills.some((s) => s.toLowerCase().includes(q));
          const matchInterests = user.interests.some((i) => i.toLowerCase().includes(q));
          const matchDep = user.department.toLowerCase().includes(q);
          if (!matchName && !matchBio && !matchHeadline && !matchSkills && !matchInterests && !matchDep) {
            return false;
          }
        }

        // Category tab filter
        if (selectedCategoryTab === 'Saved Profiles') {
          if (!isProfileSaved(user.id)) return false;
        } else if (selectedCategoryTab !== 'For You') {
          const matchesCollab = user.collaborationPreferences.some((cp) =>
            cp.toLowerCase().includes(selectedCategoryTab.toLowerCase())
          );
          if (!matchesCollab) return false;
        }

        // Academic Year filter
        if (selectedYear !== 'All') {
          if (!user.year.toLowerCase().includes(selectedYear.toLowerCase())) {
            return false;
          }
        }

        // Department filter
        if (selectedDepartment !== 'All') {
          if (!user.department.toLowerCase().includes(selectedDepartment.toLowerCase())) {
            return false;
          }
        }

        // Availability filter
        if (selectedAvailability !== 'All') {
          if (user.availability !== selectedAvailability) {
            return false;
          }
        }

        // Selected skills filter
        if (activeSkills.length > 0) {
          const hasAllSkills = activeSkills.every((sk) =>
            user.skills.some((us) => us.toLowerCase() === sk.toLowerCase())
          );
          if (!hasAllSkills) return false;
        }

        return true;
      })
      .map((user) => {
        const compat = calculateCompatibility(user, currentUser);
        return {
          user,
          compatScore: compat.score,
          compatReasons: compat.reasons,
        };
      })
      .sort((a, b) => {
        if (selectedCategoryTab === 'For You') {
          return b.compatScore - a.compatScore;
        }
        return 0;
      });
  }, [
    users,
    currentUser,
    searchQuery,
    selectedCategoryTab,
    selectedYear,
    selectedDepartment,
    selectedAvailability,
    activeSkills,
    isProfileSaved,
    calculateCompatibility,
  ]);

  const toggleSkill = (skill: string) => {
    setActiveSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSendInvite = () => {
    if (!selectedProjectId) {
      showToast('Please select one of your projects to send an invitation.', 'warning');
      return;
    }
    const proj = projects.find((p) => p.id === selectedProjectId);
    if (proj && inviteModalUser) {
      showToast(
        `Invitation to join "${proj.title}" sent to ${inviteModalUser.name}!`,
        'success'
      );
      setInviteModalUser(null);
      setSelectedProjectId('');
    }
  };

  // User's owned projects for invitations
  const ownedProjects = projects.filter((p) => p.ownerId === currentUser.id);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="relative mb-10 pb-6 border-b border-paper-border">
        <div className="absolute top-0 right-10 hidden md:block">
          <Tape variant="yellow" width="w-28" rotate="rotate-3" />
        </div>

        <div className="max-w-3xl space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-handwritten text-xl text-cobalt font-bold">
              ★ The Teammate Directory
            </span>
            <span className="h-0.5 w-12 bg-cobalt inline-block" />
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-ink-primary tracking-tight">
            DISCOVER COLLABORATORS
          </h1>
          <p className="text-ink-secondary text-base sm:text-lg">
            Find people who match your energy, skills and ambitions. Filter by discipline, past hacks, and weekly availability.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, skills (React, Figma, CUDA), interests or department..."
              className="w-full pl-11 pr-4 py-3 bg-[#FFFEFA] border-2 border-paper-border focus:border-cobalt outline-none font-medium text-sm text-ink-primary shadow-subtle placeholder:text-ink-muted transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-secondary hover:text-ink-primary"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
            className={`px-4 py-3 border-2 flex items-center justify-center space-x-2 font-display font-bold text-sm transition-all ${
              showFiltersDrawer || activeSkills.length > 0 || selectedYear !== 'All'
                ? 'bg-cobalt text-white border-cobalt shadow-sm'
                : 'bg-[#FFFEFA] text-ink-primary border-paper-border hover:border-ink-primary shadow-subtle'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {(activeSkills.length > 0 || selectedYear !== 'All' || selectedDepartment !== 'All') && (
              <span className="w-2 h-2 rounded-full bg-scrapbook-yellow" />
            )}
          </button>
        </div>

        {/* Category Horizontal Filter Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-5 pb-2 no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategoryTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedCategoryTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-cobalt text-white border-cobalt shadow-[2px_2px_0px_#1D1D1B]'
                    : 'bg-[#FFFEFA] text-ink-primary border-paper-border hover:border-ink-secondary hover:bg-paper-bg'
                }`}
              >
                {tab === 'For You' ? '★ For You' : tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Extended Filters Drawer */}
      {showFiltersDrawer && (
        <div className="bg-[#FFFEFA] border border-paper-border p-6 mb-8 shadow-lifted animate-in slide-in-from-top-2 duration-150 relative">
          <div className="flex items-center justify-between pb-4 border-b border-paper-border mb-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-ink-primary flex items-center space-x-2">
              <Filter className="w-4 h-4 text-cobalt" />
              <span>Granular Search Filters</span>
            </h3>
            <button
              onClick={() => {
                setActiveSkills([]);
                setSelectedYear('All');
                setSelectedDepartment('All');
                setSelectedAvailability('All');
                setSearchQuery('');
              }}
              className="text-xs text-cobalt hover:underline font-semibold"
            >
              Reset all filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Academic Year */}
            <div>
              <label className="block text-xs font-bold text-ink-secondary uppercase tracking-wider mb-2">
                Academic Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
              >
                <option value="All">All Years</option>
                <option value="Freshman">Freshman (1st Year)</option>
                <option value="Sophomore">Sophomore (2nd Year)</option>
                <option value="Junior">Junior (3rd Year)</option>
                <option value="Senior">Senior (4th Year)</option>
                <option value="Graduate">Graduate / Master's</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-bold text-ink-secondary uppercase tracking-wider mb-2">
                Department / Discipline
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-xs font-bold text-ink-secondary uppercase tracking-wider mb-2">
                Weekly Availability
              </label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
              >
                <option value="All">Any Availability</option>
                <option value="10-15 hrs/wk">10-15 hrs/wk</option>
                <option value="15-20 hrs/wk">15-20 hrs/wk</option>
                <option value="20+ hrs/wk">20+ hrs/wk</option>
              </select>
            </div>
          </div>

          {/* Quick Skill filter pills */}
          <div className="mt-5 pt-4 border-t border-paper-border">
            <label className="block text-xs font-bold text-ink-secondary uppercase tracking-wider mb-2">
              Filter by Specific Technical & Creative Skills:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SKILLS.map((sk) => {
                const active = activeSkills.includes(sk);
                return (
                  <button
                    key={sk}
                    onClick={() => toggleSkill(sk)}
                    className={`text-xs px-2.5 py-1 border transition-colors ${
                      active
                        ? 'bg-cobalt text-white border-cobalt font-bold'
                        : 'bg-paper-bg text-ink-primary border-paper-border hover:border-ink-secondary'
                    }`}
                  >
                    {sk} {active && '✓'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Discovery Count & Recommendation Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-ink-secondary mb-6 gap-2">
        <p>
          Showing <strong>{filteredUsers.length}</strong> collaborators on campus
          {selectedCategoryTab === 'For You' && ' (sorted by personalized chemistry score)'}
        </p>
        <span className="font-handwritten text-sm text-cobalt">
          Tip: Click any profile to inspect GitHub links & previous hackathon prototypes
        </span>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-20 bg-[#FFFEFA] border border-paper-border p-8 shadow-subtle max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 mx-auto bg-scrapbook-yellow/30 text-ink-primary flex items-center justify-center font-bold text-xl">
            ?
          </div>
          <h3 className="font-display font-bold text-lg text-ink-primary">
            No collaborators found
          </h3>
          <p className="text-xs text-ink-secondary">
            Try loosening your filters or search for another skill like React, Figma, or Python.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategoryTab('For You');
              setSelectedYear('All');
              setSelectedDepartment('All');
              setActiveSkills([]);
            }}
            className="px-4 py-2 bg-cobalt text-white text-xs font-bold uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Profile Cards Grid — Asymmetrical & Distinctive Scrapbook Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredUsers.map(({ user, compatScore, compatReasons }, idx) => {
          const isSaved = isProfileSaved(user.id);
          const rotation = idx % 3 === 0 ? '-rotate-[0.6deg]' : idx % 3 === 1 ? 'rotate-[0.6deg]' : '-rotate-[0.3deg]';

          return (
            <div
              key={user.id}
              className={`bg-[#FFFEFA] border border-paper-border p-6 shadow-subtle hover:shadow-lifted hover:rotate-0 transition-all duration-300 flex flex-col justify-between relative group ${rotation}`}
            >
              {/* Scrapbook pin or tape detail */}
              {idx % 4 === 0 && (
                <div className="absolute -top-3 left-8">
                  <Tape variant="yellow" width="w-20" rotate="-rotate-2" />
                </div>
              )}
              {idx % 4 === 2 && (
                <div className="absolute -top-3 right-8">
                  <Tape variant="mint" width="w-20" rotate="rotate-2" />
                </div>
              )}

              <div>
                {/* Header: Photo, Name, Match Percentage, Bookmark */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3.5">
                    <Link to={`/profile/${user.id}`} className="flex-shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 object-cover border-2 border-paper-border shadow-xs group-hover:scale-105 transition-transform"
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        to={`/profile/${user.id}`}
                        className="font-display font-extrabold text-lg text-ink-primary hover:text-cobalt transition-colors block truncate"
                      >
                        {user.name}
                      </Link>
                      <p className="text-xs text-ink-secondary truncate font-medium">
                        {user.year}
                      </p>
                      <p className="text-[11px] text-cobalt font-semibold truncate mt-0.5">
                        {user.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button
                      onClick={() => toggleSaveProfile(user.id)}
                      className="p-1.5 text-ink-secondary hover:text-cobalt transition-colors"
                      title={isSaved ? 'Remove from saved' : 'Save profile'}
                      aria-label="Save profile"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isSaved ? 'fill-cobalt text-cobalt' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Compatibility Badge with reasons breakdown */}
                <div className="mb-3 p-2 bg-cobalt-light/60 border border-cobalt/20 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cobalt" />
                    <span className="text-xs font-display font-bold text-cobalt">
                      {compatScore}% Chemistry Match
                    </span>
                  </div>
                  <span
                    className="text-[10px] text-ink-secondary font-mono cursor-help"
                    title={compatReasons.join(' • ')}
                  >
                    Heuristic Demo Score ⓘ
                  </span>
                </div>

                {/* Short Personal Bio */}
                <p className="text-xs text-ink-secondary leading-relaxed mb-4 line-clamp-3">
                  "{user.bio}"
                </p>

                {/* Skills tags */}
                <div className="mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Skills:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {user.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`text-[10px] px-2 py-0.5 border ${
                          activeSkills.includes(skill)
                            ? 'bg-scrapbook-yellow font-bold text-ink-primary border-ink-primary'
                            : 'bg-paper-bg text-ink-primary border-paper-border'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Collaboration Preferences */}
                <div className="mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Interested In:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {user.collaborationPreferences.map((pref) => (
                      <span
                        key={pref}
                        className="text-[10px] px-1.5 py-0.5 bg-white text-ink-secondary border border-paper-border"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Bottom Meta & Actions */}
              <div className="pt-4 border-t border-paper-border space-y-3">
                <div className="flex items-center justify-between text-xs text-ink-secondary">
                  <span className="font-handwritten text-sm text-ink-primary">
                    ⏱ {user.availability}
                  </span>
                  <span className="text-[11px] text-ink-muted">
                    {user.campus.split('/')[0]}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to={`/profile/${user.id}`}
                    className="px-3 py-2 bg-paper-bg hover:bg-white text-ink-primary text-xs font-display font-bold border border-paper-border text-center transition-colors"
                  >
                    View Portfolio
                  </Link>
                  <Link
                    to={`/messages?userId=${user.id}`}
                    className="px-3 py-2 bg-cobalt hover:bg-cobalt-hover text-white text-xs font-display font-bold text-center flex items-center justify-center space-x-1 shadow-[2px_2px_0px_#1D1D1B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invite Modal */}
      {inviteModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFEFA] border-2 border-ink-primary p-6 max-w-md w-full shadow-lifted animate-in zoom-in-95 duration-150 relative">
            <div className="flex items-center justify-between pb-3 border-b border-paper-border mb-4">
              <h3 className="font-display font-bold text-lg text-ink-primary">
                Invite {inviteModalUser.name} to Team
              </h3>
              <button
                onClick={() => setInviteModalUser(null)}
                className="text-ink-secondary hover:text-ink-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-ink-secondary mb-4 leading-relaxed">
              Select one of your projects to send an invitation request to {inviteModalUser.name}.
            </p>

            {ownedProjects.length === 0 ? (
              <div className="p-4 bg-paper-bg border border-paper-border text-center space-y-2 mb-4">
                <p className="text-xs font-semibold text-ink-primary">
                  You haven't posted any projects yet.
                </p>
                <Link
                  to="/create-project"
                  className="inline-block text-xs text-cobalt font-bold underline"
                >
                  Create a project first →
                </Link>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                <label className="block text-xs font-bold text-ink-secondary uppercase tracking-wider">
                  Select Project Roster:
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                >
                  <option value="">-- Choose a project --</option>
                  {ownedProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.openPositions} spots open)
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setInviteModalUser(null)}
                className="px-4 py-2 border border-paper-border text-xs font-bold text-ink-secondary"
              >
                Cancel
              </button>
              {ownedProjects.length > 0 && (
                <button
                  onClick={handleSendInvite}
                  className="px-4 py-2 bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold uppercase tracking-wider"
                >
                  Send Invitation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

