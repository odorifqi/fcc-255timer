export const reducer = (state, action) => {
  switch (action.type) {
    case "SES_MIN":
      return { ...state, sesMin: state.sesMin - 1 };
    case "BRE_MIN":
      return { ...state, breMin: state.breMin - 1 };
    case "SES_SEC":
      return {
        ...state,
        sesSec: action.payload ? action.payload : state.sesSec - 1,
      };
    case "BRE_SEC":
      return {
        ...state,
        breSec: action.payload ? action.payload : state.breSec - 1,
      };
    case "START_STOP":
      return { ...state, ...action.payload };
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
    case "SET_SESSION":
      return {
        ...state,
        sesMinDisp:
          state.sesMinDisp +
          (state.sesMinDisp === 1 || state.sesMinDisp === 60
            ? state.sesMinDisp + action.payload > 0 &&
              state.sesMinDisp + action.payload < 61
              ? action.payload
              : 0
            : action.payload),
        sesMin:
          state.sesMinDisp +
          (state.sesMinDisp === 1 || state.sesMinDisp === 60
            ? state.sesMinDisp + action.payload > 0 &&
              state.sesMinDisp + action.payload < 61
              ? action.payload
              : 0
            : action.payload),
        sesSec: 60,
      };
    case "SET_BREAK":
      return {
        ...state,
        breMinDisp:
          state.breMinDisp +
          (state.breMinDisp === 1 || state.breMinDisp === 60
            ? state.breMinDisp + action.payload > 0 &&
              state.breMinDisp + action.payload < 61
              ? action.payload
              : 0
            : action.payload),
        breMin:
          state.breMinDisp +
          (state.breMinDisp === 1 || state.breMinDisp === 60
            ? state.breMinDisp + action.payload > 0 &&
              state.breMinDisp + action.payload < 61
              ? action.payload
              : 0
            : action.payload),
        breSec: 60,
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
        beep: action.payload,
      };

    default:
      throw new Error();
  }
};
