// ** React
import { FC } from 'react'

// ** NExt
import { NextRouter, useRouter } from 'next/router'

// ** Libraries
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

// ** Config
import { BASE_URL, CONFIG_API } from 'src/configs/api'

// ** Type
import { UserDataType } from 'src/contexts/types'

// ** Hook
import { useAuth } from 'src/hooks/useAuth'

// ** Helper
import { clearLocalUserData, getLocalUserData } from '../storage'

type TAxiosInterceptor = {
  children: React.ReactNode
}

const instanceAxios = axios.create({
  baseURL: BASE_URL
})

const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
  if (router.asPath !== '/') {
    router.replace({
      pathname: '/login',
      query: { returnUrl: router.asPath }
    })
  } else {
    router.replace('/login')
  }
  setUser(null)
  clearLocalUserData()
}

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
  const router = useRouter()

  const { setUser } = useAuth()

  instanceAxios.interceptors.request.use(async config => {
    const { accessToken, refreshToken } = getLocalUserData()

    if (accessToken) {
      const decodedAccessToken: any = jwtDecode(accessToken)

      if (decodedAccessToken.exp > Date.now() / 1000) {
        config.headers['Authorization'] = `Bear ${accessToken}`
      } else {
        if (refreshToken) {
          const decodedRefreshToken: any = jwtDecode(refreshToken)

          if (decodedRefreshToken.exp > Date.now() / 1000) {
            // Call api return new access token
            await axios
              .post(
                `${CONFIG_API.AUTH.INDEX}/refresh-token`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`
                  }
                }
              )
              .then(res => {
                const newAccessToken = res.data.data.access_token
                if (newAccessToken) {
                  config.headers['Authorization'] = `Bear ${newAccessToken}`
                } else {
                  handleRedirectLogin(router, setUser)
                }
              })
              .catch(e => {
                handleRedirectLogin(router, setUser)
              })
          } else {
            handleRedirectLogin(router, setUser)
          }
        } else {
          handleRedirectLogin(router, setUser)
        }
      }
    } else {
      handleRedirectLogin(router, setUser)
    }

    return config
  })

  instanceAxios.interceptors.response.use(response => {
    return response
  })

  return <>{children}</>
}

export default instanceAxios
export { AxiosInterceptor }
