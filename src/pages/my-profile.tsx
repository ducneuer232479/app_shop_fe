//  ** Next
import { NextPage } from 'next'
import React, { ReactNode } from 'react'

//  ** Views
import MyProfilePage from 'src/views/pages/my-profile'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <MyProfilePage />
}

export default Index
Index.getLayout = (page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>
