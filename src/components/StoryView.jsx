import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Image as ImageIcon } from 'lucide-react';

function StoryView({ story, loading, images }) {
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Skeleton Loader with Shimmer Effect */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 bg-earth-sand/40 rounded shimmer w-3/4"></div>
              <div className="h-6 bg-earth-sand/40 rounded shimmer"></div>
              <div className="h-6 bg-earth-sand/40 rounded shimmer w-5/6"></div>
            </div>
          ))}
          
          <p className="text-center text-earth-leaf font-serif text-lg mt-8 animate-pulse">
            Weaving your narrative...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="mb-6">
            <BookOpen className="w-20 h-20 text-earth-sand/60 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold font-sanskrit text-earth-leaf mb-4">
            Your Story Awaits
          </h2>
          <p className="text-earth-text/70 leading-relaxed">
            Upload your photos, describe your characters, select a genre, and let ChithraVani weave them into a captivating narrative.
          </p>
          
          {images.length > 0 && (
            <div className="mt-6 p-4 glass rounded-xl border border-earth-leaf/30">
              <p className="text-sm text-earth-leaf font-medium">
                {images.length} photo{images.length > 1 ? 's' : ''} ready • Click "Generate Story" to begin
              </p>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-12"
    >
      {/* Story Header */}
      <div className="mb-12 pb-6 border-b border-earth-leaf/20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold font-sanskrit text-earth-leaf mb-3"
        >
          Your ChithraVani
        </motion.h1>
        <p className="text-sm text-earth-forest/70 font-sans">
          Generated from {images.length} image{images.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Story Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="prose prose-stone prose-lg max-w-none"
      >
        {story.split('\n\n').map((paragraph, index) => {
          if (!paragraph.trim()) return null;
          
          return (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="font-serif text-earth-text/90 leading-relaxed text-justify mb-6 first-letter:text-6xl first-letter:font-bold first-letter:text-earth-forest first-letter:mr-2 first-letter:float-left"
            >
              {paragraph}
            </motion.p>
          );
        })}
      </motion.article>

      {/* Footer Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 pt-8 border-t border-earth-leaf/20 text-center"
      >
        <p className="text-sm text-earth-forest/60 italic font-serif">
          ~ The End ~
        </p>
      </motion.div>
    </motion.div>
  );
}

export default StoryView;
