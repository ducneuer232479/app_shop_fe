'use client'

// ** React
import { Fragment, useState } from 'react'

// ** Next
import { NextPage } from 'next'

// ** MUI
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

// ** Components
import IconifyIcon from 'src/components/Icon'

// **  Config
import { VerticalItems } from 'src/configs/layout'

type TProps = {}

const RecursiveListItem = ({ items, level }: { items: any; level: number }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  console.log('openTimes', openItems)

  const handleClick = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  return items.map((item: any) => (
    <Fragment key={item.title}>
      <ListItemButton
        sx={{ padding: `8px 10px 8px ${level * 10}px` }}
        onClick={() => {
          if (item.childrens) {
            handleClick(item.title)
          }
        }}
      >
        <ListItemIcon>
          <IconifyIcon icon={item.icon} />
        </ListItemIcon>
        <ListItemText primary={item.title} />
        {item?.childrens && item.childrens.length > 0 && (
          <>
            {openItems[item.title] ? (
              <IconifyIcon
                icon='ic:twotone-expand-less'
                style={{
                  transform: 'rotate(180deg)'
                }}
              />
            ) : (
              <IconifyIcon icon='ic:twotone-expand-less' />
            )}
          </>
        )}
      </ListItemButton>
      {item.childrens && item.childrens.length > 0 && (
        <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
          <RecursiveListItem items={item.childrens} level={level + 1} />
        </Collapse>
      )}
    </Fragment>
  ))
}

const ListVerticalLayout: NextPage<TProps> = () => {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItem items={VerticalItems} level={1} />
    </List>
  )
}

export default ListVerticalLayout
