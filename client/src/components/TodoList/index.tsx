import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TodoItem } from '../TodoItem';
import { IState } from '../../interfaces';

export const TodoList: FC = () => {
    const { list, unSaved } = useSelector((state: IState) => state);
    const params: {
        filter?: string;
        type?: 'filter' | 'id';
        isEditing?: string;
    } = {...useParams()};

    return (
        <ul className='todo-list'>
            {unSaved && !params.filter && <TodoItem item={unSaved} index={-1} />}
            {list.map((todo, i) => {
                if (params.filter === undefined || (params.filter === 'active' && !todo.isDone) || (params.filter === 'completed' && todo.isDone)) {
                    return <TodoItem item={todo} index={i} key={i}/>
                }
            })}
        </ul>
    );
}
