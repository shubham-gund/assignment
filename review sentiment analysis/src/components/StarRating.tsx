import React from 'react';

interface StarRatingProps {
  rating: number;
  outOf: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, outOf }) => {
  const fullStars = Math.floor((rating / outOf) * 5);
  const remainder = ((rating / outOf) * 5) - fullStars;
  const halfStar = remainder >= 0.5  ;

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="h-5 w-5 text-yellow-500 pl-1" fill="currentColor" viewBox="0 0 32 32">
          <path d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
      l11.547-1.2L16.026,0.6L20.388,10.918z"/>
        </svg>
      ))}
      {halfStar && (
        <svg className ="h-5 w-5 text-yellow-500 pl-1" fill='currentColor' viewBox="0 0 32 32">
        <defs>
          <linearGradient id="grad">
            <stop offset="50%" stop-color="#ecc94b"/>
            <stop offset="50%" stop-color="#c9c9c9"/>
          </linearGradient>
        </defs>
        <path fill="url(#grad)" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
      l11.547-1.2L16.026,0.6L20.388,10.918z"/>
      </svg>
      )}
      {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => ( // Calculate the number of empty stars
        <svg key={`empty-${i}`} className="h-5 w-5 text-gray-300 pl-1" fill="currentColor" viewBox="0 0 32 32">
          <path d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
      l11.547-1.2L16.026,0.6L20.388,10.918z"/>
        </svg>
      ))} 
      
    </div>
    
  );
};

export default StarRating;
