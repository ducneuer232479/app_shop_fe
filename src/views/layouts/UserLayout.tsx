// ** React
import * as React from 'react'

// ** Next
import { NextPage } from 'next'

// ** MUI
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

// ** Layout
import VerticalLayout from './HorizontalLayout'
import HorizontalLayout from './VerticalLayout'

type TProps = {
  children: React.ReactNode
}

const UserLayout: NextPage<TProps> = ({ children }) => {
  const [open, setOpen] = React.useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <VerticalLayout open={open} toggleDrawer={toggleDrawer} />
      <HorizontalLayout open={open} toggleDrawer={toggleDrawer} />
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default UserLayout
