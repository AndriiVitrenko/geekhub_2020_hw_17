export interface ITodo {
    text: string
    index: number
    isDone: boolean
}

export interface IUnsavedTodo {
    text: string
    unSaved: boolean
    isDone: boolean
}

export interface IState {
    list: ITodo[]
    error: string | null
    unSaved?: IUnsavedTodo
}

export interface IAppState {
    isMarked: boolean
    isTyping: boolean
    isEditing: boolean
}

export interface IHeaderProps {
    parentState: IAppState
}

export interface ITodoItemProps {
    item: ITodo | IUnsavedTodo
    index: number
    isEditing?: boolean
}

export interface IInputProps {
    parentState: IAppState
}
