import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import { Formik } from 'formik'
import { ICourseData } from '../models/courses'
import { LoadingButton } from '@mui/lab'

interface ICourseFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (form: ICourseData) => void | Promise<void>
  edit?: boolean
  loading?: boolean
  initValues?: ICourseData
}

function CourseForm({ open, onClose, onSubmit, edit, loading, initValues }: ICourseFormProps) {
  const formTypeText = edit ? 'Изменить' : 'Создать'
  const submitAndClose = async (values: ICourseData) => {
    await onSubmit(values)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{formTypeText} курс</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            title: initValues?.title ?? '',
            startingDate: initValues ? dayjs(initValues.startingDate).format('YYYY-MM-DD') : '',
            finishingDate: initValues ? dayjs(initValues.finishingDate).format('YYYY-MM-DD') : '',
            description: initValues?.description ?? ''
          }}
          onSubmit={submitAndClose}
        >
          {({ values, handleSubmit, handleChange, handleBlur }) => {
            const dayValue = (value: string) => (value ? dayjs(value, 'YYYY-MM-DD') : null)
            const handleDayChange = (field: string) => (value: Dayjs | null) => {
              handleChange(field)(value?.format('YYYY-MM-DD') ?? '')
            }

            return (
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Название"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru">
                  <DatePicker
                    label="Дата начала"
                    value={dayValue(values.startingDate)}
                    onChange={handleDayChange('startingDate')}
                    renderInput={params => (
                      <TextField {...params} name="startingDate" onBlur={handleBlur} fullWidth margin="normal" />
                    )}
                  />
                  <DatePicker
                    label="Дата окончания"
                    value={dayValue(values.finishingDate)}
                    onChange={handleDayChange('finishingDate')}
                    renderInput={params => (
                      <TextField {...params} name="finishingDate" onBlur={handleBlur} fullWidth margin="normal" />
                    )}
                  />
                </LocalizationProvider>
                <TextField
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Описание"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={6}
                />
                <DialogActions sx={{ mb: -2.5, mx: -3 }}>
                  <Button onClick={onClose}>Отмена</Button>
                  <LoadingButton loading={loading} type="submit">
                    {formTypeText}
                  </LoadingButton>
                </DialogActions>
              </Box>
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default CourseForm
