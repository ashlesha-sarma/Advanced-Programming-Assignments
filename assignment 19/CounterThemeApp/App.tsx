import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const App = () => {
  // Counter state
  const [count, setCount] = useState(0);

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Increment function
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // Decrement function with validation
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  // Reset function
  const handleReset = () => {
    setCount(0);
  };

  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Dynamic colors
  const backgroundColor = isDarkMode ? '#121212' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor },
      ]}>

      {/* Title */}
      <Text
        style={[
          styles.title,
          { color: textColor },
        ]}>
        Digital Counter
      </Text>

      {/* Counter Display */}
      <Text
        style={[
          styles.counterText,
          { color: textColor },
        ]}>
        {count}
      </Text>

      {/* Increment and Decrement Buttons */}
      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={styles.button}
          onPress={handleIncrement}>
          <Text style={styles.buttonText}>
            Increment
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleDecrement}>
          <Text style={styles.buttonText}>
            Decrement
          </Text>
        </TouchableOpacity>

      </View>

      {/* Reset Button */}
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleReset}>
        <Text style={styles.buttonText}>
          Reset
        </Text>
      </TouchableOpacity>

      {/* Theme Toggle Button */}
      <TouchableOpacity
        style={styles.themeButton}
        onPress={toggleTheme}>
        <Text style={styles.buttonText}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // App title
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  // Counter text
  counterText: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 40,
  },

  // Row for increment/decrement buttons
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  // Common button style
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  // Reset button style
  resetButton: {
    backgroundColor: '#E94E77',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },

  // Theme button style
  themeButton: {
    backgroundColor: '#50C878',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  // Button text
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});