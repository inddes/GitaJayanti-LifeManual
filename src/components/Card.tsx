import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-md p-6
        ${hover ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-2' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
