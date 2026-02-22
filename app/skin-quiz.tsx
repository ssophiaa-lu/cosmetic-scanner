import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { questions } from './(tabs)/quiz_data';

const HEADER_HEIGHT = 70;

   const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up available space
    justifyContent: 'center', // Centers children vertically in a column layout
    alignItems: 'center', // Centers children horizontally in a column layout
    // Optional: add a background color to visualize the container boundaries
    backgroundColor: 'lightpink', 
    paddingTop: HEADER_HEIGHT, // leave space for sticky header
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightpink',
    zIndex: 10,
    elevation: 10,
  },
});

const styles1 = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
    color: 'white',
  },
});


const Header = () => (
  <View style={styles.header}>
    <Text style={styles1.headerText}>Get To Know Your Skin</Text>
  </View>
);

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View ></View>
    </View>
  );
};


export function SkinQuiz() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  const current = questions[step];

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [current.key]: option });
  };

  const next = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      await AsyncStorage.setItem('skinProfile', JSON.stringify(answers));
      router.replace('/');
    }
  };

  return (
    <View style={styles2.container}>
      <Header />
      <View style={styles2.card}>
        {/* Progress */}
        <Text style={styles2.progress}>
          Question {step + 1} of {questions.length}
        </Text>

        {/* Question */}
        <Text style={styles2.question}>{current.question}</Text>

        {/* Options */}
        {current.options.map((option: string) => {
          const selected = answers[current.key] === option;

          return (
            <TouchableOpacity
              key={option}
              onPress={() => handleSelect(option)}
              style={[
                styles2.option,
                selected && styles2.optionSelected,
              ]}
            >
              <Text
                style={[
                  styles2.optionText,
                  selected && styles2.optionTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Next Button */}
        <View style={styles2.buttonWrapper}>
          <Button
            title={step === questions.length - 1 ? 'Finish' : 'Next'}
            onPress={next}
            disabled={!answers[current.key]}
          />
        </View>
      </View>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c494a0', // <-- change this to the color you want behind the quiz
    justifyContent: 'center',
    padding: 20,
    paddingTop: HEADER_HEIGHT, // leave space for sticky header
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  progress: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#c36565',
  },
  option: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5b72a0',
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  optionSelected: {
    backgroundColor: '#dbeafe',
    borderColor: '#365d8c',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
  optionTextSelected: {
    fontWeight: '600',
    color: '#1d4ed8',
  },
  buttonWrapper: {
    marginTop: 10,
    color: '#657aa7',
  },
});
    
export { App };
export default SkinQuiz;
