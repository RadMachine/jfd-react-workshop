import { CircularProgress, Icon, IconButton, Paper, Toolbar, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CourseForm from '../components/CourseForm'
import SimpleDialog from '../components/SimpleDialog'
import { ICourseData } from '../models/courses'
import { CoursesStore } from '../stores/Courses'

const CoursePage = observer(() => {
  const courseId = Number(useParams().courseId)
  const navigate = useNavigate()
  const toHome = () => navigate('/courses')

  React.useEffect(() => {
    CoursesStore.fetchById(courseId)
  }, [courseId])

  const [showForm, setShowForm] = React.useState(false)
  const openForm = () => setShowForm(true)
  const onFormClose = () => setShowForm(false)
  const onFormSubmit = async (data: ICourseData) => {
    await CoursesStore.update(courseId, data)
  }

  const [showDeleteDialog, setDeleteDialog] = React.useState(false)
  const openDeleteDialog = () => setDeleteDialog(true)
  const onDeleteDialogClose = () => setDeleteDialog(false)
  const onDeleteDialogSubmit = async () => {
    await CoursesStore.delete(courseId)
    navigate('/courses')
  }

  return (
    <Paper sx={{ width: '100%' }}>
      {CoursesStore.course.state === 'loading' ? (
        <Box sx={{ p: 10 }}>
          <CircularProgress sx={{ display: 'block', mx: 'auto' }} />
        </Box>
      ) : (
        CoursesStore.course.data && (
          <>
            <Toolbar>
              <Typography component="div" variant="h6" sx={{ flex: 1 }}>
                {CoursesStore.course.data.title}
              </Typography>
              <Tooltip title="Изменить курс">
                <IconButton onClick={openForm}>
                  <Icon>edit</Icon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Удалить курс">
                <IconButton onClick={openDeleteDialog}>
                  <Icon>delete</Icon>
                </IconButton>
              </Tooltip>
              <Tooltip title="К списку курсов">
                <IconButton onClick={toHome}>
                  <Icon>list</Icon>
                </IconButton>
              </Tooltip>
            </Toolbar>
            <CourseForm
              edit
              open={showForm}
              onClose={onFormClose}
              onSubmit={onFormSubmit}
              initValues={CoursesStore.course.data}
              loading={CoursesStore.course.updateState === 'loading'}
            />
            <SimpleDialog
              title="Вы действительно хотите удалить курс?"
              open={showDeleteDialog}
              onClose={onDeleteDialogClose}
              onSubmit={onDeleteDialogSubmit}
              loading={CoursesStore.course.updateState === 'loading'}
            />
            <Box sx={{ px: 3, pb: 3 }}>
              <Box>
                <Typography
                  component="span"
                  variant="body1"
                  color="white"
                  sx={{ backgroundColor: 'primary.main', p: 0.5 }}
                >
                  {dayjs(CoursesStore.course.data.startingDate).format('DD.MM.YYYY')}
                  {' - '}
                  {dayjs(CoursesStore.course.data.finishingDate).format('DD.MM.YYYY')}
                </Typography>
                <Typography component="p" variant="body1" sx={{ mt: 2 }}>
                  {CoursesStore.course.data.description}
                </Typography>
              </Box>
            </Box>
          </>
        )
      )}
    </Paper>
  )
})

export default CoursePage
