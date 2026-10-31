import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProjectCategory, CommitmentLevel, CollaborationMode } from '../types';
import { Tape } from '../components/common/Tape';
import { StickyNote } from '../components/common/StickyNote';
import { Plus, X, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const CATEGORIES: ProjectCategory[] = [
  'Hackathon',
  'Research',
  'Startup',
  'Course Project',
  'Open Source',
  'Design',
  'Competition',
  'Society',
];

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80',
];

export const CreateProject: React.FC = () => {
  const { createProject, currentUser } = useApp();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Hackathon');
  const [description, setDescription] = useState('');
  const [goals, setGoals] = useState<string[]>([
    'Build and validate working MVP prototype',
    'Present during campus demo showcase',
  ]);
  const [newGoalInput, setNewGoalInput] = useState('');

  const [requiredSkills, setRequiredSkills] = useState<string[]>(['React', 'Figma', 'TypeScript']);
  const [newSkillInput, setNewSkillInput] = useState('');

  const [teamSize, setTeamSize] = useState<number>(4);
  const [openPositions, setOpenPositions] = useState<number>(2);
  const [duration, setDuration] = useState('3 Months');
  const [commitment, setCommitment] = useState<CommitmentLevel>('Medium (10-20 hrs/wk)');
  const [collaborationMode, setCollaborationMode] = useState<CollaborationMode>('Hybrid');
  const [applicationDeadline, setApplicationDeadline] = useState('2026-11-30');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0]);
  const [tags, setTags] = useState<string[]>(['Hackathon', 'Collab']);

  const handleAddGoal = () => {
    if (newGoalInput.trim()) {
      setGoals([...goals, newGoalInput.trim()]);
      setNewGoalInput('');
    }
  };

  const handleRemoveGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !requiredSkills.includes(newSkillInput.trim())) {
      setRequiredSkills([...requiredSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setRequiredSkills(requiredSkills.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    const newProject = createProject({
      title: title.trim(),
      tagline: tagline.trim() || title.trim(),
      category,
      description: description.trim(),
      goals: goals.length > 0 ? goals : ['Build and ship great outcomes together'],
      requiredSkills,
      teamSize,
      openPositions,
      duration,
      commitment,
      collaborationMode,
      applicationDeadline,
      coverImage,
      tags: [category, ...requiredSkills.slice(0, 2)],
    });

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    // Redirect to project details
    navigate(`/project/${newProject.id}`);
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <div className="relative mb-10 pb-6 border-b border-paper-border text-center space-y-3">
        <div className="absolute top-0 right-4 hidden sm:block">
          <Tape variant="yellow" width="w-28" rotate="rotate-3" />
        </div>

        <span className="font-handwritten text-2xl text-cobalt font-bold block">
          ★ Assemble your dream squad
        </span>

        <h1 className="font-display font-black text-3xl sm:text-5xl text-ink-primary tracking-tight">
          LET'S BUILD SOMETHING AMAZING.
        </h1>

        <p className="text-sm sm:text-base text-ink-secondary max-w-lg mx-auto">
          Post an open collaboration opportunity for student hackers, researchers, designers, and builders across campus.
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Step 1: Project Identity */}
        <div className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-8 shadow-subtle relative rotate-[-0.3deg]">
          <div className="absolute -top-3 left-8">
            <Tape variant="mint" width="w-24" />
          </div>

          <h3 className="font-display font-bold text-lg text-ink-primary mb-4 flex items-center space-x-2">
            <span className="w-6 h-6 bg-cobalt text-white flex items-center justify-center text-xs font-bold">1</span>
            <span>Project Overview</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                Project Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. EchoPulse: Neurodivergent Ambient Companion"
                className="w-full p-3 bg-paper-bg border border-paper-border text-sm font-semibold text-ink-primary outline-none focus:border-cobalt shadow-xs"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  Tagline / Pitch (one sentence)
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Ambient binaural audio with task micro-scaffolding for deep study."
                  className="w-full p-3 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                  className="w-full p-3 bg-paper-bg border border-paper-border text-xs font-bold text-ink-primary outline-none focus:border-cobalt"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                Detailed Description & Context *
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the problem you are solving, why you are building this, and what the team will ship together..."
                className="w-full p-3 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary leading-relaxed outline-none focus:border-cobalt"
                required
              />
            </div>
          </div>
        </div>

        {/* Step 2: Milestones & Goals */}
        <div className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-8 shadow-subtle relative rotate-[0.3deg]">
          <div className="absolute -top-3 right-8">
            <Tape variant="yellow" width="w-24" />
          </div>

          <h3 className="font-display font-bold text-lg text-ink-primary mb-4 flex items-center space-x-2">
            <span className="w-6 h-6 bg-cobalt text-white flex items-center justify-center text-xs font-bold">2</span>
            <span>Target Goals & Milestones</span>
          </h3>

          <div className="space-y-3">
            <p className="text-xs text-ink-secondary">
              What will this team accomplish? Clear goals attract focused, motivated collaborators.
            </p>

            <div className="space-y-2">
              {goals.map((g, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2.5 bg-paper-bg border border-paper-border text-xs text-ink-primary"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cobalt flex-shrink-0" />
                    <span>{g}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveGoal(index)}
                    className="text-ink-secondary hover:text-scrapbook-coral p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newGoalInput}
                onChange={(e) => setNewGoalInput(e.target.value)}
                placeholder="Add a milestone (e.g. Test with 20 student beta testers)..."
                className="flex-1 p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary outline-none focus:border-cobalt"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddGoal();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddGoal}
                className="px-4 py-2 bg-paper-bg border border-paper-border hover:bg-white text-xs font-bold text-ink-primary"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: Required Roles & Skills */}
        <div className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-8 shadow-subtle relative rotate-[-0.2deg]">
          <h3 className="font-display font-bold text-lg text-ink-primary mb-4 flex items-center space-x-2">
            <span className="w-6 h-6 bg-cobalt text-white flex items-center justify-center text-xs font-bold">3</span>
            <span>Team Roster & Required Skills</span>
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  Total Team Target Size
                </label>
                <input
                  type="number"
                  min={2}
                  max={12}
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value) || 2)}
                  className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-bold text-ink-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  Open Positions Currently Recruiting
                </label>
                <input
                  type="number"
                  min={1}
                  max={teamSize - 1}
                  value={openPositions}
                  onChange={(e) => setOpenPositions(parseInt(e.target.value) || 1)}
                  className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-bold text-ink-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                Required Technical & Creative Skills
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {requiredSkills.map((sk) => (
                  <span
                    key={sk}
                    className="inline-flex items-center space-x-1.5 text-xs px-2.5 py-1 bg-cobalt-light text-cobalt font-bold border border-cobalt/30"
                  >
                    <span>{sk}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(sk)}
                      className="hover:text-scrapbook-coral text-cobalt"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="Type a skill (e.g. PyTorch, UI Design, Rust, ROS2)..."
                  className="flex-1 p-2.5 bg-paper-bg border border-paper-border text-xs font-medium"
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
                  className="px-4 py-2 bg-paper-bg border border-paper-border hover:bg-white text-xs font-bold text-ink-primary"
                >
                  Add Skill
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Logistics & Cover Image */}
        <div className="bg-[#FFFEFA] border border-paper-border p-6 sm:p-8 shadow-subtle relative rotate-[0.2deg]">
          <h3 className="font-display font-bold text-lg text-ink-primary mb-4 flex items-center space-x-2">
            <span className="w-6 h-6 bg-cobalt text-white flex items-center justify-center text-xs font-bold">4</span>
            <span>Format, Schedule & Imagery</span>
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  Expected Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. Weekend Sprint, 3 Months, Capstone"
                  className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  Weekly Commitment
                </label>
                <select
                  value={commitment}
                  onChange={(e) => setCommitment(e.target.value as CommitmentLevel)}
                  className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary"
                >
                  <option value="Low (<10 hrs/wk)">Low (&lt;10 hrs/wk)</option>
                  <option value="Medium (10-20 hrs/wk)">Medium (10-20 hrs/wk)</option>
                  <option value="High (20+ hrs/wk)">High (20+ hrs/wk)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                  Collaboration Mode
                </label>
                <select
                  value={collaborationMode}
                  onChange={(e) => setCollaborationMode(e.target.value as CollaborationMode)}
                  className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary"
                >
                  <option value="In-person">In-person</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1">
                Application Deadline
              </label>
              <input
                type="date"
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
                className="w-full p-2.5 bg-paper-bg border border-paper-border text-xs font-medium text-ink-primary"
              />
            </div>

            {/* Choose Cover Photo */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-2">
                Choose Cover Photography
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_COVERS.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCoverImage(imgUrl)}
                    className={`aspect-video overflow-hidden border-2 transition-all ${
                      coverImage === imgUrl
                        ? 'border-cobalt ring-2 ring-cobalt/30 scale-102'
                        : 'border-paper-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Cover preview" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-ink-secondary">
            Posted as <strong>{currentUser.name}</strong> ({currentUser.handle})
          </div>

          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 sm:flex-none px-6 py-3 border border-paper-border bg-[#FFFEFA] text-xs font-bold text-ink-secondary hover:text-ink-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none px-8 py-3 bg-cobalt hover:bg-cobalt-hover text-white font-display font-bold text-sm tracking-tight shadow-[3px_3px_0px_#1D1D1B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Project</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

