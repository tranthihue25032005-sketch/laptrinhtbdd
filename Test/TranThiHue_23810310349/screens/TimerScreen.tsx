import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import CircleTimer from '../components/CircleTimer';
import CustomButton from '../components/CustomButton';

const TimerScreen: React.FC = () => {
  const [time, setTime] = useState(60000); // 1 phút (ms)
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (t: number) => {
    const minutes = Math.floor(t / 60000);
    const seconds = Math.floor((t % 60000) / 1000);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (running) return;

    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 1000) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  };

  const handlePause = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    handlePause();
    setTime(60000);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CircleTimer time={formatTime(time)} />

      <View style={{ flexDirection: 'row' }}>
        <CustomButton title="Play" onPress={handleStart} />
        <CustomButton title="Pause" onPress={handlePause} />
        <CustomButton title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
};

export default TimerScreen;