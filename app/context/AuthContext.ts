import AsyncStorage from "@react-native-async-storage/async-storage"
import createDataContext from "./createDataContext"
import { api } from "../services/api"
import { Dispatch } from "react"
import { LoginModel } from "app/models/LoginModel"
import axios, { AxiosResponse } from "axios"
import { useStores } from "../models"
import { AuthenticationStoreModel } from "../models/AuthenticationStore"
import { ApiErrorResponse, ApiOkResponse } from "apisauce" // @demo remove-current-line

interface DataState {
  accessToken: string | null
  errorMessage: string
}

interface Action {
  type: string
  payload?: any
}

const authStore = AuthenticationStoreModel.create({}) // @demo remove-current-line

const authReducer = (state: DataState, action: Action): DataState => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload }
    case "signup":
      return { errorMessage: "", accessToken: action.payload }
    case "signin":
      return { errorMessage: "", accessToken: action.payload }
    case "clear_error_message":
      return { ...state, errorMessage: "" }
    case "signout":
      return { accessToken: null, errorMessage: "" }
    default:
      return state
  }
}

const tryLocalSignin = (dispatch: Dispatch<Action>) => async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken")
    if (accessToken) {
      authStore.setAuthToken(accessToken) // authStore içindeki authToken değerini güncelle
      dispatch({ type: "signin", payload: accessToken })

      return accessToken
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}


const clearErrorMessage = (dispatch: Dispatch<Action>) => () => {
  dispatch({ type: "clear_error_message" })
}

const signup =
  (dispatch: Dispatch<Action>) =>
    async ({ username, password }: LoginModel) => {
      try {

        const response: AxiosResponse<{ accessToken: string }> = await axios.post("/signup", {
          username,
          password,
        })
        if (response.data && response.data.accessToken) {
          await AsyncStorage.setItem("accessToken", response.data.accessToken)
          api.apisauce.setHeader("Authorization", `Bearer ${response.data.accessToken}`)
          authStore.setAuthToken(response.data.accessToken)
          dispatch({ type: "signup", payload: response.data.accessToken })
        }
      } catch (error) {
        console.log(error)
        dispatch({
          type: "add_error",
          payload: "something went wrong with sign up",
        })
      }
    }

const signin =
  (dispatch: Dispatch<Action>) =>
    async ({ username, password }: LoginModel) => {
      try {
        const response = await api.post(`${api.config.url}/users/signin`, {
          username,
          password,

        })

        if (response.data && response.data.accessToken) {
          // await AsyncStorage.setItem("accessToken", response.data.accessToken)
          api.apisauce.setHeader("Authorization", `Bearer ${response.data.accessToken}`)
          authStore.setAuthToken(response.data.accessToken)
          console.log("ACCESS TOKEB BU", response.data.accessToken)
          dispatch({ type: "signin", payload: response.data.accessToken })
          return response
        }
      } catch (error) {

        console.log(error)
        dispatch({
          type: "add_error",
          payload: "something went wrong with sign in",
        })

      }
    }

const signout = (dispatch: Dispatch<Action>) => async () => {
  try {
    await AsyncStorage.removeItem("accessToken")
    dispatch({ type: "signout" })
    authStore.logout()
  } catch (error) {
    console.log(error)
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, clearErrorMessage, tryLocalSignin },
  { accessToken: null, errorMessage: "" },
)
