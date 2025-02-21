/* eslint-disable @typescript-eslint/no-unused-vars */
// Import Next
import { NextPage } from 'next'
import Image from 'next/image'

// Import React
import { useState } from 'react'

// Import MUI
import {
  Box,
  Button,
  Typography,
  CssBaseline,
  InputAdornment,
  IconButton,
  useTheme,
  Grid,
  Card,
  Avatar
} from '@mui/material'

// Import component
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'

// form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Configs
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

// Images
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'
import Link from 'next/link'
import IconifyIcon from 'src/components/Icon'

type TProps = {}

type TDefaultValue = {
  email: string
  password: string
  confirmPassword: string
}

const MyProfilePage: NextPage<TProps> = () => {
  // State
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Theme
  const theme = useTheme()

  const schema = yup.object().shape({
    email: yup.string().required('The field is required').matches(EMAIL_REG, 'The field is must email type'),
    password: yup
      .string()
      .required('The field is required')
      .matches(PASSWORD_REG, 'The password is contain character, special character, number'),
    confirmPassword: yup
      .string()
      .required('The field is required')
      .matches(PASSWORD_REG, 'The password is contain character, special character, number')
      .oneOf([yup.ref('password'), ''], 'The confirm password is must match with password')
  })

  const defaultValues: TDefaultValue = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: TDefaultValue) => {
    console.log('data', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
      <Card
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '15px',
          p: 4
        }}
      >
        <Grid container spacing={5}>
          <Grid container item md={6} xs={12} spacing={5}>
            <Grid item md={12} xs={12}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                <Avatar sx={{ width: 100, height: 100 }}>
                  {/* {user?.avatar ? (
                  <Image src={user?.avatar || ''} alt='avatar' style={{ height: 'auto', width: 'auto' }} />
                ) : (
                  <IconifyIcon icon='ph:user-thin' />
                )} */}
                  <IconifyIcon icon='ph:user-thin' />
                </Avatar>
                <Button variant='outlined' sx={{ width: 'auto' }}>
                  Tải lên
                </Button>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Input email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Input email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container item md={6} xs={12} spacing={5}>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Input email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Input email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Input email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    label='Email'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Input email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>

      {/* <Box sx={{ mt: 2, width: '300px' }}>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name='password'
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextField
              required
              fullWidth
              label='Password'
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder='Input password'
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(show => !show)}>
                      {showPassword ? (
                        <Icon icon='material-symbols:visibility-outline' />
                      ) : (
                        <Icon icon='material-symbols:visibility-off-outline' />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Box>

      <Box sx={{ mt: 2, width: '300px' }}>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name='confirmPassword'
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextField
              required
              fullWidth
              label='Confirm password'
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder='Enter confirm password'
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowConfirmPassword(show => !show)}>
                      {showConfirmPassword ? (
                        <Icon icon='material-symbols:visibility-outline' />
                      ) : (
                        <Icon icon='material-symbols:visibility-off-outline' />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Box> */}

      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'end' }}>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
          Thay đổi
        </Button>
      </Box>
    </form>
  )
}

export default MyProfilePage
