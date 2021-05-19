import {fetchCleared} from "../dataBase/todoListSlice";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from 'react';
import {NavLink} from "react-router-dom";
import {IState} from '../interfaces';   

export function Footer() {
    const dispatch = useDispatch()
    const listLength = useSelector((state: IState) => state.list.length)
    const doneTodosAmount = useSelector((state: IState) => state.list.filter(item => item.isDone).length)

    const clearHandler = useCallback(
        () => {
            dispatch(fetchCleared())
        }
    , [dispatch])

    return(
        <footer className="footer">
            <span className="todo-count"><strong>{listLength - doneTodosAmount}</strong> item left</span>
            <ul className="filters">
                <li>
                    <NavLink exact to="/" activeClassName="selected" >All</NavLink>
                </li>
                <li>
                    <NavLink to="/active" activeClassName='selected' >Active</NavLink>
                </li>
                <li>
                    <NavLink to="/completed" activeClassName='selected' >Completed</NavLink>
                </li>
            </ul>
            {doneTodosAmount ? <button className="clear-completed" onClick = {clearHandler}>Clear completed</button> : <></>}
        </footer>
    )

}
