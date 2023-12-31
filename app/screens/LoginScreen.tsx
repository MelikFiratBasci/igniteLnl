// LoginScreen.tsx

import React, { FC, useContext, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { api } from "../services/api"
import { LoginModel } from "../models/LoginModel"
import { Context as AuthContext } from "../context/AuthContext"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { AuthenticationStoreModel } from "../models/AuthenticationStore"
interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>()
  const [authEmail, setAuthEmail] = useState("tuna")

  const [authPassword, setAuthPassword] = useState("SAas1214.")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)


  const {
    authenticationStore: { setAuthToken, validationError },
  } = useStores()

  const authContext = useContext(AuthContext)
  console.log("authContext", authContext)

  const apiError = isSubmitted ? validationError : ""

  async function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    // Create a LoginModel instance with the entered username and password
    const loginData: LoginModel = {
      username: authEmail,
      password: authPassword,
    }

    try {

      const response = await authContext.signin(loginData)
      if (response.kind === "ok") {
        setIsSubmitted(false)
        setAuthPassword("")
        setAuthEmail("")
        setAuthToken(response.data.accessToken)
        console.log("Access Token:", response.data.accessToken)

      } else {
        const error = response.data.message
       console.error("API isteği sırasında bir hata oluştu:", error)
      }
    } catch (error) {
      console.error("API isteği sırasında bir hata oluştu:", error)
      if (apiError) {
        setAuthPassword("")
      }
      setIsSubmitted(false)
      return
    } finally {
      setAttemptsCount(attemptsCount + 1)
    }
  }

  // We'll mock this with a fake token.

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="reversed"
        onPress={login}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

// @demo remove-file