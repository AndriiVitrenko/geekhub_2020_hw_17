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

export const getList = () => (dispatch: any) => {
    fetchFunction('http://127.0.0.1:8000/api/getList', 'GET')
        .then(res => res.json())
        .then(res => {
            if (res.hasOwnProperty('error')) {
                dispatch(setError(res.error))
            }
            else {
                dispatch(setList({list: res.list, unSaved: res.unSaved}))
            }
        })
        .catch(error => dispatch(setError(error.message)))
}

export const sendTodo = (text: string) => (dispatch: any) => {
    fetchFunction(`http://127.0.0.1:8000/api/addTodo`, 'POST', {text: text})
        .then(res => {
            if (!res.ok) {
                dispatch(setError('Server error'))
            }
        })
        .catch(error => dispatch(setError(error.message)))
}

export const sendUnSavedText = (text: string) => (dispatch :any) => {
    fetchFunction(`http://127.0.0.1:8000/api/unSavedText`, 'POST', {text})
        .then(res => {
            if (!res.ok) {
                dispatch(setError('Server error'))
            }
        })
        .catch(error => dispatch(setError(error.message)))
}

export const fetchAllStates = (state: boolean) => (dispatch: any) => {
    fetchFunction(`http://127.0.0.1:8000/api/changeAllStates`, 'POST', {state})
        .then(res => {
            if (!res.ok) {
                dispatch(setError('Server error'))
            }
        })
        .catch(error => dispatch(setError(error.message)))
}

export const fetchDeletedItem = (index: number) => (dispatch: any) => {
    fetchFunction(`http://127.0.0.1:8000/api/deleteItem`, 'POST', {index})
        .then(res => {
            if (!res.ok) {
                dispatch(setError('Server error'))
            }
        })
        .catch(error => dispatch(setError(error.message)))
}

export const fetchItemState = (index :number) => (dispatch: any) => {
    fetchFunction(`http://127.0.0.1:8000/api/changeItemState`, 'PUT', {index})
        .then(res => {
            if (!res.ok) {
                dispatch(setError('Server error'))
            }
        })
        .catch(error => dispatch(setError(error.message)))
}

export const fetchEditedItem = ({index, text}: {index: number, text: string}) => (dispatch: any) => {
    fetchFunction(`http://127.0.0.1:8000/api/editItem`, 'PUT', {index, text})
        .then(res => {
            if (!res.ok) {
                dispatch(setError('Server error'))
            }
        })
        .catch(error => dispatch(setError(error.message)))
}

export const fetchCleared = () => (dispatch: any) => {
    fetchFunction(`http://127.0.0.1:8000/api/clearCompleted`, 'POST')
        .then(res => {
            if (!res.ok) {
                dispatch(setError('Server error'))
            }
        })
        .catch(error => dispatch(setError(error.message)))
}

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

function fetchFunction (url: string, method: string, body: any = undefined): Promise<Response> {
    return fetch(url, {
        method,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    })
}
