import React, { useReducer, FunctionComponent, Reducer, Dispatch } from "react"

interface DataState {}

interface Action {
  type: string
  payload: any
}
export default <T extends {}>(
  reducer: Reducer<DataState, Action>,
  actions: T,
  defaultValue: DataState,
) => {
  type BoundActions<T> = {
    [K in keyof T]: T[K] extends (d: Dispatch<Action>) => infer R ? R : never
  }
  type ContextValue<T> = {
    state: DataState
  } & BoundActions<T>

  // context needs a defaultValue
  const Context = React.createContext({ state: defaultValue } as ContextValue<T>)

  // type of children is known by assigning the type FunctionComponent to Provider

  //@ts-ignore
  const Provider: FunctionComponent = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue)

    const boundActions = {} as BoundActions<T>
    for (let key in actions) {
      // @ts-ignore - I don't want to make a confusing mess so just ignore this
      boundActions[key] = actions[key](dispatch)
    }

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>
  }

  return { Context, Provider }
}
