import { differenceInSeconds } from "date-fns";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";

import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface CycleContextProviderProps {
  children: React.ReactNode;
}

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextProps {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  interruptCurrentCycle: () => void;
  createNewCycle: (data: CreateCycleData) => void;
  setSecondsPassed: (seconds: number) => void;
  markCurrentCycleAsFinished: () => void;
  amountSecondsPassed: number;
}

export const CycleContext = createContext({} as CyclesContextProps);

export const CyclesContextProvider = ({
  children,
}: CycleContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return {
        cycles: [],
        activeCycleId: null,
      };
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cycles-states-1.0.0", stateJSON);
  }, [cyclesState]);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        createNewCycle,
        interruptCurrentCycle,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

export const useCycleContext = () => useContext(CycleContext);
