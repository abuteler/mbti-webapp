import React, { createContext, useContext, useState } from "react";
import {
  Answer,
  QuestionKeys,
  QuestionsGroup,
} from "./test/mbti.types";
import { QuestionsMatrix } from "./test/mbti.data";

const ActusContext = createContext<ActusContext | null>(null);

type ActusContext = {
  stepNumber: number;
  setStepNumber: React.Dispatch<React.SetStateAction<number>>;
  actusSteps: FormStep[];
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
};

type FormStep = {
  number: number;
  questions: QuestionsGroup[];
};

type ActusContextProviderProps = {
  children: React.ReactNode;
};

const initForm = () => {
  const formSteps: FormStep[] = [];
  for (let i = 1; i <= 4; i++) {
    const start = (i-1)*5;
    const end = 5*i;
    const formStep: FormStep = {
      number: i,
      questions: QuestionsMatrix.slice(start, end),
    };
    formSteps.push(formStep);
  }
  return formSteps;
};
const initAnswers = () => {
  const answers: Answer[] = [];
  Object.values(QuestionKeys).forEach((key) => {
    const answer: Answer | any = {};
    answer[key] = 0;
    answers.push(answer);
  });
  return answers;
};

export default function ActusContextProvider({
  children,
}: ActusContextProviderProps) {
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [actusSteps] = useState<FormStep[]>(initForm());
  const [answers, setAnswers] = useState<Answer[]>(initAnswers());

  return (
    <ActusContext.Provider
      value={{
        stepNumber,
        setStepNumber,
        actusSteps,
        answers,
        setAnswers,
      }}
    >
      {children}
    </ActusContext.Provider>
  );
}

export function useActusContext() {
  const context = useContext(ActusContext);
  if (!context) throw new Error("This hook must be used within the ActusContextProvider");

  return context;
}
