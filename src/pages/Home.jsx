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
    <div className="min-h-screen bg-[#FFFFFF] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-[#FFFFFF]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:px-4 focus:py-3 focus:bg-zinc-900 focus:text-[#FFFFFF] focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest"
      >
        Skip to content
      </a>
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
