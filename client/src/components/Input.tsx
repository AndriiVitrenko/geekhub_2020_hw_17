import {useCallback} from "react";
import {fetchAllStates} from "../dataBase/todoListSlice";
import {useDispatch} from "react-redux";
import {IInputProps} from '../interfaces';

export function Input({parentState}: IInputProps) {
    const dispatch = useDispatch()

    const stateChanger = useCallback(
        () => {
            parentState.isMarked = !parentState.isMarked;
            dispatch(fetchAllStates(parentState.isMarked))
        }
        , [parentState, dispatch])

    return(
        <>
            <input id="toggle-all" className="toggle-all" type="checkbox"
                   checked={parentState.isMarked} readOnly/>
            <label htmlFor="toggle-all" onClick={stateChanger}>Mark all as complete</label>
        </>
    )
}
