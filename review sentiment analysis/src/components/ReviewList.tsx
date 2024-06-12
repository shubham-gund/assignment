import React, { useEffect, useState } from 'react';
import ReviewHighlighter from './ReviewHighlighter';

interface Review {
  reviewer_name: string;
  content: string;
  analytics: Analytics[];
  date: string;
  rating_review_score: number;
  out_of:number;
  source: {
    name: string;
    icon: string;
  };
}

interface Analytics {
  category: string;
  topic: string;
  phrases: string[];
  sentences: string[];
  sentiment: string;
  highlight_indices: [number, number, string][];
}

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/reviewsData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching the reviews:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {reviews.map((review, index) => (
        <div key={index} className="mb-8">
          <ReviewHighlighter review={review} />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
