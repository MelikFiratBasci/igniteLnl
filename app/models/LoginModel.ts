// LoginModel.ts

export interface LoginModel {
  username: string // Kullanıcı adı
  password: string // Parola
}

export interface AuthResponse {
  accessToken: string // Oturum açma başarılı ise dönen erişim belirteci
  // Diğer oturum bilgileri veya kullanıcı bilgileri
}

export interface BadAuthResponse {
  statusCode: any
  message: string
  error: string
}
