import { AnyAction, isType } from "typescript-fsa";

import { downloadExcel } from "../actions";
import { TAppState } from "../types";

const initialState: TAppState = {
    isLoading: false
};

const appReducer = (state: TAppState = initialState, action: AnyAction): TAppState => {
    if (isType(action, downloadExcel.started)) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (isType(action, downloadExcel.done)) {
        return {
            ...state,
            isLoading: false
        };
    }

    if (isType(action, downloadExcel.failed)) {
        return {
            ...state,
            isLoading: false
        };
    }

    return state;
};

export {
    appReducer
};