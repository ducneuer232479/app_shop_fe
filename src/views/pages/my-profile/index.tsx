/* eslint-disable @typescript-eslint/no-unused-vars */
// Import Next
import { NextPage } from 'next'
import Image from 'next/image'

// Import React
import { useEffect, useState } from 'react'

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
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import { useAuth } from 'src/hooks/useAuth'

type TProps = {}

type TDefaultValue = {
  email: string
  address: string
  city: string
  phoneNumber: string
  role: string
  fullName: string
}

const MyProfilePage: NextPage<TProps> = () => {
  // State
  const { user } = useAuth()

  // Theme
  const theme = useTheme()

  const { t } = useTranslation()

  const schema = yup.object().shape({
    email: yup.string().required('The field is required').matches(EMAIL_REG, 'The field is must email type'),
    fullName: yup.string().required('The field is required'),
    address: yup.string().required('The field is required'),
    city: yup.string().required('The field is required'),
    phoneNumber: yup.string().required('The field is required'),
    role: yup.string().required('The field is required')
  })

  const defaultValues: TDefaultValue = {
    email: '',
    address: '',
    city: '',
    phoneNumber: '',
    role: '',
    fullName: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    console.log('data', data)
  }

  const handleUploadAvatar = (file: File) => {}

  useEffect(() => {
    if (user) {
      reset({
        email: '',
        address: '',
        city: '',
        phoneNumber: '',
        fullName: '',
        role: user?.role.name
      })
    }
  }, [user])

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
      <Grid container>
        <Grid
          container
          item
          md={6}
          xs={12}
          sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}
        >
          <Box sx={{ width: '100%', height: '100%' }}>
            <Grid container spacing={4}>
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
                    <IconifyIcon icon='ph:user-thin' fontSize={70} />
                  </Avatar>
                  <WrapperFileUpload
                    uploadFunc={handleUploadAvatar}
                    objectAcceptFile={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['png'] }}
                  >
                    <Button variant='outlined' sx={{ width: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Icon icon='ph:camera-thin' />
                      {t('Upload_avatar')}
                    </Button>
                  </WrapperFileUpload>
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
                      placeholder={t('Enter_your_email')}
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
                  name='role'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Role')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      disabled
                      placeholder={t('Enter_your_role')}
                      error={Boolean(errors.role)}
                      helperText={errors.role?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid container item md={6} xs={12} mt={{ md: 0, xs: 5 }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              backgroundColor: theme.palette.background.paper,
              borderRadius: '15px',
              py: 5,
              px: 4
            }}
            marginLeft={{ md: 5, xs: 0 }}
          >
            <Grid container spacing={4}>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  name='fullName'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Full_name')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_your_full_name')}
                      error={Boolean(errors.fullName)}
                      helperText={errors.fullName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name='address'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Address')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_your_address')}
                      error={Boolean(errors.address)}
                      helperText={errors.address?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name='city'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('City')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_your_city')}
                      error={Boolean(errors.city)}
                      helperText={errors.city?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name='phoneNumber'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Phone_number')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_your_phone')}
                      error={Boolean(errors.phoneNumber)}
                      helperText={errors.phoneNumber?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

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
