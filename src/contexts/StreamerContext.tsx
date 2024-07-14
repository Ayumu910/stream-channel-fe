import React, { createContext, useContext } from 'react';
import useStreamerDetail from '../hooks/useStreamerDetail';
import { Stream } from '../hooks/useStreamList';

interface Streamer {
  id: string;
  name: string;
  url: string;
  platform: string;
  streams: Stream[];
  streamer_icon: string;
}

interface StreamerContextType {
  streamer: Streamer | null;
  isLoading: boolean;
  error: Error | null;
}

export const StreamerContext = createContext<StreamerContextType | undefined>(undefined);

export const useStreamerContext = () => {
  const context = useContext(StreamerContext);
  if (context === undefined) {
    throw new Error('useStreamerContext must be used within a StreamerProvider');
  }
  return context;
};

interface StreamerProviderProps {
  streamerId: string;
  children: React.ReactNode;
}

export const StreamerProvider: React.FC<StreamerProviderProps> = ({ streamerId, children }) => {
  const { streamer, isLoading, error } = useStreamerDetail(streamerId);

  return (
    <StreamerContext.Provider value={{ streamer, isLoading, error }}>
      {children}
    </StreamerContext.Provider>
  );
};