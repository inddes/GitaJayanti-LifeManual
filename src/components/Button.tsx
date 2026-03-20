import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-spiritual-gold text-spiritual-brown hover:bg-spiritual-saffron hover:shadow-lg transform hover:-translate-y-1',
    secondary: 'bg-spiritual-brown text-spiritual-cream hover:bg-spiritual-darkBrown hover:shadow-lg',
    ghost: 'bg-transparent border-2 border-spiritual-gold text-spiritual-gold hover:bg-spiritual-gold hover:text-spiritual-brown',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
