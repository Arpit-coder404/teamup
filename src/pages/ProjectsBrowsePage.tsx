import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Tape } from '../components/common/Tape';
import { ProjectCategory } from '../types';
import {
  Search,
  Bookmark,
  Sparkles,
  Users,
  Clock,
  ArrowRight,
  Filter,
  PlusCircle,
} from 'lucide-react';

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Hackathon',
  'Research',
  'Startup',
  'Course Project',
  'Open Source',
  'Design',
  'Competition',
  'Society',
];

export const ProjectsBrowsePage: React.FC = () => {
  const { projects, users, toggleSaveProject, isProjectSaved } = useApp();
  const [searchParams] = useSearchParams();

  const urlCategory = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState('All');
  const [onlyOpen, setOnlyOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Mode filter
      if (selectedMode !== 'All' && p.collaborationMode !== selectedMode) {
        return false;
      }

      // Only open positions
      if (onlyOpen && p.openPositions <= 0) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchTagline = p.tagline.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchSkills = p.requiredSkills.some((s) => s.toLowerCase().includes(q));
        if (!matchTitle && !matchTagline && !matchDesc && !matchSkills) {
          return false;
        }
      }

      return true;
    });
  }, [projects, selectedCategory, selectedMode, onlyOpen, searchQuery]);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="relative mb-10 pb-6 border-b border-paper-border">
        <div className="absolute top-0 right-10 hidden md:block">
          <Tape variant="mint" width="w-28" rotate="-rotate-3" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="font-handwritten text-xl text-cobalt font-bold">
              ★ Active Campus Collaborations
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-ink-primary tracking-tight">
              BROWSE OPEN PROJECTS
            </h1>
            <p className="text-ink-secondary text-base">
              Join multidisciplinary teams tackling hackathons, university research, venture startups, and student capstones.
            </p>
          </div>

          <Link
            to="/create-project"
            className="inline-flex items-center space-x-1.5 px-5 py-3 bg-cobalt hover:bg-cobalt-hover text-white font-display font-bold text-sm tracking-tight shadow-[3px_3px_0px_#1D1D1B] self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Project</span>
          </Link>
        </div>

        {/* Search & Mode Filter */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, keywords or required skills (e.g. React, PyTorch, C++)..."
              className="w-full pl-11 pr-4 py-3 bg-[#FFFEFA] border-2 border-paper-border focus:border-cobalt outline-none font-medium text-sm text-ink-primary shadow-subtle placeholder:text-ink-muted transition-colors"
            />
          </div>

          <div className="md:col-span-4 flex gap-2">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="flex-1 p-3 bg-[#FFFEFA] border-2 border-paper-border text-xs font-bold text-ink-primary outline-none focus:border-cobalt shadow-subtle"
            >
              <option value="All">All Formats (In-person & Remote)</option>
              <option value="In-person">In-person Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote Only</option>
            </select>

            <button
              onClick={() => setOnlyOpen(!onlyOpen)}
              className={`px-3 py-2 border-2 text-xs font-bold whitespace-nowrap transition-colors ${
                onlyOpen
                  ? 'bg-scrapbook-yellow text-ink-primary border-ink-primary'
                  : 'bg-[#FFFEFA] text-ink-secondary border-paper-border hover:border-ink-secondary'
              }`}
            >
              Open Spots Only {onlyOpen && '✓'}
            </button>
          </div>
        </div>

        {/* Horizontal Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-5 pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-cobalt text-white border-cobalt shadow-[2px_2px_0px_#1D1D1B]'
                    : 'bg-[#FFFEFA] text-ink-primary border-paper-border hover:border-ink-secondary hover:bg-paper-bg'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Count */}
      <div className="flex items-center justify-between text-xs text-ink-secondary mb-6">
        <p>
          Found <strong>{filteredProjects.length}</strong> active collaboration project{filteredProjects.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => {
          const owner = users.find((u) => u.id === project.ownerId);
          const members = users.filter((u) => project.memberIds.includes(u.id));
          const isSaved = isProjectSaved(project.id);
          const rotation = idx % 2 === 0 ? '-rotate-[0.5deg]' : 'rotate-[0.5deg]';

          return (
            <div
              key={project.id}
              className={`bg-[#FFFEFA] border border-paper-border p-6 flex flex-col justify-between shadow-subtle hover:shadow-lifted hover:rotate-0 transition-all duration-300 relative group ${rotation}`}
            >
              {idx % 3 === 0 && (
                <div className="absolute -top-3 left-6">
                  <Tape variant="yellow" width="w-20" rotate="-rotate-2" />
                </div>
              )}

              <div>
                {/* Top Meta */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-cobalt-light text-cobalt border border-cobalt/20">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-semibold text-ink-secondary">
                      {project.collaborationMode}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSaveProject(project.id)}
                    className="p-1 text-ink-secondary hover:text-cobalt transition-colors"
                    aria-label="Save project"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isSaved ? 'fill-cobalt text-cobalt' : ''}`}
                    />
                  </button>
                </div>

                {/* Cover Image */}
                <Link to={`/project/${project.id}`}>
                  <div className="aspect-[16/10] overflow-hidden bg-[#ECE7DC] mb-4 border border-[#E6E0D5]">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Title */}
                <Link to={`/project/${project.id}`}>
                  <h3 className="font-display font-bold text-lg text-ink-primary hover:text-cobalt transition-colors line-clamp-2 leading-snug">
                    {project.title}
                  </h3>
                </Link>

                {/* Tagline */}
                <p className="text-xs text-ink-secondary mt-1.5 line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Required Skills */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {project.requiredSkills.slice(0, 4).map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] font-medium px-2 py-0.5 bg-paper-bg text-ink-primary border border-paper-border"
                    >
                      {sk}
                    </span>
                  ))}
                  {project.requiredSkills.length > 4 && (
                    <span className="text-[10px] text-ink-muted self-center">
                      +{project.requiredSkills.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Roster & Details CTA */}
              <div className="pt-4 mt-5 border-t border-paper-border flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center -space-x-2">
                    {members.slice(0, 3).map((m) => (
                      <img
                        key={m.id}
                        src={m.avatar}
                        alt={m.name}
                        title={m.name}
                        className="w-7 h-7 object-cover border-2 border-[#FFFEFA]"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-ink-secondary">
                    {project.openPositions > 0 ? (
                      <span className="text-cobalt font-bold">
                        {project.openPositions} spot{project.openPositions !== 1 ? 's' : ''} left
                      </span>
                    ) : (
                      'Roster full'
                    )}
                  </span>
                </div>

                <Link
                  to={`/project/${project.id}`}
                  className="text-xs font-display font-bold text-cobalt hover:underline flex items-center space-x-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

