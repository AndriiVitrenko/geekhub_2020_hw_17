import { useCallback, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchItemState, fetchDeletedItem, fetchEditedItem } from '../../api/actions';
import { ITodoItemProps } from '../../interfaces';

export const TodoItem: FC<ITodoItemProps> = ({item, index, isEditing}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onChangeHandler = useCallback(
        () => {
            dispatch(fetchItemState(index));
        }
    , [ index, dispatch ])

    const deleteHandler = useCallback(
        () => {
            dispatch(fetchDeletedItem(index));
        }
    , [ index, dispatch ])

    const itemChangeHandler = useCallback(
        (event) => {
            const text = event.target.value;
            const body = {
                index,
                text,
            };
            dispatch(fetchEditedItem(body));
        }
    , [ index, dispatch ])

    const onBlurHandler = useCallback(
        () => {
            history.push(`/:${index}`);
        }
    , [ history, index ])

    const onKeyPressHandler = useCallback(
        (event) => {
            if (event.key === 'Enter') {
                onBlurHandler();

                if (!event.target.value) {
                    dispatch(fetchDeletedItem(index));
                }
            }
        }
    , [ onBlurHandler, dispatch, index ])

    return (
        <li className={(item.isDone ? 'completed ' : '') + (isEditing ? 'editing ' : '')}>
            <div className='view'>
                {
                    !item.hasOwnProperty('unSaved') ? <input className="toggle" type="checkbox" checked={item.isDone} onChange={onChangeHandler} />
                    : <input className="toggle" type="checkbox" checked={item.isDone} readOnly />
                }
                <label>{item.text}</label>
                {
                    !item.hasOwnProperty('unSaved') ? <button className="destroy" onClick={deleteHandler} />
                    : <button className="destroy"/>
                }
            </div>

            {
                !item.hasOwnProperty('unSaved') ? <input type="text" className='edit' autoFocus={isEditing} value={item.text} onChange={itemChangeHandler} onBlur={onBlurHandler} onKeyPress={onKeyPressHandler} />
                : <></>
            }
        </li>
    );
}
