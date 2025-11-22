import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical, X, Loader2, CheckCircle2 } from 'lucide-react';

function SortableImageCard({ image, index, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const statusConfig = {
    ready: { icon: null, color: 'text-earth-wood', bg: 'bg-earth-sand/90' },
    analyzing: { icon: Loader2, color: 'text-white', bg: 'bg-earth-leaf/90', spin: true },
    complete: { icon: CheckCircle2, color: 'text-white', bg: 'bg-earth-forest/90' }
  };

  const status = statusConfig[image.status] || statusConfig.ready;
  const StatusIcon = status.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group bg-white rounded-lg border border-earth-leaf/20 overflow-hidden
        shadow-md hover:shadow-lg hover:border-earth-leaf/40 transition-all
        ${isDragging ? 'opacity-50 shadow-xl shadow-earth-leaf/50' : ''}
      `}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 p-1 bg-white/90 backdrop-blur-sm rounded cursor-grab active:cursor-grabbing shadow-sm border border-earth-leaf/20"
      >
        <GripVertical className="w-4 h-4 text-earth-forest" />
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={image.preview}
          alt={`Upload ${index + 1}`}
          className="w-full h-32 object-cover"
        />
        
        {/* Status Badge */}
        {StatusIcon && (
          <div className={`absolute top-2 right-2 px-2 py-1 ${status.bg} rounded-full flex items-center gap-1`}>
            <StatusIcon className={`w-3 h-3 ${status.color} ${status.spin ? 'animate-spin' : ''}`} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2 flex items-center justify-between bg-white/60 backdrop-blur-sm">
        <span className="text-xs font-medium text-earth-text">
          Photo {index + 1}
        </span>
        
        {/* Remove Button */}
        <button
          onClick={() => onRemove(image.id)}
          className="p-1 hover:bg-red-500/20 rounded transition-colors group/remove"
        >
          <X className="w-4 h-4 text-earth-forest/60 group-hover/remove:text-red-500" />
        </button>
      </div>
    </div>
  );
}

export default SortableImageCard;
