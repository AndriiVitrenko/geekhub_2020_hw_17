import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IAppState, IState } from '../../interfaces';
import socket from '../../api/socket';
import {
  addTodo,
  changeAllStates,
  changeItemState,
  clearCompleted,
  deleteItem, editItem,
  setUnsavedTodo
} from '../../store/todoListSlice';
import { getList } from '../../api/actions';
import { Header } from '../Header';
import { Input } from '../Input';
import { TodoList } from '../TodoList';
import { Footer } from '../Footer';

export const Main: FC = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: IState) => state);

  const [ state ] = useState<IAppState>({
    isMarked: list.filter(item => item.isDone).length === list.length
      || list.filter(item => item.isDone).length === 0,
    isEditing: false,
    isTyping: false,
  });

  useEffect(() => {
    console.log('reloaded');
    socket.on('item:added', ({text}) => {
      dispatch(addTodo(text));
    });

    socket.on('item:unSaved', ({text}) => {
      dispatch(setUnsavedTodo(text));
    });

    socket.on('item:changedState', ({index}) => {
      dispatch(changeItemState(index));
    });

    socket.on('item:deleted', ({index}) => {
      dispatch(deleteItem(index));
    });

    socket.on('list:changedAllStates', ({state}) => {
      dispatch(changeAllStates(state));
    });

    socket.on('list:cleared', () => {
      dispatch(clearCompleted());
    });

    socket.on('item:edited', ({index, text}) => {
      dispatch(editItem({index, text}));
    });

    dispatch(getList());
  })

  return (
    <>
      <section className="todoapp">
        <Header parentState={state} />

        <section className="main">
          <Input parentState={state} />

          <Router>
            <Switch>
              <Route exact path='/:filter([a-zA-z]+)?'>
                <TodoList />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </section>
      </section>
    </>
  );
}
