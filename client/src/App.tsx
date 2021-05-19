import {useState, useEffect} from 'react';
import {TodoList} from "./components/TodoList";
import {useDispatch, useSelector} from "react-redux";
import {
  getList,
  changeAllStates,
  addTodo,
  deleteItem,
  setUnsavedTodo,
  changeItemState,
  clearCompleted,
  editItem,
} from "./dataBase/todoListSlice";
import {Footer} from "./components/Footer";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import socket from './socket';
import {IAppState, IState} from './interfaces';
import {Header} from "./components/Header";
import {Input} from "./components/Input";

function App() {
  const dispatch = useDispatch()
  const {list} = useSelector((state: IState) => state)

  const [state] = useState<IAppState>({
    isMarked: list.filter(item => item.isDone).length === list.length
        || list.filter(item => item.isDone).length === 0,
    isEditing: false,
    isTyping: false,
  })

  useEffect(() => {
    console.log('reloaded')
        socket.on('item:added', ({text}) => {
          dispatch(addTodo(text))
        })

        socket.on('item:unSaved', ({text}) => {
          dispatch(setUnsavedTodo(text))
        })

        socket.on('item:changedState', ({index}) => {
          dispatch(changeItemState(index))
        })

        socket.on('item:deleted', ({index}) => {
          dispatch(deleteItem(index))
        })

        socket.on('list:changedAllStates', ({state}) => {
          dispatch(changeAllStates(state))
        })

        socket.on('list:cleared', () => {
          dispatch(clearCompleted())
        })

        socket.on('item:edited', ({index, text}) => {
          dispatch(editItem({index, text}))
        })

        dispatch(getList())
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

export default App
