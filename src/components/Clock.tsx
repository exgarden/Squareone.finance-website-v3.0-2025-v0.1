import { useState, useEffect } from 'react';
import {  } from 'lucide-react';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString([], { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center mb-4">
        <ClockIcon className="w-5 h-5 mr-2 text-slate-600" />
        <h2 className="text-lg font-semibold text-slate-700">Date & Time</h2>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="text-4xl font-light mb-2">{formatTime(time)}</div>
        <div className="text-sm text-slate-500">{formatDate(time)}</div>
      </div>
    </div>
  );
};

export default Clock;
