import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Image, Wand2, BookOpen, ArrowRight, Layers, Zap, Users } from 'lucide-react';
import WorkspaceView from './WorkspaceView';
import ThemeToggle from './ThemeToggle';
import Particles from './Particles';

function LandingPage() {
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedTheme);
    if (savedTheme) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  if (showWorkspace) {
    return <WorkspaceView onBack={() => setShowWorkspace(false)} isDarkMode={isDarkMode} />;
  }

  const features = [
    {
      icon: Image,
      title: 'Upload Your Memories',
      description: 'Drag and drop your favorite photos to create a visual timeline'
    },
    {
      icon: Layers,
      title: 'Arrange & Reorder',
      description: 'Organize your images in any sequence to shape your narrative'
    },
    {
      icon: Users,
      title: 'Define Characters',
      description: 'Describe your protagonists and their unique traits'
    },
    {
      icon: Wand2,
      title: 'AI-Powered Magic',
      description: 'Let Gemini analyze and weave your photos into a coherent story'
    },
    {
      icon: BookOpen,
      title: 'Beautiful Stories',
      description: 'Read your personalized narrative with elegant typography'
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Get your story in seconds with real-time AI processing'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Particle Background */}
      <Particles
        particleCount={1800}
        particleSpread={15}
        speed={0.1}
        particleColors={isDarkMode ? ['#8fb77a', '#a8c997', '#6db35f', '#7DA66A'] : ['#4E6C3F', '#5f7d50', '#7DA66A', '#6db35f']}
        alphaParticles={false}
        particleBaseSize={350}
        sizeRandomness={2}
        cameraDistance={12}
        disableRotation={false}
        className="z-0"
      />

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-earth-leaf/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-earth-sand/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-earth-forest/15 rounded-full blur-3xl"
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 glass-dark border-b border-earth-leaf/20">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <img 
                src="/image.png" 
                alt="ChithraVani" 
                className={`h-10 w-auto ${isDarkMode ? 'brightness-0 invert' : ''}`}
              />
              <p className="text-[9px] text-earth-forest tracking-[0.15em] uppercase font-medium">
                Voice Of Images
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowWorkspace(true)}
              className="px-6 py-2.5 rounded-full bg-earth-forest text-white font-semibold hover:glow-leaf transition-all shadow-md"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-8xl font-bold mb-6">
              <span className="text-earth-text">Transform </span>
              <span className="text-earth-leaf">Photos</span>
              <br />
              <span className="text-earth-text">Into </span>
              <span className="text-earth-leaf">Stories</span>
            </h1>

            <p className="text-xl text-earth-text/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              Turn your random photo collection into a beautifully crafted narrative. 
              ChithraVani uses advanced AI to understand your images and weave them into compelling stories.
            </p>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(125, 166, 106, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWorkspace(true)}
                className="px-8 py-4 rounded-full bg-earth-forest text-white font-bold text-lg flex items-center gap-2 shadow-xl"
              >
                Start Creating
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full glass border border-earth-leaf/30 text-earth-text font-semibold text-lg"
              >
                See Example
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              <span className="text-earth-leaf">How It Works</span>
            </h2>
            <p className="text-earth-text/60 text-lg">
              From photos to prose in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 12px 40px rgba(125, 166, 106, 0.3)" }}
                className="glass rounded-2xl p-6 border border-earth-leaf/20 hover:border-earth-leaf/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-earth-forest flex items-center justify-center mb-4 shadow-md">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-earth-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-earth-text/60">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 border border-earth-leaf/30 shadow-2xl">
            <h2 className="text-5xl font-bold mb-6 text-earth-leaf">
              Ready to Begin Your Story?
            </h2>
            <p className="text-earth-text/70 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of creators turning their memories into magical narratives. 
              No signup required. Start for free.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowWorkspace(true)}
              className="px-10 py-5 rounded-full bg-earth-forest text-white font-bold text-xl flex items-center gap-3 mx-auto shadow-2xl hover:glow-leaf"
            >
              <Wand2 className="w-6 h-6" />
              Create Your Story Now
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-earth-leaf/20 py-8">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-earth-text/50 text-sm">
            © 2025 ChithraVani. Powered by Google Gemini AI.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
