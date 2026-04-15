import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import CircleTimer from '../components/CircleTimer';
import CustomButton from '../components/CustomButton';

const StopwatchScreen: React.FC = () => {
  const [time, setTime] = useState(0); // mili giây
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // format thời gian mm:ss:ms
  const formatTime = (t: number) => {
    const minutes = Math.floor(t / 60000);
    const seconds = Math.floor((t % 60000) / 1000);
    const ms = Math.floor((t % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (running) return;

    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 10);
    }, 10);
  };

  const handleStop = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    handleStop();
    setTime(0);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CircleTimer time={formatTime(time)} />

      <View style={{ flexDirection: 'row' }}>
        <CustomButton title="Start" onPress={handleStart} />
        <CustomButton title="Stop" onPress={handleStop} />
        <CustomButton title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
};

export default StopwatchScreen;