import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';

const AlarmScreen: React.FC = () => {
  const [alarms, setAlarms] = useState([
    { time: '07:00', enabled: true },
    { time: '07:15', enabled: false },
  ]);

  const [newTime, setNewTime] = useState('');

  const toggleAlarm = (index: number) => {
    const updated = [...alarms];
    updated[index].enabled = !updated[index].enabled;
    setAlarms(updated);
  };

  const addAlarm = () => {
    if (newTime.trim() === '') return;

    setAlarms([...alarms, { time: newTime, enabled: true }]);
    setNewTime('');
  };

  return (
    <View style={styles.container}>
      {/* danh sách alarm */}
      {alarms.map((alarm, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.time}>{alarm.time}</Text>
          <Switch
            value={alarm.enabled}
            onValueChange={() => toggleAlarm(index)}
          />
        </View>
      ))}

      {/* thêm alarm */}
      <View style={styles.addBox}>
        <TextInput
          placeholder="HH:MM"
          value={newTime}
          onChangeText={setNewTime}
          style={styles.input}
        />
        <CustomButton title="Add" onPress={addAlarm} />
      </View>
    </View>
  );
};

export default AlarmScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  time: {
    fontSize: 22,
  },

  addBox: {
    marginTop: 20,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});