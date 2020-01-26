import { useDispatch, useSelector } from "react-redux"

import { TGlobalState } from "../..";
import { downloadExcelAsync } from "../../actions";
import { TAppState } from "../../types";

const useAppState = () => {
    const state = useSelector<TGlobalState, TAppState>(({ appModule }) => appModule);
    const dispatch = useDispatch();

    return {
        ...state,
        downloadExcel: () => downloadExcelAsync(dispatch)
    };
};

export {
    useAppState
};