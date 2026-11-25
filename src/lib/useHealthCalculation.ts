import { useCallback, useEffect, useRef, useState } from "react";
import type { ToolStatus } from "@/types";

type CalculationOutcome<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export function useHealthCalculation<T>() {
  const [status, setStatus] = useState<ToolStatus>("empty");
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const calculate = useCallback((work: () => CalculationOutcome<T>) => {
    setStatus("loading");
    setResult(null);
    setError("");

    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const outcome = work();
      if (outcome.ok) {
        setResult(outcome.value);
        setStatus("success");
      } else {
        setError(outcome.error);
        setStatus("error");
      }
      timer.current = null;
    }, 120);
  }, []);

  return { status, result, error, calculate };
}
