import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { ExplorePage } from './pages/ExplorePage';
import { StudentProfile } from './pages/StudentProfile';
import { ProjectsBrowsePage } from './pages/ProjectsBrowsePage';
import { ProjectDetails } from './pages/ProjectDetails';
import { CreateProject } from './pages/CreateProject';
import { Applications } from './pages/Applications';
import { Messages } from './pages/Messages';
import { MyProjects } from './pages/MyProjects';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-paper-bg text-ink-primary font-sans antialiased selection:bg-scrapbook-yellow selection:text-ink-primary">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/profile/:id" element={<StudentProfile />} />
              <Route path="/projects" element={<ProjectsBrowsePage />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/my-projects" element={<MyProjects />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/stories" element={<SuccessStoriesPage />} />
              {/* Fallback route */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;

