import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center h-[70vh]">
      <AlertTriangle size={64} className="text-amber-500" />
      
      <div>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <Link
        to="/"
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-6 rounded-lg transition-colors"
      >
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;