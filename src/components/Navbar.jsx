import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileDown } from 'lucide-react';

function Navbar({ onExport }) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="h-20 glass-dark sticky top-0 z-50 border-b border-white/5"
    >
      <div className="h-full px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-purple-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-gradient tracking-tight">
              PixelKatha
            </h1>
            <p className="text-[10px] text-purple-300/70 tracking-[0.2em] uppercase mt-0.5">
              Where Pixels Tell Stories
            </p>
          </div>
        </div>

        <button
          onClick={onExport}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:glow-purple hover:scale-105 transition-all"
        >
          <FileDown className="w-4 h-4" />
          Export Story
        </button>
      </div>
    </motion.nav>
  );
}

export default Navbar;
