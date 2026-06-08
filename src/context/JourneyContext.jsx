import { createContext, useContext, useState, useCallback } from "react";
import { questions, STEPS, getDiagnosis, getQuestionScore } from "../../shared/content";

const JourneyContext = createContext(null);

export function JourneyProvider({ children }) {
  const [intakeAnswers, setIntakeAnswers] = useState({});
  const [intakeScore, setIntakeScore] = useState(null);
  const [stepResponses, setStepResponses] = useState({});

  const saveIntake = useCallback((answers, score) => {
    setIntakeAnswers(answers);
    setIntakeScore(score);
  }, []);

  const saveStepResponse = useCallback((stepNumber, value) => {
    setStepResponses((prev) => ({ ...prev, [stepNumber]: value }));
  }, []);

  // Build a human-readable summary of the user's entire journey
  const getJourneySummary = useCallback(() => {
    const parts = [];

    // Intake summary
    if (intakeScore !== null) {
      const diagnosis = getDiagnosis(intakeScore);
      parts.push(`INTAKE DIAGNOSIS: Score ${intakeScore}/40 — "${diagnosis?.label}"`);
      parts.push(`Diagnosis description: ${diagnosis?.description}`);

      // Specific intake answers
      questions.forEach((q, i) => {
        const ans = intakeAnswers[i];
        if (ans === undefined) return;
        if (q.type === "slider") {
          parts.push(`Q: "${q.question}" → They said: ${ans} (out of ${q.max})`);
        } else {
          const chosen = q.options[ans];
          parts.push(`Q: "${q.question}" → They chose: "${chosen.label}" (severity: ${chosen.score}/10)`);
        }
      });
    }

    // Step responses
    STEPS.forEach((step) => {
      const response = stepResponses[step.number];
      if (!response) return;

      if (step.inputType === "checkboxes" && Array.isArray(response)) {
        if (response.length > 0) {
          parts.push(`STEP ${step.number} (${step.name}): Skills they've outsourced to AI: ${response.join(", ")}`);
        }
      } else if (step.inputType === "breathing") {
        parts.push(`STEP ${step.number} (${step.name}): Completed the breathing exercise`);
      } else if (typeof response === "string" && response.trim()) {
        parts.push(`STEP ${step.number} (${step.name}): They wrote: "${response.trim()}"`);
      }
    });

    return parts.length > 0 ? parts.join("\n") : "No journey data yet — the user just started.";
  }, [intakeAnswers, intakeScore, stepResponses]);

  return (
    <JourneyContext.Provider
      value={{
        intakeAnswers,
        intakeScore,
        stepResponses,
        saveIntake,
        saveStepResponse,
        getJourneySummary,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used within JourneyProvider");
  return ctx;
}
