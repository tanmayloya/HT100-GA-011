import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Wand2, Sparkles } from 'lucide-react';
import SortableImageCard from './SortableImageCard';

function ImageTimeline({ 
  images, 
  onFilesAdded, 
  onRemoveImage, 
  genre, 
  onGenreChange,
  characters,
  onCharactersChange,
  onOpenCharacterModal,
  onGenerateStory,
  loading,
  currentStep,
  setCurrentStep
}) {
  const onDrop = useCallback((acceptedFiles) => {
    onFilesAdded(acceptedFiles);
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true,
    noClick: images.length > 0
  });

  const genres = [
    { value: 'fantasy', label: 'Fantasy', emoji: '🧙‍♂️' },
    { value: 'adventure', label: 'Adventure', emoji: '🗺️' },
    { value: 'mystery', label: 'Mystery', emoji: '🔍' },
    { value: 'romance', label: 'Romance', emoji: '💖' },
    { value: 'scifi', label: 'Sci-Fi', emoji: '🚀' },
    { value: 'horror', label: 'Horror', emoji: '👻' },
    { value: 'comedy', label: 'Comedy', emoji: '😂' },
    { value: 'drama', label: 'Drama', emoji: '🎭' }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-earth-leaf/20 bg-white/30 text-center">
        <h2 className="text-2xl font-bold text-earth-text mb-2">
          Craft Your Story
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className={`w-2 h-2 rounded-full ${
            currentStep >= 1 ? 'bg-earth-forest' : 'bg-earth-sand/50'
          }`} />
          <div className={`w-2 h-2 rounded-full ${
            currentStep >= 2 ? 'bg-earth-forest' : 'bg-earth-sand/50'
          }`} />
          <div className={`w-2 h-2 rounded-full ${
            currentStep >= 3 ? 'bg-earth-forest' : 'bg-earth-sand/50'
          }`} />
          <div className={`w-2 h-2 rounded-full ${
            currentStep >= 4 ? 'bg-earth-forest' : 'bg-earth-sand/50'
          }`} />
        </div>
        <p className="text-sm text-earth-forest/70 mt-2">
          {currentStep === 1 && (images.length === 0 ? 'Step 1: Upload photos to begin' : `${images.length} photo${images.length > 1 ? 's' : ''} uploaded`)}
          {currentStep === 2 && 'Step 2: Choose your story genre'}
          {currentStep === 3 && 'Step 3: Add character details'}
          {currentStep === 4 && 'Step 4: Generate your story'}
        </p>
      </div>

      {/* Image List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {images.length === 0 ? (
          <div {...getRootProps()} className="h-full">
            <input {...getInputProps()} />
            <div className={`
              h-full min-h-[300px] border-2 border-dashed rounded-xl
              flex flex-col items-center justify-center gap-3 cursor-pointer
              transition-all
              ${isDragActive 
                ? 'border-earth-leaf bg-earth-leaf/10 shadow-lg' 
                : 'border-earth-sand/60 hover:border-earth-leaf/70 hover:bg-earth-paper'
              }
            `}>
              <Upload className={`w-12 h-12 ${isDragActive ? 'text-earth-leaf' : 'text-earth-forest/40'}`} />
              <div className="text-center">
                <p className="text-sm font-medium text-earth-text">
                  {isDragActive ? 'Drop images here' : 'Upload Your Photos'}
                </p>
                <p className="text-xs text-earth-forest/60 mt-1">
                  or click to browse
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {images.map((image, index) => (
              <SortableImageCard
                key={image.id}
                image={image}
                index={index}
                onRemove={onRemoveImage}
              />
            ))}
            
            {/* Add More Button */}
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 border-2 border-dashed border-earth-sand/60 rounded-lg text-sm text-earth-forest/70 hover:border-earth-leaf hover:text-earth-leaf hover:bg-earth-paper transition-colors"
              >
                + Add More Photos
              </motion.button>
            </div>
          </>
        )}
      </div>

      {/* Controls Footer */}
      {images.length > 0 && (
        <div className="p-6 border-t border-earth-leaf/20 space-y-6 bg-white/40">
          <AnimatePresence mode="wait">
            {/* Step 1: Upload Complete - Proceed to Genre */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-4"
              >
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-earth-leaf" />
                  <p className="text-sm font-semibold text-earth-text">Photos Uploaded!</p>
                </div>
                <p className="text-xs text-earth-forest/70">Ready to select your story genre</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-4 bg-earth-forest text-white font-bold rounded-full shadow-xl hover:glow-leaf transition-all"
                >
                  Choose Genre →
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Genre Selection */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <label className="block text-sm font-semibold text-earth-text mb-3 text-center">
                  Choose Story Genre
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {genres.map((g) => (
                    <motion.button
                      key={g.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onGenreChange(g.value)}
                      className={`
                        px-4 py-3 rounded-xl text-sm font-medium transition-all
                        flex flex-col items-center gap-1
                        ${genre === g.value 
                          ? 'bg-earth-forest text-white shadow-lg' 
                          : 'bg-white/70 text-earth-text border border-earth-sand/60 hover:bg-white hover:border-earth-leaf/40'
                        }
                      `}
                    >
                      <span className="text-2xl">{g.emoji}</span>
                      <span className="text-xs">{g.label}</span>
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(3)}
                  className="w-full py-4 bg-earth-forest text-white font-bold rounded-full shadow-xl hover:glow-leaf transition-all mt-4"
                >
                  Add Characters →
                </motion.button>
              </motion.div>
            )}

            {/* Step 3: Character Input */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <label className="block text-sm font-semibold text-earth-text mb-2 text-center">
                  Add Characters
                </label>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenCharacterModal}
                  className="w-full px-4 py-4 border-2 border-dashed border-earth-leaf/50 bg-white/70 rounded-xl text-sm hover:bg-white hover:border-earth-leaf transition-colors backdrop-blur-sm"
                >
                  <span className="text-earth-forest font-medium block mb-1">Characters</span>
                  <span className="text-earth-text/60 text-xs block truncate">
                    {characters || 'Click to describe your characters...'}
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (!characters.trim()) {
                      onOpenCharacterModal();
                    } else {
                      setCurrentStep(4);
                    }
                  }}
                  className="w-full py-4 bg-earth-forest text-white font-bold rounded-full shadow-xl hover:glow-leaf transition-all"
                >
                  {characters.trim() ? 'Continue →' : 'Skip for Now →'}
                </motion.button>
              </motion.div>
            )}

            {/* Step 4: Generate Story */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-earth-leaf" />
                    <p className="text-sm font-semibold text-earth-text">Ready to Create</p>
                  </div>
                  <div className="text-xs text-earth-forest/70 space-y-1">
                    <p>📸 {images.length} photo{images.length > 1 ? 's' : ''}</p>
                    <p>🎭 {genres.find(g => g.value === genre)?.label} genre</p>
                    {characters.trim() && <p>👥 Characters defined</p>}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onGenerateStory}
                  disabled={loading}
                  className="w-full py-4 bg-earth-forest text-white font-bold rounded-full shadow-xl hover:glow-leaf disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-base"
                >
                  <Wand2 className="w-5 h-5" />
                  {loading ? 'Weaving Story...' : 'Generate Story ✨'}
                </motion.button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-2 text-sm text-earth-forest/60 hover:text-earth-forest transition-colors"
                >
                  ← Edit Settings
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default ImageTimeline;
