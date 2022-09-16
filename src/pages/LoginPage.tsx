import React from 'react'
import {
  Card,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Icon
} from '@mui/material'
import classes from './LoginPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { ILoginData } from '../models/login'
import { AuthStore } from '../stores/Auth'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import { LoadingButton } from '@mui/lab'

const LoginPage = observer(() => {
  const navigate = useNavigate()
  const onSubmit = async (data: ILoginData) => {
    const res = await AuthStore.login(data)
    if (!res.error) navigate('/courses', { replace: true })
  }

  const [showPass, setShowPass] = React.useState(false)

  const SubmitBtn = observer(() => (
    <LoadingButton
      type="submit"
      loading={AuthStore.state === 'loading'}
      sx={{ mt: 1, display: 'flex', ml: 'auto' }}
      variant="outlined"
    >
      Подтвердить
    </LoadingButton>
  ))

  return (
    <div className={classes['login-page']}>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h4" component="h1">
          Вход
        </Typography>
        <Formik initialValues={{ email: 'common@alive.kfc', password: '12345678' }} onSubmit={onSubmit}>
          {({ values, handleSubmit, handleChange, handleBlur }) => (
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
              <TextField
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                label="email"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel>Пароль</InputLabel>
                <OutlinedInput
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  label="Пароль"
                  type={showPass ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                        <Icon>{showPass ? 'visibility_off' : 'visibility'}</Icon>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <SubmitBtn />
            </Box>
          )}
        </Formik>
      </Card>
    </div>
  )
})

export default LoginPage
