import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {sendTodo, sendUnSavedText} from "../dataBase/todoListSlice";
import {IHeaderProps, IState} from '../interfaces';

export function Header({parentState}: IHeaderProps) {
    const error = useSelector((state: IState) => state.error)
    const dispatch = useDispatch()

    const keyPressHandler = useCallback((e) => {
        if (e.key === 'Enter' && e.target.value) {
            parentState.isTyping = false;
            dispatch(sendTodo(e.target.value))
            e.target.value = ''
        }
    }, [dispatch, parentState])

    const onChangeHandler = useCallback((e) => {
        parentState.isTyping = true;
        dispatch(sendUnSavedText(e.target.value))
    }, [dispatch, parentState])

    return(
        <header className="header">
            <h1>todos</h1>
            {!!error && <p className='error-text'>{error}</p>}
            <input className="new-todo" type="text" placeholder="What needs to be done?"
                   autoFocus={!parentState.isEditing}
                   onChange={onChangeHandler} onKeyPress={keyPressHandler}/>
        </header>
    )
}
