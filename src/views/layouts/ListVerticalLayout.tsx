'use client'

// ** React
import * as React from 'react'

// ** Next
import { NextPage } from 'next'

// ** MUI
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

// ** Components
import IconifyIcon from 'src/components/Icon'
import { VerticalItems } from 'src/configs/layout'

type TProps = {}

const ListVerticalLayout: NextPage<TProps> = () => {
  const [openState, setOpenState] = React.useState(true)

  const handleClick = () => {
    setOpenState(!openState)
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      {VerticalItems.map(item => (
        <React.Fragment key={item.title}>
          <ListItemButton
            onClick={() => {
              if (item.childrens) {
                handleClick()
              }
            }}
          >
            <ListItemIcon>
              <IconifyIcon icon={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
          {item.childrens && item.childrens.length > 0 && (
            <>
              {item.childrens.map(chil => (
                <Collapse in={openState} timeout='auto' unmountOnExit key={chil.title}>
                  <List component='div' disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <IconifyIcon icon={chil.icon} />
                      </ListItemIcon>
                      <ListItemText primary={chil.title} />
                    </ListItemButton>
                  </List>
                </Collapse>
              ))}
            </>
          )}
        </React.Fragment>
      ))}
    </List>
  )
}

export default ListVerticalLayout
