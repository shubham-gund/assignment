import React from 'react';

interface TooltipProps {
  topic: string;
}

const Tooltip: React.FC<TooltipProps> = ({ topic }) => {
  return (
    <span className="absolute -top-6 left-0 w-32 bg-black text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {topic}
    </span>
  );
};

export default Tooltip;
