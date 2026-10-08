import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import AgencyBanner from '@/components/AgencyBanner';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F9F6F0] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-[#F9F6F0]">
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <AgencyBanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
