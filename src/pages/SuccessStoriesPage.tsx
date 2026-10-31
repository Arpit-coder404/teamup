import React from 'react';
import { Link } from 'react-router-dom';
import { Tape } from '../components/common/Tape';
import { StickyNote } from '../components/common/StickyNote';
import { CAMPUS_STORIES } from '../data/seedData';
import { Trophy, ArrowRight, Sparkles, Heart } from 'lucide-react';

export const SuccessStoriesPage: React.FC = () => {
  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="relative text-center max-w-3xl mx-auto space-y-3">
        <div className="absolute -top-6 left-1/4 hidden md:block">
          <Tape variant="yellow" width="w-28" rotate="-rotate-4" />
        </div>

        <span className="font-handwritten text-2xl text-cobalt font-bold">
          ★ Proven Outcomes
        </span>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-ink-primary tracking-tight">
          STUDENT SUCCESS STORIES
        </h1>

        <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
          Real teams that formed through TeamUp and went on to win hackathons, secure venture funding, and conduct groundbreaking academic research.
        </p>
      </div>

      {/* Stories Editorial Showcase */}
      <div className="space-y-12">
        {CAMPUS_STORIES.map((story, idx) => (
          <div
            key={story.id}
            className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-10 shadow-lifted relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            {/* Top Tape */}
            <div className="absolute -top-3 left-10">
              <Tape
                variant={idx % 2 === 0 ? 'yellow' : 'mint'}
                width="w-28"
                rotate={idx % 2 === 0 ? 'rotate-2' : '-rotate-2'}
              />
            </div>

            {/* Left Photo */}
            <div className="md:col-span-5 aspect-[4/3] overflow-hidden bg-[#ECE7DC] border-2 border-paper-border shadow-xs">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Story Details */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 bg-cobalt text-white">
                  {story.category}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-scrapbook-yellow text-ink-primary">
                  {story.year}
                </span>
                {story.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono text-ink-secondary px-2 py-0.5 bg-paper-bg border border-paper-border"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-ink-primary leading-tight">
                {story.title}
              </h2>

              <p className="text-sm sm:text-base text-ink-secondary italic leading-relaxed font-serif">
                {story.quote}
              </p>

              <div className="pt-2 border-t border-paper-border flex items-center justify-between text-xs">
                <span className="font-bold text-ink-primary">
                  Founding Team: <span className="text-cobalt">{story.team}</span>
                </span>
                <Link
                  to="/explore"
                  className="font-display font-bold text-cobalt hover:underline flex items-center space-x-1"
                >
                  <span>Meet Similar Builders →</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="text-center pt-8 max-w-xl mx-auto space-y-4">
        <h3 className="font-display font-extrabold text-2xl text-ink-primary">
          YOUR STORY COULD BE NEXT
        </h3>
        <p className="text-xs text-ink-secondary">
          Find people who match your ambition and turn your next idea into a reality.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center space-x-2 px-8 py-4 bg-cobalt hover:bg-cobalt-hover text-white font-display font-bold text-sm tracking-tight shadow-[3px_3px_0px_#1D1D1B]"
        >
          <span>Find Teammates</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

