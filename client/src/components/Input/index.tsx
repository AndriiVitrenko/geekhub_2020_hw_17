import { useCallback, FC } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllStates } from '../../api/actions';
import { IInputProps } from '../../interfaces';

export const Input: FC<IInputProps> = ({parentState}) => {
    const dispatch = useDispatch();

    const stateChanger = useCallback(
        () => {
            parentState.isMarked = !parentState.isMarked;
            dispatch(fetchAllStates(parentState.isMarked));
        }
        , [ parentState, dispatch ])

    return (
        <>
            <input id="toggle-all" className="toggle-all" type="checkbox"
                   checked={parentState.isMarked} readOnly/>
            <label htmlFor="toggle-all" onClick={stateChanger}>Mark all as complete</label>
        </>
    );
}
