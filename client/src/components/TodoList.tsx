import {useParams} from 'react-router-dom';
import {TodoItem} from './TodoItem';
import {IState} from '../interfaces';
import {useSelector} from 'react-redux';

export function TodoList() {
    const { list, unSaved } = useSelector((state: IState) => state)
    const params: {
        filter?: string;
        type?: 'filter' | 'id';
        isEditing?: string;
    } = {...useParams()};
    // params.type = (params.data && params.data.includes(':')) ? 'id' : 'filter';
    // const idData: number = (list.length && params.data) ? Math.min(+params.data.slice(1), list.length - 1) : 0;
    console.log(useParams())

    return (
        <>
            {
                // params.type === 'filter' ?
                    <ul className='todo-list'>
                        {unSaved && !params.filter && <TodoItem item={unSaved} index={-1} />}
                        {list.map((todo, i) => {
                            if (params.filter === undefined || (params.filter === 'active' && !todo.isDone) || (params.filter === 'completed' && todo.isDone)) {
                                return <TodoItem item={todo} index={i} key={i}/>
                            }
                        })}
                    </ul>
            }
                    {/*</ul> :*/}
                    {/*<ul className='todo-list'>*/}
                    {/*    {params.data !== null &&*/}
                    {/*        <TodoItem*/}
                    {/*            item = {list[idData]}*/}
                    {/*            key = {idData}*/}
                    {/*            index = {idData}*/}
                    {/*            isEditing = {!!params.isEditing}*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*</ul>*/}
        </>
    )
}
