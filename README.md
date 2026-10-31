# TeamUp — Good People Build Great Things

> **Find teammates, collaborators and co-founders for your next big idea — right here on campus.**

TeamUp is a campus collaboration and teammate discovery platform tailored for university students looking for partners in hackathons, collegiate research, startup ventures, design systems, course capstones, and creative open-source projects.

Unlike generic directories or social media clones, TeamUp is designed around an **Editorial Scrapbook × Creative Community** aesthetic with tactile textures, washi tape details, sticky notes, Polaroid photography frames, and transparent skill-chemistry recommendations.

---

## ✨ Features

- **🎨 Editorial Scrapbook Aesthetic**: Warm paper-like backgrounds (`#F7F3EA`, `#FFFEFA`), tactile washi tapes, sticky notes, hand-drawn vector doodles, and Polaroid photo cards with authentic student collaboration visuals.
- **🔍 Smart Teammate Discovery (`/explore`)**: Discover student builders with instant search, horizontal category filters (*Hackathons*, *Startups*, *Research*, *Design*, etc.), and granular discipline/year/availability filters.
- **⚡ Heuristic Chemistry Score**: Instant calculation of mutual skill overlap, design + developer pairing synergy, shared passions, and schedule compatibility with transparent rationale.
- **💼 Student Builder Profiles (`/profile/:id`)**: Rich portfolio cards showcasing previous builds, repository links, campus awards, and live profile editing with instant persistence.
- **🚀 Open Collaboration Projects (`/projects` & `/create-project`)**: Post multidisciplinary project rosters with specific roles, deliverables milestones, weekly commitments, and deadlines.
- **📝 Real-time Application Workflow (`/project/:id`)**: One-click application modal with contribution notes, availability, and portfolio links. Prevents duplicate applications automatically.
- **📋 Project Lead Review Portal (`/applications`)**: Review applicant backgrounds, accept candidates (which automatically joins them to the roster and updates open spots), or decline applications.
- **💬 Direct Campus Messenger (`/messages`)**: Conversational chat interface between demo students with persistent local chat histories. Deep-linkable from any user card.
- **📁 Personal Workspace (`/my-projects`)**: Unified dashboard tracking *Created Projects*, *Joined Teams*, *My Applications*, and *Saved Projects*.
- **🎭 Multi-User Demo Switcher**: Switch between 16 realistic student profiles (designers, systems hackers, robotics captains, and bio researchers) to experience both applicant and owner viewpoints.
- **💾 LocalStorage Persistence**: All profile edits, created projects, applications, and messages survive browser refreshes. Includes a 1-click **Reset Demo State** button.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Utilities**: [date-fns](https://date-fns.org/)
- **Celebration Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Typography**: Plus Jakarta Sans, DM Sans, Caveat (via Google Fonts)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or newer) installed.

### Installation

```bash
# Clone the repository
git clone https://github.com/Arpit-coder404/teamup.git

# Navigate to the project directory
cd teamup

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Type check and build optimized static assets
npm run build

# Preview the production build locally
npm run preview
```

---

## 📂 Project Architecture

```
src/
├── components/
│   ├── common/         # Tape, StickyNote, Polaroid, Doodles, ToastContainer
│   └── navigation/     # Navbar, Footer, Mobile Drawer Menu
├── context/
│   └── AppContext.tsx  # Centralized LocalStorage state, actions, compatibility logic
├── data/
│   └── seedData.ts     # 16 student profiles, 12 projects, sample apps & messages
├── pages/
│   ├── LandingPage.tsx          # Hero scrapbook, opportunities, how it works, stories
│   ├── ExplorePage.tsx          # Teammate discovery, search, filters & matching
│   ├── StudentProfile.tsx       # Student portfolio, achievements & live editing
│   ├── ProjectsBrowsePage.tsx   # All open project rosters & category filtering
│   ├── ProjectDetails.tsx       # Project overview & Apply to Join modal
│   ├── CreateProject.tsx        # Structured 4-step project creation form
│   ├── Applications.tsx         # Project lead application review & accept/reject
│   ├── Messages.tsx             # Conversational direct messenger
│   ├── MyProjects.tsx           # Workspace for created, joined & saved projects
│   ├── HowItWorksPage.tsx       # Walkthrough of the collaborative model
│   └── SuccessStoriesPage.tsx   # Editorial campus success stories
├── types/
│   └── index.ts        # Comprehensive TypeScript interfaces
├── App.tsx             # Router configuration & app layout
├── index.css           # Custom paper textures, washi tape clip-paths & highlighter styles
└── main.tsx            # Vite entry point
```

---

## 📜 License

MIT License. Designed and built for university student builders and creators.

