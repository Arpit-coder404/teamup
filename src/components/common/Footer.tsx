import React from 'react';
import { Link } from 'react-router-dom';
import { Tape } from './Tape';
import { Heart, Sparkles, Compass, Users, FolderGit2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#171916] text-[#FFFEFA] pt-16 pb-12 mt-20 border-t-4 border-cobalt overflow-hidden">
      {/* Decorative Scrapbook Elements */}
      <div className="absolute top-0 right-16 -translate-y-1/2">
        <Tape variant="yellow" width="w-28" rotate="-rotate-3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-cobalt text-white flex items-center justify-center font-display font-black text-xl shadow-[2px_2px_0px_#F4D65E]">
                T
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                Team<span className="text-scrapbook-yellow">Up</span>
              </span>
            </div>
            <p className="font-display font-bold text-lg text-white/90">
              Good people build great things.
            </p>
            <p className="text-sm text-[#D8D0C3] leading-relaxed max-w-sm">
              A distinctive campus network designed to connect curious, ambitious university students across code, design, engineering, and research.
            </p>
            <div className="inline-block bg-[#242722] border border-white/10 px-3 py-1.5 rotate-[-1deg]">
              <span className="font-handwritten text-scrapbook-yellow text-base">
                ★ 100% Student-founded & Open for campus builders
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-scrapbook-yellow">
              Discovery
            </h4>
            <ul className="space-y-2 text-sm text-[#D8D0C3]">
              <li>
                <Link to="/explore" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-cobalt" />
                  <span>Find Teammates</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-cobalt" />
                  <span>Active Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-scrapbook-yellow">
              Collab Types
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Hackathons',
                'Startups',
                'Research',
                'Design Systems',
                'Course Projects',
                'Hardware',
                'Open Source',
              ].map((cat) => (
                <Link
                  key={cat}
                  to={`/projects?category=${encodeURIComponent(cat)}`}
                  className="text-xs px-2.5 py-1 bg-[#242722] hover:bg-cobalt text-[#E6E0D5] hover:text-white transition-colors border border-white/5"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-scrapbook-yellow">
              Get Involved
            </h4>
            <ul className="space-y-2 text-sm text-[#D8D0C3]">
              <li>
                <Link to="/create-project" className="hover:text-white transition-colors flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-scrapbook-yellow" />
                  <span>Post a Project</span>
                </Link>
              </li>
              <li>
                <Link to="/my-projects" className="hover:text-white transition-colors flex items-center space-x-1">
                  <FolderGit2 className="w-3.5 h-3.5 text-cobalt" />
                  <span>My Workspace</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} TeamUp Campus. Frontend prototype designed with scrapbook aesthetic.</p>
          <div className="flex items-center space-x-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-scrapbook-coral fill-scrapbook-coral" />
            <span>for student builders everywhere.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

