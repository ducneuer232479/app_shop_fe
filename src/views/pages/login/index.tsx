// Import Next
import { NextPage } from 'next'

// Import React
import { useState } from 'react'

// Import MUI
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Typography,
  Container,
  CssBaseline,
  InputAdornment,
  IconButton
} from '@mui/material'

// Import component
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'

// form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

type TProps = {}

const LoginPage: NextPage<TProps> = () => {
  // State
  const [showPassword, setShowPassword] = useState(false)

  const schema = yup
    .object()
    .shape({
      email: yup.string().required('The field is required').matches(EMAIL_REG, 'The field is must email type'),
      password: yup
        .string()
        .required('The field is required')
        .matches(PASSWORD_REG, 'The password is contain character, special character, number')
    })
    .required()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string }) => {
    console.log('data', data)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
          <Box sx={{ mt: 2 }}>
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
          </Box>

          <Box sx={{ mt: 2 }}>
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

          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default LoginPage
