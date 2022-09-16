import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AppBar from './AppBar'

function Layout() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', pt: 8 }}>
      <AppBar />
      <Box component="main" sx={{ m: 2 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
