import React from 'react';
import { Link } from 'react-router-dom';
import { Tape } from '../components/common/Tape';
import { StickyNote } from '../components/common/StickyNote';
import {
  Compass,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Rocket,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Header */}
      <div className="relative text-center max-w-3xl mx-auto space-y-4">
        <div className="absolute -top-6 right-1/4 hidden md:block">
          <Tape variant="yellow" width="w-28" rotate="rotate-4" />
        </div>

        <span className="font-handwritten text-2xl text-cobalt font-bold">
          ★ The Blueprint
        </span>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-ink-primary tracking-tight">
          HOW TEAMUP WORKS
        </h1>

        <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
          From a raw brainstorm over coffee to forming a verified multidisciplinary squad. Here is how ambitious students collaborate without red tape.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Pillar 1 */}
        <div className="bg-[#FFFEFA] border border-paper-border p-8 shadow-subtle relative rotate-[-0.5deg]">
          <div className="absolute -top-3 left-8">
            <Tape variant="mint" width="w-20" />
          </div>
          <span className="font-display font-black text-4xl text-cobalt block mb-3">01</span>
          <h3 className="font-display font-extrabold text-2xl text-ink-primary mb-2">
            Showcase What You Actually Build
          </h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            Resumes are stiff and outdated. On TeamUp, your profile is a live portfolio of previous hackathon builds, GitHub repositories, Figma design prototypes, and honest weekly availability.
          </p>
          <ul className="space-y-2 text-xs text-ink-primary">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cobalt" />
              <span>Link your real GitHub, portfolio and Twitter accounts</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cobalt" />
              <span>Highlight both core skills and experimental side interests</span>
            </li>
          </ul>
        </div>

        {/* Pillar 2 */}
        <div className="bg-[#FFFEFA] border border-paper-border p-8 shadow-subtle relative rotate-[0.5deg]">
          <div className="absolute -top-3 right-8">
            <Tape variant="yellow" width="w-20" />
          </div>
          <span className="font-display font-black text-4xl text-scrapbook-yellow block mb-3">02</span>
          <h3 className="font-display font-extrabold text-2xl text-ink-primary mb-2">
            Discover Interdisciplinary Synergy
          </h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            The best projects occur when engineering meets design and domain research. Our matching system identifies complementary talent pairs: e.g. pairing a systems programmer with an interaction designer.
          </p>
          <ul className="space-y-2 text-xs text-ink-primary">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cobalt" />
              <span>Personalized chemistry match scores with transparent factors</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cobalt" />
              <span>Filter by specific faculties across all university departments</span>
            </li>
          </ul>
        </div>

        {/* Pillar 3 */}
        <div className="bg-[#FFFEFA] border border-paper-border p-8 shadow-subtle relative rotate-[0.5deg]">
          <div className="absolute -top-3 left-8">
            <Tape variant="coral" width="w-20" />
          </div>
          <span className="font-display font-black text-4xl text-scrapbook-coral block mb-3">03</span>
          <h3 className="font-display font-extrabold text-2xl text-ink-primary mb-2">
            Targeted Rosters, Zero Ghosting
          </h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            Instead of shouting into chaotic Discord or WhatsApp group chats with 5,000 members, post explicit open positions with defined commitments, deliverable milestones, and deadline targets.
          </p>
          <ul className="space-y-2 text-xs text-ink-primary">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cobalt" />
              <span>Clear open positions counter with one-click application</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cobalt" />
              <span>Applicant reviews with explicit Accept/Decline status</span>
            </li>
          </ul>
        </div>

        {/* Pillar 4 */}
        <div className="bg-[#FFFEFA] border border-paper-border p-8 shadow-subtle relative rotate-[-0.5deg]">
          <div className="absolute -top-3 right-8">
            <Tape variant="neutral" width="w-20" />
          </div>
          <span className="font-display font-black text-4xl text-ink-primary block mb-3">04</span>
          <h3 className="font-display font-extrabold text-2xl text-ink-primary mb-2">
            Direct Local Messenger
          </h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-4">
            Kick off conversations directly from a teammate’s profile or application. Schedule a coffee chat at the library or jump into a weekend sprint without exchanging phone numbers prematurely.
          </p>
          <ul className="space-y-2 text-xs text-ink-primary">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cobalt" />
              <span>Real-time local message history saved in your browser</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cobalt" />
              <span>Full demo user switching to simulate both viewpoints</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Sticky Note Box */}
      <div className="max-w-xl mx-auto">
        <StickyNote color="yellow" rotate="-rotate-1">
          <p className="font-handwritten text-xl leading-relaxed text-center">
            "We built TeamUp because our best collegiate memories were born from late-night hackathons and dorm room whiteboarding sessions. Everyone deserves a great team."
          </p>
        </StickyNote>
      </div>

      {/* CTA Bottom */}
      <div className="text-center pt-8">
        <Link
          to="/explore"
          className="inline-flex items-center space-x-2 px-8 py-4 bg-cobalt hover:bg-cobalt-hover text-white font-display font-bold text-base shadow-[3px_3px_0px_#1D1D1B]"
        >
          <Compass className="w-5 h-5" />
          <span>Explore Campus Collaborators</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

