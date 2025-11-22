import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ImageTimeline from './ImageTimeline';
import StoryView from './StoryView';
import CharacterModal from './CharacterModal';
import { generateStory } from '../services/api';

function WorkspaceView({ onBack }) {
  const [images, setImages] = useState([]);
  const [genre, setGenre] = useState('fantasy');
  const [characters, setCharacters] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Upload, 2: Genre, 3: Characters, 4: Generate

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      
      if (story) {
        setStory('');
      }
    }
  };

  const handleFilesAdded = (files) => {
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
      status: 'ready'
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
    URL.revokeObjectURL(images.find(img => img.id === id)?.preview);
  };

  const handleGenerateStory = async () => {
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    
    if (!characters.trim()) {
      setShowCharacterModal(true);
      return;
    }

    setLoading(true);
    setImages(prev => prev.map(img => ({ ...img, status: 'analyzing' })));
    
    try {
      const result = await generateStory(images, genre, characters);
      setStory(result);
      setImages(prev => prev.map(img => ({ ...img, status: 'complete' })));
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Failed to generate story. Please try again.');
      setImages(prev => prev.map(img => ({ ...img, status: 'ready' })));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <nav className="h-20 glass-dark sticky top-0 z-50 border-b border-earth-leaf/20">
        <div className="h-full px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-earth-leaf/10 transition-colors flex items-center gap-2 text-earth-text/70 hover:text-earth-text"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back to Home</span>
            </button>
            <div className="h-12 w-px bg-earth-leaf/20" />
            <div className="flex flex-col items-center gap-1">
              <img 
                src="/image.png" 
                alt="ChithraVani" 
                className="h-9 w-auto"
              />
              <p className="text-[8px] text-earth-forest/70 tracking-[0.15em] uppercase font-medium">
                Voice Of Images
              </p>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="px-6 py-2.5 rounded-full bg-earth-forest text-white font-semibold hover:glow-leaf transition-all shadow-md"
          >
            Export Story
          </button>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Narrative Arc Timeline */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="w-[380px] border-r border-earth-leaf/20 flex flex-col bg-white/50 backdrop-blur-sm">
            <SortableContext
              items={images.map(img => img.id)}
              strategy={verticalListSortingStrategy}
            >
              <ImageTimeline
                images={images}
                onFilesAdded={handleFilesAdded}
                onRemoveImage={handleRemoveImage}
                genre={genre}
                onGenreChange={setGenre}
                characters={characters}
                onCharactersChange={setCharacters}
                onOpenCharacterModal={() => setShowCharacterModal(true)}
                onGenerateStory={handleGenerateStory}
                loading={loading}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </SortableContext>
          </div>
        </DndContext>

        {/* Right Main Area - Storybook View */}
        <div className="flex-1 overflow-auto">
          <StoryView
            story={story}
            loading={loading}
            images={images}
          />
        </div>
      </div>

      {/* Character Details Modal */}
      <AnimatePresence>
        {showCharacterModal && (
          <CharacterModal
            characters={characters}
            onCharactersChange={setCharacters}
            onClose={() => setShowCharacterModal(false)}
            onSubmit={() => {
              setShowCharacterModal(false);
              if (characters.trim()) {
                handleGenerateStory();
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default WorkspaceView;
