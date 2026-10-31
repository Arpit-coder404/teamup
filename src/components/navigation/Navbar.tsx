import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Compass,
  FolderGit2,
  MessageSquare,
  PlusCircle,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  BookOpen,
  Trophy,
  RotateCcw,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, users, switchUser, applications, resetAllData } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Count pending applications where current user is project owner
  const pendingOwnerApplications = applications.filter((app) => app.status === 'Pending').length;

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F3EA]/95 backdrop-blur-md border-b border-paper-border transition-all">
      {/* Top Banner Notice for Demo */}
      <div className="bg-[#171916] text-[#FFFEFA] text-xs py-1.5 px-4 font-sans tracking-wide flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-scrapbook-yellow animate-pulse" />
            <span className="font-medium">
              Demo Environment: <span className="text-[#D8D0C3]">Experience campus matchmaking in real-time</span>
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <button
              onClick={resetAllData}
              className="text-[#E6E0D5] hover:text-scrapbook-yellow underline flex items-center space-x-1"
              title="Reset all demo profiles and projects"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo State</span>
            </button>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-white/60">Active: <strong>{currentUser.name}</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-cobalt text-[#FFFEFA] flex items-center justify-center font-display font-black text-xl rounded-none shadow-[2px_2px_0px_#1D1D1B] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
              T
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-display font-extrabold text-2xl tracking-tight text-ink-primary">
                  Team<span className="text-cobalt">Up</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 bg-scrapbook-yellow text-ink-primary -rotate-2">
                  Campus
                </span>
              </div>
              <span className="font-handwritten text-xs text-ink-secondary -mt-1 hidden sm:block">
                good people build great things
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/explore"
              className={`px-3 py-2 text-sm font-semibold tracking-tight transition-all rounded-sm flex items-center space-x-1.5 ${
                isActive('/explore')
                  ? 'text-cobalt bg-cobalt-light font-bold'
                  : 'text-ink-primary hover:text-cobalt hover:bg-black/5'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Discover People</span>
            </Link>

            <Link
              to="/projects"
              className={`px-3 py-2 text-sm font-semibold tracking-tight transition-all rounded-sm flex items-center space-x-1.5 ${
                isActive('/projects') && !location.pathname.startsWith('/my-projects')
                  ? 'text-cobalt bg-cobalt-light font-bold'
                  : 'text-ink-primary hover:text-cobalt hover:bg-black/5'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Browse Projects</span>
            </Link>

            <Link
              to="/how-it-works"
              className={`px-3 py-2 text-sm font-semibold tracking-tight transition-all rounded-sm flex items-center space-x-1.5 ${
                isActive('/how-it-works')
                  ? 'text-cobalt bg-cobalt-light font-bold'
                  : 'text-ink-primary hover:text-cobalt hover:bg-black/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>How It Works</span>
            </Link>

            <Link
              to="/stories"
              className={`px-3 py-2 text-sm font-semibold tracking-tight transition-all rounded-sm flex items-center space-x-1.5 ${
                isActive('/stories')
                  ? 'text-cobalt bg-cobalt-light font-bold'
                  : 'text-ink-primary hover:text-cobalt hover:bg-black/5'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Success Stories</span>
            </Link>

            <Link
              to="/my-projects"
              className={`px-3 py-2 text-sm font-semibold tracking-tight transition-all rounded-sm flex items-center space-x-1.5 ${
                isActive('/my-projects')
                  ? 'text-cobalt bg-cobalt-light font-bold'
                  : 'text-ink-primary hover:text-cobalt hover:bg-black/5'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>My Projects</span>
              {pendingOwnerApplications > 0 && (
                <span className="w-4 h-4 rounded-full bg-scrapbook-coral text-white text-[10px] font-bold flex items-center justify-center">
                  {pendingOwnerApplications}
                </span>
              )}
            </Link>

            <Link
              to="/messages"
              className={`px-3 py-2 text-sm font-semibold tracking-tight transition-all rounded-sm flex items-center space-x-1.5 ${
                isActive('/messages')
                  ? 'text-cobalt bg-cobalt-light font-bold'
                  : 'text-ink-primary hover:text-cobalt hover:bg-black/5'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Demo User Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 pr-2.5 bg-[#FFFEFA] border border-paper-border hover:border-ink-secondary transition-all shadow-subtle group text-left"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-none object-cover border border-[#E6E0D5]"
                />
                <div className="flex flex-col text-left leading-none">
                  <span className="text-xs font-bold text-ink-primary truncate max-w-[100px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-ink-secondary truncate max-w-[100px]">
                    {currentUser.handle}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-ink-secondary group-hover:text-ink-primary transition-transform" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-[#FFFEFA] border border-paper-border shadow-lifted z-50 p-2 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-2 py-1.5 border-b border-paper-border mb-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-ink-secondary">
                      Switch Demo Role
                    </p>
                    <p className="text-xs text-ink-muted">
                      Test applicant vs project owner view
                    </p>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1 py-1">
                    {users.slice(0, 6).map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUser(u.id);
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full flex items-center space-x-2.5 px-2 py-1.5 text-left text-xs transition-colors ${
                          u.id === currentUser.id
                            ? 'bg-cobalt-light text-cobalt font-bold'
                            : 'hover:bg-paper-bg text-ink-primary'
                        }`}
                      >
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-6 h-6 object-cover border border-[#E6E0D5]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{u.name}</p>
                          <p className="text-[10px] text-ink-secondary truncate">{u.department.split('&')[0]}</p>
                        </div>
                        {u.id === currentUser.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-paper-border pt-1.5 mt-1">
                    <Link
                      to={`/profile/${currentUser.id}`}
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-2 py-1.5 text-xs text-cobalt hover:underline font-semibold"
                    >
                      View My Profile →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Post a Project CTA */}
            <Link
              to="/create-project"
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-cobalt hover:bg-cobalt-hover text-[#FFFEFA] font-display font-bold text-sm tracking-tight shadow-[2px_2px_0px_#1D1D1B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Project</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              to="/create-project"
              className="p-2 bg-cobalt text-white shadow-sm"
              title="Post a Project"
            >
              <PlusCircle className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink-primary hover:bg-black/5 border border-paper-border bg-[#FFFEFA]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-paper-border bg-[#FFFEFA] px-4 pt-3 pb-6 space-y-3 shadow-lifted animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center space-x-3 p-3 bg-paper-bg border border-paper-border mb-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 object-cover border border-[#E6E0D5]"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-ink-primary">{currentUser.name}</p>
              <p className="text-xs text-ink-secondary truncate">{currentUser.headline}</p>
            </div>
            <Link
              to={`/profile/${currentUser.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-cobalt font-bold underline"
            >
              Profile
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 border ${
                isActive('/explore') ? 'bg-cobalt text-white border-cobalt' : 'border-paper-border hover:bg-paper-bg'
              } flex items-center space-x-2`}
            >
              <Compass className="w-4 h-4" />
              <span>Discover</span>
            </Link>
            <Link
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 border ${
                isActive('/projects') && !location.pathname.startsWith('/my-projects')
                  ? 'bg-cobalt text-white border-cobalt'
                  : 'border-paper-border hover:bg-paper-bg'
              } flex items-center space-x-2`}
            >
              <Users className="w-4 h-4" />
              <span>Projects</span>
            </Link>
            <Link
              to="/my-projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 border ${
                isActive('/my-projects') ? 'bg-cobalt text-white border-cobalt' : 'border-paper-border hover:bg-paper-bg'
              } flex items-center space-x-2`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>My Projects</span>
            </Link>
            <Link
              to="/messages"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 border ${
                isActive('/messages') ? 'bg-cobalt text-white border-cobalt' : 'border-paper-border hover:bg-paper-bg'
              } flex items-center space-x-2`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 border ${
                isActive('/how-it-works') ? 'bg-cobalt text-white border-cobalt' : 'border-paper-border hover:bg-paper-bg'
              } flex items-center space-x-2`}
            >
              <BookOpen className="w-4 h-4" />
              <span>How It Works</span>
            </Link>
            <Link
              to="/stories"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 border ${
                isActive('/stories') ? 'bg-cobalt text-white border-cobalt' : 'border-paper-border hover:bg-paper-bg'
              } flex items-center space-x-2`}
            >
              <Trophy className="w-4 h-4" />
              <span>Stories</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-paper-border">
            <p className="text-xs font-bold text-ink-secondary uppercase mb-2">
              Quick switch demo user:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {users.slice(0, 4).map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    switchUser(u.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs px-2 py-1 border ${
                    u.id === currentUser.id
                      ? 'bg-cobalt text-white border-cobalt'
                      : 'bg-paper-bg text-ink-primary border-paper-border'
                  }`}
                >
                  {u.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

