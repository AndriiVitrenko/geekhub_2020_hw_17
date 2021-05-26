import {setError, setList} from '../store/todoListSlice';

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
