import React from 'react'
import HomePage from './HomePage';
import SkillsPage from './SkillsPage';
import ProjectPage from './ProjectPage';
import ContactPage from './ContactPage';
import TestimonialPage from './TestimonialPage';
import FloatingNavBar from "../ui/FloatingNavBar";

const LandingPage = () => {
  return (
     <div className="overflow'-x-hidden snap-y snap-mandatory h-screen overflow-y-auto scrollbar-thin">
      <section id="home" className="snap-start snap-always min-h-screen">
        <HomePage />
      </section>
      <section id="skills" className="snap-start snap-always min-h-screen">
        <SkillsPage />
      </section>
      <section id="projects" className="snap-start snap-always min-h-screen">
        <ProjectPage />
      </section>
      <section id="contact" className="snap-start snap-always min-h-screen">
        <ContactPage />
      </section>
      <section id="testimonials" className="snap-start snap-always min-h-screen">
        <TestimonialPage />
      </section>
      <FloatingNavBar/>
    </div>
  )
}

export default LandingPage