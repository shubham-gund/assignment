import React from 'react';
import StarRating from './StarRating';

interface Review {
  reviewer_name: string;
  content: string;
  analytics: Analytics[];
  date: string;
  rating_review_score: number;
  out_of:number
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

interface Props {
  review: Review;
}

const sentimentColors: { [key: string]: string } = {
  Positive: '#D9F2DD',
  Negative: '#F2DBD9',
  Mixed: '#e8bd6d3d',
  Neutral: '#eaf09b6b',
};

const ReviewHighlighter: React.FC<Props> = ({ review }) => {
  const { reviewer_name, content, analytics, date, rating_review_score, source,out_of } = review;

  const getHighlightedText = () => {
    let elements: JSX.Element[] = [];
    let lastIndex = 0;

    analytics.forEach(({ highlight_indices, category, sentiment }) => {
      highlight_indices.forEach(([start, end]) => {
        if (lastIndex < start) {
          elements.push(<span key={lastIndex}>{content.substring(lastIndex, start)}</span>);
        }
        elements.push(
          <span
            key={start}
            className="tooltip"
            style={{ backgroundColor: sentimentColors[sentiment] }}
            data-tooltip={category}
          >
            {content.substring(start, end)}
          </span>
        );
        lastIndex = end;
      });
    });

    if (lastIndex < content.length) {
      elements.push(<span key={lastIndex}>{content.substring(lastIndex)}</span>);
    }

    return elements;
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="items-center mb-2">
        <div className='flex'>
          <img src={source.icon} alt={source.name} className="h-8 w-8 rounded-full mr-2" />
          <div className="flex text-sm font-semibold pl-2">{reviewer_name} 
            <div className='px-2 font-light'> wrote a review at </div>
            tripadvisor.com
          </div>
        </div>
        <div className='flex pl-12'>
            <div className="text-sm font-semibold pr-4">
              <StarRating rating={rating_review_score} outOf={out_of} />
            </div>
            <div className="flex justify-center items-center text-xs text-gray-600">{date}</div>
          </div>
      </div>
      <div className="mb-2 pt-2 pl-12">{getHighlightedText()}</div>
    </div>
  );
};

export default ReviewHighlighter;
