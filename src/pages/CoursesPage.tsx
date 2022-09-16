import {
  CircularProgress,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CourseForm from '../components/CourseForm'
import { ICourse, ICourseData } from '../models/courses'
import { CoursesStore } from '../stores/Courses'

const CoursesPage = observer(() => {
  const navigate = useNavigate()

  React.useEffect(() => {
    CoursesStore.fetch()
  }, [])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleClick = (event: React.MouseEvent<unknown>, id: ICourse['id']) => {
    navigate(`/courses/${id}`)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - CoursesStore.list.data.length) : 0

  const [showForm, setShowForm] = React.useState(false)
  const openForm = () => setShowForm(true)
  const onFormClose = () => setShowForm(false)
  const onFormSubmit = async (data: ICourseData) => {
    const res = await CoursesStore.create(data)
    if (!res.error) navigate(`/courses/${res.data.data.id}`)
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Toolbar>
        <Typography component="div" variant="h6" sx={{ flex: 1 }}>
          Курсы
        </Typography>
        <Tooltip title="Новый курс">
          <IconButton onClick={openForm}>
            <Icon>add</Icon>
          </IconButton>
        </Tooltip>
      </Toolbar>
      <CourseForm
        open={showForm}
        onClose={onFormClose}
        onSubmit={onFormSubmit}
        loading={CoursesStore.list.postState === 'loading'}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Дата начала</TableCell>
              <TableCell>Дата окончания</TableCell>
            </TableRow>
          </TableHead>
          {CoursesStore.list.state === 'loading' ? (
            <TableBody>
              <TableRow sx={{ height: 53 * rowsPerPage }}>
                <TableCell colSpan={3}>
                  <CircularProgress sx={{ display: 'block', mx: 'auto' }} />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {CoursesStore.list.data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(course => (
                <TableRow key={course.id} hover sx={{ cursor: 'pointer' }} onClick={evt => handleClick(evt, course.id)}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{dayjs(course.startingDate).format('DD.MM.YYYY')}</TableCell>
                  <TableCell>{dayjs(course.finishingDate).format('DD.MM.YYYY')}</TableCell>
                </TableRow>
              ))}
              {page > 1 && emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={3} sx={{ height: emptyRows * 53 }}></TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        page={page}
        count={CoursesStore.list.data.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Элементов на странице"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
})

export default CoursesPage
