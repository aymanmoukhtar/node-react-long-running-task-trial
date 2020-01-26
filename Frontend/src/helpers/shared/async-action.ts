import { Dispatch } from "react";
import { AnyAction } from "redux";
import { AsyncActionCreators } from "typescript-fsa";

const async = <TParameters, TSuccess, TError>(
    action: AsyncActionCreators<TParameters | undefined, TSuccess, TError>,
    worker: (params?: TParameters) => Promise<TSuccess>
) => (
    dispatch: Dispatch<AnyAction>,
    params?: TParameters
) => {
        dispatch(action.started(params));

        return worker(params)
            .then(result =>
                dispatch(action.done({ params, result }))
            )
            .catch(error =>
                dispatch(action.failed({ params, error }))
            );
    };

export {
    async
};