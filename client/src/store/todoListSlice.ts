import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IState, ITodo, IUnsavedTodo} from '../interfaces'

const todoListSlice = createSlice({
    name: 'todolist',
    initialState: {
        list: [],
        error: null
    } as IState,
    reducers: {
        setList(state, action: PayloadAction<{list: ITodo[], unSaved?: IUnsavedTodo}>) {
          state.list = action.payload.list || state.list;
          state.unSaved = action.payload.unSaved
        },
        changeItemState(state, action: PayloadAction<number>) {
            state.list[action.payload].isDone = !state.list[action.payload].isDone
        },
        deleteItem(state, action: PayloadAction<number>) {
            state.list.splice(action.payload, 1)
        },
        clearCompleted(state) {
            state.list = state.list.filter(elem => !elem.isDone)
            state.list.forEach((item, index) => item.index = index)
        },
        editItem(state, action: PayloadAction<{index: number, text: string}>) {
            state.list[action.payload.index].text = action.payload.text
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        addTodo(state, action: PayloadAction<string>) {
            state.unSaved = undefined

            state.list.unshift({
                text: action.payload,
                index: 0,
                isDone: false,
            })

            state.list.forEach((item, index) => item.index = index)
        },
        setUnsavedTodo(state, action: PayloadAction<string>) {
            if (action.payload) {
                if (state.unSaved) {
                    state.unSaved.text = action.payload;
                }
                else {
                    state.unSaved = {
                        text: action.payload,
                        unSaved: true,
                        isDone: false,
                    }
                }
            }
            else {
                state.unSaved = undefined
            }
        },
        changeAllStates(state, action) {
            state.list.forEach(item => item.isDone = action.payload)
        }
    }
})

export default todoListSlice.reducer
export const {
    setList,
    setError,
    addTodo,
    setUnsavedTodo,
    changeItemState,
    changeAllStates,
    deleteItem,
    clearCompleted,
    editItem,
} = todoListSlice.actions

