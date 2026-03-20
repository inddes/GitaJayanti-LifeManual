import React from 'react';

interface CardHeaderProps {
  children: React.ReactNode;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white shadow-lg rounded-2xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
  return <div className="px-6 py-4 bg-spiritual-cream/30">{children}</div>;
};

const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return <h3 className={className}>{children}</h3>;
};

const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="px-6 py-4">{children}</div>;
};

interface YouTubePlayerCardProps {
  videoId?: string;
  title?: string;
}

export default function YouTubePlayerCard({
  videoId = "PAHgytRfzjU",
  title = "Meditation in Glance"
}: YouTubePlayerCardProps) {
  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center text-spiritual-brown">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden">
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube.com/embed/${videoId}?si=CVQSSItFSguFEZNT`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </CardContent>
    </Card>
  );
}
