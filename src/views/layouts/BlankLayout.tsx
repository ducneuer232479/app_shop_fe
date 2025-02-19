// ** React
import * as React from 'react'

// ** Next
import { NextPage } from 'next'

// ** MUI
import { Box, BoxProps, styled } from '@mui/material'

type TProps = {
  children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh'
}))

const BlankLayout: NextPage<TProps> = ({ children }) => {
  return (
    <BlankLayoutWrapper>
      <Box sx={{ overflow: 'hidden', minHeight: '100vh' }}>{children}</Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
