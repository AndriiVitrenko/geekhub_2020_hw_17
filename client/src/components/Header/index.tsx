import { useCallback, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendTodo, sendUnSavedText } from '../../api/actions';
import { IHeaderProps, IState } from '../../interfaces';

export const Header: FC<IHeaderProps> = ({parentState}) => {
    const error = useSelector((state: IState) => state.error);
    const dispatch = useDispatch();

    const keyPressHandler = useCallback((e) => {
        if (e.key === 'Enter' && e.target.value) {
            parentState.isTyping = false;
            dispatch(sendTodo(e.target.value));
            e.target.value = '';
        }
    }, [ dispatch, parentState ])

    const onChangeHandler = useCallback((e) => {
        parentState.isTyping = true;
        dispatch(sendUnSavedText(e.target.value));
    }, [ dispatch, parentState ]);

    return (
        <header className="header">
            <h1>todos</h1>
            {!!error && <p className='error-text'>{error}</p>}
            <input className="new-todo" type="text" placeholder="What needs to be done?"
                   autoFocus={!parentState.isEditing}
                   onChange={onChangeHandler} onKeyPress={keyPressHandler}/>
        </header>
    );
}
