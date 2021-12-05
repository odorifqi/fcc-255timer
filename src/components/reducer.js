export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SES_MIN":
      return { ...state, sesMin: state.sesMin - 1 };
    case "BRE_MIN":
      return { ...state, breMin: state.breMin - 1 };
    case "SES_SEC":
      return {
        ...state,
        sesSec: payload ? payload : state.sesSec - 1,
      };
    case "BRE_SEC":
      return {
        ...state,
        breSec: payload ? payload : state.breSec - 1,
      };
    case "START_STOP":
      return { ...state, ...payload };
    case "RESET":
      return {
        ...state,
        sesMinDisp: 25,
        breMinDisp: 5,
        sesMin: 25,
        breMin: 5,
        sesSec: 60,
        sesOn: false,
        breOn: false,
        timerType: "Session",
        timerOn: false,
      };
    case "SET_INPUT_LENGTH":
      return {
        ...state,
        [`${payload.type}MinDisp`]: payload.value,
        [`${payload.type}Min`]: payload.value,
        [`${payload.type}Sec`]: 60,
      };
    case "SET_LENGTH":
      return {
        ...state,
        [`${payload.type}MinDisp`]:
          state[`${payload.type}MinDisp`] +
          (state[`${payload.type}MinDisp`] === 1 ||
          state[`${payload.type}MinDisp`] === 60
            ? state[`${payload.type}MinDisp`] + payload.value > 0 &&
              state[`${payload.type}MinDisp`] + payload.value < 61
              ? payload.value
              : 0
            : payload.value),
        [`${payload.type}Min`]:
          state[`${payload.type}MinDisp`] +
          (state[`${payload.type}MinDisp`] === 1 ||
          state[`${payload.type}MinDisp`] === 60
            ? state[`${payload.type}MinDisp`] + payload.value > 0 &&
              state[`${payload.type}MinDisp`] + payload.value < 61
              ? payload.value
              : 0
            : payload.value),
        [`${payload.type}Sec`]: 60,
      };
    case "START_BREAK":
      return {
        ...state,
        breMin: state.breMinDisp,
        breSec: 60,
        breOn: true,
        sesOn: false,
        timerType: "Break",
      };
    case "START_SESSION":
      return {
        ...state,
        sesMin: state.sesMinDisp,
        sesSec: 60,
        sesOn: true,
        breOn: false,
        timerType: "Session",
      };
    case "SET_BEEP":
      return {
        ...state,
        beep: payload,
      };

    default:
      throw new Error();
  }
};
