import React from 'react';
import { motion } from 'framer-motion';
import { X, Users } from 'lucide-react';

function CharacterModal({ characters, onCharactersChange, onClose, onSubmit }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-earth-forest p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-serif">Your Characters</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          <p className="text-earth-text/70 mb-4">
            Describe the characters you want in your story - their names, personalities, and roles.
          </p>

          <textarea
            value={characters}
            onChange={(e) => onCharactersChange(e.target.value)}
            placeholder="E.g., A brave knight named Arthur with a noble heart, a clever fox named Felix who loves riddles, and a mysterious wizard..."
            rows={6}
            className="w-full px-4 py-3 border-2 border-earth-sand/60 bg-white/70 text-earth-text rounded-xl resize-none focus:ring-2 focus:ring-earth-leaf focus:border-transparent transition-all backdrop-blur-sm placeholder:text-earth-forest/40"
            autoFocus
          />

          <div className="mt-4 p-3 glass rounded-lg border border-earth-leaf/30">
            <p className="text-xs text-earth-forest/80">
              <strong>💡 Tip:</strong> The more detail you provide, the richer your story will be!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-earth-paper border-t border-earth-leaf/20 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-earth-sand/60 bg-white rounded-lg font-medium text-earth-forest hover:bg-earth-paper transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!characters.trim()}
            className="flex-1 px-4 py-3 bg-earth-forest text-white font-bold rounded-full shadow-lg hover:glow-leaf disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CharacterModal;
