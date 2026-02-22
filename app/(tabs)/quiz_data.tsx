import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

export const questions = [
  {
    key: 'skinType',
    question: 'What is your skin type?',
    options: ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'],
    multi: true,
  },
  {
    key: 'acneProne',
    question: 'Are you acne-prone?',
    options: ['Yes', 'No'],
    multi: false,
  },
{
    key: 'type of acne',
    question: 'What type of Acne do you have, if you do?',
    options: ['Hormonal', 'Cystic', 'Fungal', 'None'],
    multi: false,
  },
  {
    key: 'fragranceSensitive',
    question: 'Are you sensitive to fragrance?',
    options: ['Yes', 'No'],
    multi: false,
  },
  {
    key: 'rosacea',
    question: 'Do you experience redness or rosacea?',
    options: ['Yes', 'No'],
    multi: false,
  },
   {
    key: 'hyperpigmentation',
    question: 'Do you experience hyperpignetation  or acne scars?',
    options: ['Yes', 'No'],
    multi: false,
  },
   {
    key: 'skinConcerns',
    question: 'What are some other skin concerns you have',
    options: ['Blackheads', 'Pore Minimizing', "Eczema", "Fine Lines"],
    multi: true,
  },
  
  
];
export  function SkinQuiz() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  const current = questions[step];

  const handleSelect = (option: string) => {
    if (current.multi) {
      const prev: string[] = answers[current.key] || [];
      if (prev.includes(option)) {
        setAnswers({ ...answers, [current.key]: prev.filter((o) => o !== option) });
      } else {
        setAnswers({ ...answers, [current.key]: [...prev, option] });
      }
    } else {
      setAnswers({ ...answers, [current.key]: option });
    }
  };

  const next = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      await AsyncStorage.setItem('skinProfile', JSON.stringify(answers));
      router.replace('/');
    }
  };

  const hasAnswer = current.multi ? (answers[current.key]?.length > 0) : !!answers[current.key];

  return (
    <View>
      <Text>
        Question {step + 1} of {questions.length}
      </Text>

      <Text>
        {current.question}
      </Text>

      {current.options.map((option) => {
        const selected = current.multi ? (answers[current.key] || []).includes(option) : answers[current.key] === option;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => handleSelect(option)}
            style={{ opacity: selected ? 0.8 : 1 }}
          >
            <Text>{option}{selected ? ' ✓' : ''}</Text>
          </TouchableOpacity>
        );
      })}

      <Button
        title={step === questions.length - 1 ? 'Finish' : 'Next'}
        onPress={next}
        disabled={!hasAnswer}
      />
    </View>
  );
  
  
}