import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Tape } from '../components/common/Tape';
import { StickyNote } from '../components/common/StickyNote';
import { Polaroid } from '../components/common/Polaroid';
import {
  CurvedArrow,
  ScribbleUnderline,
  StarDoodle,
  SparkleDoodle,
  PaperClip,
} from '../components/common/Doodles';
import {
  Sparkles,
  ArrowRight,
  Users,
  Compass,
  CheckCircle2,
  Bookmark,
  Share2,
  Calendar,
  Layers,
  Award,
  Zap,
} from 'lucide-react';
import { POPULAR_SKILLS, CAMPUS_STORIES } from '../data/seedData';

export const LandingPage: React.FC = () => {
  const { projects, users, toggleSaveProject, isProjectSaved } = useApp();

  // Featured 4 opportunities
  const activeOpportunities = projects.slice(0, 4);
  const featuredBuilders = users.slice(0, 4);

  return (
    <div className="relative overflow-hidden">
      {/* =========================================================================
          HERO SECTION — Scrapbook × Creative Community × Editorial
      ========================================================================= */}
      <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-28">
        {/* Decorative corner tape */}
        <div className="absolute top-2 left-6 hidden md:block">
          <Tape variant="yellow" width="w-28" rotate="-rotate-6" />
        </div>
        <div className="absolute top-8 right-12 hidden md:block">
          <Tape variant="neutral" width="w-32" rotate="rotate-3" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Bold Editorial Headline */}
            <div className="lg:col-span-7 space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FFFEFA] border border-paper-border shadow-subtle -rotate-1">
                <span className="w-2 h-2 rounded-full bg-cobalt animate-ping" />
                <span className="font-sans text-xs font-bold tracking-wider uppercase text-ink-primary">
                  The University Collaborator Network
                </span>
                <span className="font-handwritten text-sm text-cobalt font-bold">
                  • Fall / Spring 2026-27
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight text-ink-primary">
                GOOD PEOPLE <br />
                BUILD <br />
                <span className="relative inline-block mt-1">
                  <span className="relative z-10 px-2 py-0.5 bg-scrapbook-yellow text-ink-primary -rotate-1 inline-block shadow-[3px_3px_0px_#1D1D1B]">
                    GREAT
                  </span>
                </span>{' '}
                THINGS.
              </h1>

              {/* Supporting Copy */}
              <p className="text-lg sm:text-xl text-ink-secondary leading-relaxed max-w-xl font-normal">
                Find teammates, collaborators and co-founders for your next big idea — right here on campus.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center space-x-2 px-7 py-4 bg-cobalt hover:bg-cobalt-hover text-white font-display font-bold text-base tracking-tight shadow-[3px_3px_0px_#1D1D1B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all group"
                >
                  <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                  <span>Find Your Team</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/create-project"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-4 bg-[#FFFEFA] hover:bg-white text-ink-primary font-display font-bold text-base border-2 border-ink-primary shadow-[3px_3px_0px_#1D1D1B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                >
                  <span>Post a Project</span>
                </Link>
              </div>

              {/* Handwritten micro-annotation */}
              <div className="relative pt-4 flex items-center space-x-3 text-ink-secondary">
                <CurvedArrow className="w-12 h-8 text-ink-secondary" />
                <span className="font-handwritten text-lg text-ink-primary leading-tight">
                  Over 160+ active campus collaborations happening right now!
                </span>
              </div>
            </div>

            {/* Right Column: Scrapbook Composition & Polaroid Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none pt-4 pb-8">
                
                {/* Paperclip top detail */}
                <div className="absolute -top-6 right-20 z-30">
                  <PaperClip />
                </div>

                {/* Main Large Photograph */}
                <div className="relative z-10 bg-[#FFFEFA] p-3 shadow-lifted border border-paper-border rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300">
                  <div className="absolute -top-3 left-1/3 -translate-x-1/2">
                    <Tape variant="yellow" width="w-24" rotate="rotate-2" />
                  </div>
                  <div className="overflow-hidden bg-[#ECE7DC] aspect-[4/3]">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                      alt="Students collaborating at hackathon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="pt-2.5 flex items-center justify-between text-xs text-ink-secondary">
                    <span className="font-handwritten text-base text-ink-primary font-bold">
                      Design Sprint Lab • Quad Room 304
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-cobalt">
                      HackMIT \'26 Prep
                    </span>
                  </div>
                </div>

                {/* Overlapping Polaroid 1 (Left / Bottom) */}
                <div className="absolute -bottom-10 -left-6 z-20 w-44 sm:w-52">
                  <Polaroid
                    image="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80"
                    alt="Students debugging code"
                    caption="Maya & Julian @ 2am ☕"
                    rotate="-rotate-6"
                    tapeVariant="coral"
                  />
                </div>

                {/* Overlapping Polaroid 2 (Right / Top-Behind) */}
                <div className="absolute -top-10 -right-4 sm:-right-8 z-0 w-40 sm:w-48 hidden sm:block">
                  <Polaroid
                    image="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80"
                    alt="Autonomous rover test"
                    caption="Mars Rover Test Day 🤖"
                    rotate="rotate-8"
                    tapeVariant="mint"
                  />
                </div>

                {/* Yellow Sticky Note with handwritten text */}
                <div className="absolute -bottom-8 right-2 sm:right-6 z-30 w-48 sm:w-56">
                  <StickyNote color="yellow" rotate="rotate-3" tape={true}>
                    <p className="font-handwritten text-lg leading-snug">
                      Projects. Hackathons. Startups. Research and more...
                    </p>
                    <span className="block mt-1 text-xs font-sans font-bold text-cobalt uppercase tracking-wider">
                      ★ All faculties welcome
                    </span>
                  </StickyNote>
                </div>

                {/* Hand-drawn Doodles */}
                <div className="absolute -bottom-14 left-1/2 z-10 hidden sm:block">
                  <StarDoodle size={28} color="#3457D5" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUST STRIP — Hand-drawn icons & key campus pillars
      ========================================================================= */}
      <section className="border-y border-paper-border bg-[#FFFEFA]/80 py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-start space-x-3.5 p-2">
              <div className="w-10 h-10 rounded-none bg-cobalt-light text-cobalt flex items-center justify-center flex-shrink-0 border border-cobalt/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-ink-primary">Smart Matching</h4>
                <p className="text-xs text-ink-secondary mt-0.5 leading-relaxed">
                  Transparent skill & goal compatibility algorithm for high-chemistry teams.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-2">
              <div className="w-10 h-10 rounded-none bg-scrapbook-yellow/40 text-ink-primary flex items-center justify-center flex-shrink-0 border border-scrapbook-yellow">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-ink-primary">Campus Community</h4>
                <p className="text-xs text-ink-secondary mt-0.5 leading-relaxed">
                  Connect across engineering, design, humanities, and business schools.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-2">
              <div className="w-10 h-10 rounded-none bg-scrapbook-green/40 text-[#2B5E36] flex items-center justify-center flex-shrink-0 border border-scrapbook-green">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-ink-primary">Projects & Hackathons</h4>
                <p className="text-xs text-ink-secondary mt-0.5 leading-relaxed">
                  Direct rosters for upcoming collegiate competitions and course capstones.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-2">
              <div className="w-10 h-10 rounded-none bg-scrapbook-coral/20 text-[#A63725] flex items-center justify-center flex-shrink-0 border border-scrapbook-coral/40">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-ink-primary">Build Together</h4>
                <p className="text-xs text-ink-secondary mt-0.5 leading-relaxed">
                  Form verified teams, review applicants, and turn ideas into tangible outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ACTIVE OPPORTUNITIES SECTION
      ========================================================================= */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-handwritten text-xl text-cobalt font-bold">
                  ★ Active Rosters
                </span>
                <span className="h-0.5 w-12 bg-cobalt inline-block" />
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary tracking-tight">
                ACTIVE COLLABORATION OPPORTUNITIES
              </h2>
              <p className="text-ink-secondary text-base max-w-xl">
                Real teams looking for specific talent right now. Apply in one click with your profile.
              </p>
            </div>

            <Link
              to="/projects"
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 font-display font-bold text-sm text-cobalt hover:text-cobalt-hover underline underline-offset-4"
            >
              <span>View all 12+ active projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Grid — distinctive scrapbook cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeOpportunities.map((project, idx) => {
              const owner = users.find((u) => u.id === project.ownerId);
              const members = users.filter((u) => project.memberIds.includes(u.id));
              const isSaved = isProjectSaved(project.id);
              const rotationClass = idx % 2 === 0 ? '-rotate-[0.5deg]' : 'rotate-[0.5deg]';

              return (
                <div
                  key={project.id}
                  className={`bg-[#FFFEFA] border border-paper-border p-5 flex flex-col justify-between shadow-subtle hover:shadow-lifted hover:rotate-0 transition-all duration-200 relative group ${rotationClass}`}
                >
                  {/* Decorative tape on alternate cards */}
                  {idx === 0 && (
                    <div className="absolute -top-3 right-6">
                      <Tape variant="yellow" width="w-20" rotate="rotate-2" />
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="absolute -top-3 left-6">
                      <Tape variant="mint" width="w-20" rotate="-rotate-2" />
                    </div>
                  )}

                  <div>
                    {/* Top Meta */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-cobalt-light text-cobalt border border-cobalt/20">
                        {project.category}
                      </span>
                      <button
                        onClick={() => toggleSaveProject(project.id)}
                        className="text-ink-secondary hover:text-cobalt transition-colors p-1"
                        aria-label="Save project"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isSaved ? 'fill-cobalt text-cobalt' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Image Thumbnail */}
                    <div className="aspect-[16/10] overflow-hidden bg-[#ECE7DC] mb-3 border border-[#E6E0D5]">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Title */}
                    <Link to={`/project/${project.id}`}>
                      <h3 className="font-display font-bold text-lg text-ink-primary hover:text-cobalt transition-colors line-clamp-2 leading-snug">
                        {project.title}
                      </h3>
                    </Link>

                    {/* Tagline / Snippet */}
                    <p className="text-xs text-ink-secondary mt-1.5 line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Required Skills Chips */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.requiredSkills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-medium px-1.5 py-0.5 bg-paper-bg text-ink-primary border border-paper-border"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.requiredSkills.length > 3 && (
                        <span className="text-[10px] text-ink-muted self-center">
                          +{project.requiredSkills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Roster & Open Spots */}
                  <div className="pt-4 mt-4 border-t border-paper-border flex items-center justify-between">
                    {/* Member Avatars */}
                    <div className="flex items-center -space-x-2">
                      {members.slice(0, 3).map((m) => (
                        <img
                          key={m.id}
                          src={m.avatar}
                          alt={m.name}
                          title={m.name}
                          className="w-7 h-7 rounded-none object-cover border-2 border-[#FFFEFA] shadow-xs"
                        />
                      ))}
                      {project.openPositions > 0 && (
                        <span
                          className="w-7 h-7 bg-scrapbook-yellow text-ink-primary text-[10px] font-bold flex items-center justify-center border-2 border-[#FFFEFA]"
                          title={`${project.openPositions} open position(s)`}
                        >
                          +{project.openPositions}
                        </span>
                      )}
                    </div>

                    {/* Action link */}
                    <Link
                      to={`/project/${project.id}`}
                      className="text-xs font-display font-bold text-cobalt hover:underline flex items-center space-x-1"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW TEAMUP WORKS — Editorial Scrapbook Walkthrough
      ========================================================================= */}
      <section className="py-20 bg-[#F4EFE4]/60 border-y border-paper-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-handwritten text-2xl text-cobalt font-bold">
              ★ The Collaborative Method
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary tracking-tight">
              HOW TEAMUP TURNS IDEAS INTO REALITY
            </h2>
            <p className="text-ink-secondary text-base">
              A frictionless workflow built around mutual interests, clear roles, and genuine student ambition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="relative bg-[#FFFEFA] p-6 border border-paper-border shadow-subtle rotate-[-1deg]">
              <div className="absolute -top-3 left-6">
                <Tape variant="yellow" width="w-20" />
              </div>
              <div className="font-display font-black text-4xl text-cobalt mb-3">01</div>
              <h3 className="font-display font-bold text-xl text-ink-primary mb-2">
                Create Your Builder Profile
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Showcase your real skills, past hacks, GitHub repositories, and availability. Share what projects make your eyes light up.
              </p>
              <div className="mt-4 pt-3 border-t border-paper-border flex items-center text-xs text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-cobalt mr-1.5" />
                <span>Zero corporate resume fluff</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-[#FFFEFA] p-6 border border-paper-border shadow-subtle rotate-[1deg]">
              <div className="absolute -top-3 left-6">
                <Tape variant="mint" width="w-20" />
              </div>
              <div className="font-display font-black text-4xl text-scrapbook-greenDark mb-3">02</div>
              <h3 className="font-display font-bold text-xl text-ink-primary mb-2">
                Discover Complementary Partners
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Filter by academic department, specific frameworks, or competition tracks. Our compatibility tool highlights mutual skill synergies.
              </p>
              <div className="mt-4 pt-3 border-t border-paper-border flex items-center text-xs text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-scrapbook-greenDark mr-1.5" />
                <span>Designer + Engineer + Researcher matches</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-[#FFFEFA] p-6 border border-paper-border shadow-subtle rotate-[-0.5deg]">
              <div className="absolute -top-3 left-6">
                <Tape variant="coral" width="w-20" />
              </div>
              <div className="font-display font-black text-4xl text-scrapbook-coral mb-3">03</div>
              <h3 className="font-display font-bold text-xl text-ink-primary mb-2">
                Assemble & Ship Real Things
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Post open positions on your project or apply with a quick note. Accept applicants, chat directly, and lock down your team roster.
              </p>
              <div className="mt-4 pt-3 border-t border-paper-border flex items-center text-xs text-ink-secondary">
                <CheckCircle2 className="w-4 h-4 text-scrapbook-coral mr-1.5" />
                <span>Seamless team formation</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED STUDENT COLLABORATORS — Discover People Teaser
      ========================================================================= */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2">
              <span className="font-handwritten text-xl text-cobalt font-bold">
                ★ Campus Talent Spotlight
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary tracking-tight">
                FEATURED STUDENT COLLABORATORS
              </h2>
              <p className="text-ink-secondary text-base max-w-xl">
                Designers, hackers, and researchers open to collaborating on ambitious campus projects.
              </p>
            </div>

            <Link
              to="/explore"
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 font-display font-bold text-sm text-cobalt hover:text-cobalt-hover underline underline-offset-4"
            >
              <span>Explore all {users.length} student profiles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBuilders.map((builder, idx) => {
              const rotate = idx % 2 === 0 ? '-rotate-1' : 'rotate-1';
              return (
                <div
                  key={builder.id}
                  className={`bg-[#FFFEFA] border border-paper-border p-5 shadow-subtle hover:shadow-lifted hover:rotate-0 transition-all duration-300 flex flex-col justify-between ${rotate}`}
                >
                  <div>
                    {/* Header with avatar & year */}
                    <div className="flex items-start space-x-3.5 mb-3.5">
                      <img
                        src={builder.avatar}
                        alt={builder.name}
                        className="w-14 h-14 object-cover border-2 border-paper-border shadow-xs"
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/profile/${builder.id}`}
                          className="font-display font-bold text-base text-ink-primary hover:text-cobalt transition-colors truncate block"
                        >
                          {builder.name}
                        </Link>
                        <p className="text-xs text-ink-secondary truncate">{builder.year}</p>
                        <span className="text-[10px] uppercase font-bold text-cobalt bg-cobalt-light px-1.5 py-0.2 inline-block mt-1">
                          {builder.department.split('&')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Bio snippet */}
                    <p className="text-xs text-ink-secondary line-clamp-3 leading-relaxed mb-4">
                      "{builder.bio}"
                    </p>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {builder.skills.slice(0, 3).map((sk) => (
                        <span
                          key={sk}
                          className="text-[10px] font-medium px-2 py-0.5 bg-paper-bg text-ink-primary border border-paper-border"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 border-t border-paper-border flex items-center justify-between">
                    <span className="font-handwritten text-xs text-ink-secondary">
                      {builder.availability}
                    </span>
                    <Link
                      to={`/profile/${builder.id}`}
                      className="text-xs font-display font-bold text-cobalt hover:underline flex items-center space-x-1"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          POPULAR SKILLS CLOUD — Interactive Discovery Quick Filter
      ========================================================================= */}
      <section className="py-14 bg-[#FFFEFA] border-y border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xs">
              <span className="font-handwritten text-lg text-cobalt font-bold">
                ★ In-Demand Abilities
              </span>
              <h3 className="font-display font-extrabold text-2xl text-ink-primary">
                POPULAR SKILLS ON CAMPUS
              </h3>
              <p className="text-xs text-ink-secondary mt-1">
                Click any discipline to instantly discover student builders with that expertise.
              </p>
            </div>

            <div className="flex-1 flex flex-wrap gap-2 justify-start md:justify-end">
              {POPULAR_SKILLS.map((skill, i) => (
                <Link
                  key={skill}
                  to={`/explore?skill=${encodeURIComponent(skill)}`}
                  className={`text-xs font-semibold px-3 py-1.5 border border-paper-border hover:border-ink-primary hover:bg-scrapbook-yellow transition-all ${
                    i % 3 === 0 ? '-rotate-1 bg-[#FBF9F4]' : 'rotate-1 bg-white'
                  }`}
                >
                  #{skill}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STUDENT SUCCESS STORIES — Editorial Testimonials
      ========================================================================= */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="font-handwritten text-2xl text-cobalt font-bold">
              ★ Proven Outcomes
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary tracking-tight">
              STORIES FROM THE SPRINT
            </h2>
            <p className="text-ink-secondary text-base">
              From late night dormitory pizza to funded startups and national trophy podiums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAMPUS_STORIES.map((story, idx) => (
              <div
                key={story.id}
                className="bg-[#FFFEFA] border border-paper-border p-5 shadow-subtle flex flex-col justify-between relative group"
              >
                {/* Washi tape header */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Tape
                    variant={idx === 0 ? 'yellow' : idx === 1 ? 'mint' : 'coral'}
                    width="w-24"
                    rotate={idx % 2 === 0 ? '-rotate-2' : 'rotate-2'}
                  />
                </div>

                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-[#ECE7DC] mb-4 border border-[#E6E0D5]">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-cobalt bg-cobalt-light px-2 py-0.5 inline-block mb-2">
                    {story.category} • {story.year}
                  </span>

                  <h3 className="font-display font-bold text-lg text-ink-primary mb-2 leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-ink-secondary italic leading-relaxed mb-4">
                    {story.quote}
                  </p>
                </div>

                <div className="pt-3 border-t border-paper-border flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink-primary">{story.team}</span>
                  <span className="text-cobalt font-display font-bold">Read Story →</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          FINAL CALL TO ACTION BANNER — Scrapbook Manifesto
      ========================================================================= */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#FFFEFA] border-2 border-ink-primary p-8 sm:p-12 shadow-[6px_6px_0px_#1D1D1B] text-center space-y-6 rotate-[-0.5deg]">
            
            {/* Top Washi Tape */}
            <div className="absolute -top-4 left-12">
              <Tape variant="yellow" width="w-32" rotate="-rotate-3" />
            </div>
            <div className="absolute -top-4 right-12">
              <Tape variant="coral" width="w-28" rotate="rotate-4" />
            </div>

            <span className="font-handwritten text-2xl text-cobalt font-bold block">
              ★ Don\'t build in isolation.
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-ink-primary leading-tight tracking-tight">
              HAVE AN IDEA? <br />
              <span className="bg-scrapbook-yellow px-2 py-0.5 inline-block shadow-sm">
                FIND YOUR SQUAD
              </span>{' '}
              TODAY.
            </h2>

            <p className="text-base sm:text-lg text-ink-secondary max-w-xl mx-auto font-normal">
              Whether you are gearing up for HackHarvard, filing a patent, or building a weekend SaaS, the right collaborator is just across the quad.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/explore"
                className="w-full sm:w-auto px-8 py-4 bg-cobalt hover:bg-cobalt-hover text-white font-display font-bold text-base shadow-[3px_3px_0px_#1D1D1B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                Find Teammates Now
              </Link>
              <Link
                to="/create-project"
                className="w-full sm:w-auto px-8 py-4 bg-paper-bg hover:bg-white text-ink-primary font-display font-bold text-base border-2 border-ink-primary shadow-[3px_3px_0px_#1D1D1B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                Post an Opportunity
              </Link>
            </div>

            {/* Handwritten stamp */}
            <div className="pt-4">
              <span className="font-handwritten text-lg text-scrapbook-coral font-bold inline-block rotate-2">
                ~ 100% free for all registered university students ~
              </span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

