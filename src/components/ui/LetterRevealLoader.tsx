import React from 'react';
import { cn } from '@/lib/utils';

interface LetterRevealLoaderProps {
  className?: string;
  text?: string;
}

export const LetterRevealLoader: React.FC<LetterRevealLoaderProps> = ({
  className,
  text = 'LOADING',
}) => {
  const letters = text.split('');

  return (
    <div className={cn('letter-reveal-container my-4', className)}>
      <div className="letter-reveal-loader">
        {letters.map((char, index) => (
          <span key={index} className="letter-reveal-char">
            {char}
          </span>
        ))}

        <div className="letter-reveal-covers">
          {letters.map((_, index) => (
            <span
              key={index}
              className="letter-reveal-cover"
              style={{
                animationDelay: `${index * 0.142857}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LetterRevealLoader;
