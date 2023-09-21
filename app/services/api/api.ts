import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { EpisodeSnapshotIn } from "../../models/Episode"
import axios, { AxiosRequestConfig } from "axios"

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: config.url, // Base URL'yi burada kullanın
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getEpisodes(): Promise<{ kind: "ok"; episodes: EpisodeSnapshotIn[] } | GeneralApiProblem> {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `/users/signin`, // Base URL'yi kullanarak yolu düzenleyin
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data

      const episodes: EpisodeSnapshotIn[] = rawData.items.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", episodes }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async login(loginData: { username: string; password: string }): Promise<ApiLoginResponse> {
    try {
      const response = await axios.post(`${this.config.url}/users/signin`, loginData) // Base URL'yi kullanarak URL'yi düzenleyin
      if (response.data.accessToken) {
        const accessToken = response.data.accessToken

        this.apisauce.setHeader("Authorization", `Bearer ${accessToken}`)

        return {
          kind: "ok",
          temporary: false,
          message: "Login successful",
          accessToken: accessToken,
        }
      } else {
        const error = response.statusText
        return { kind: "rejected", temporary: false, message: error }
      }
    } catch (error) {
      console.error("API isteği sırasında bir hata oluştu:", error)
      return { kind: "rejected", temporary: false, message: "API isteği sırasında bir hata oluştu" }
    }
  }

  async post<T, U = T>(
    url: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig,
  ): Promise<ApiResponse<T, U>> {
    try {
      // Özelleştirilmiş istek yapılandırmalarını axiosConfig parametresi olarak iletebilirsiniz
      // Örnekte "headers" özelliğini ekliyoruz
      const customAxiosConfig: AxiosRequestConfig = {
        ...axiosConfig,
        headers: {
          ...axiosConfig?.headers, // Mevcut başlıkları koruyun
          "x-ray": "machine", // Yeni başlık ekleyin veya mevcut başlığı değiştirin
        },
      }

      // Burada axios veya apisauce gibi HTTP istemcisini kullanarak isteği gönderin
      const response: ApiResponse<T, U> = await axios.post(url, data, customAxiosConfig)

      // Başarılı bir yanıtı döndürün
      return response
    } catch (error) {
      // Hata yakalama ve işleme burada yapılabilir
      // Dilediğiniz gibi hata mesajlarını işleyebilir ve özelleştirebilirsiniz
      console.error("API isteği sırasında bir hata oluştu:", error)

      // Örnek olarak bir hata nesnesi dönebilirsiniz
      return {
        ok: false,
        problem: "UNKNOWN_ERROR",
        // Ek olarak, 'data' ve diğer özellikleri de eklemeyi unutmayın
      }
    }
  }
}

export const api = new Api()

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

export interface ApiLoginResponse {
  kind: "ok" | "rejected"
  temporary: boolean
  message: string
  accessToken?: string
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
