'use client'

// ** React
import React, { Fragment, useEffect, useState } from 'react'

// ** Next
import { NextPage } from 'next'

// ** MUI
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

// ** Components
import IconifyIcon from 'src/components/Icon'

// **  Config
import { VerticalItems } from 'src/configs/layout'

type TProps = {
  open: boolean
}

type TListItems = {
  items: any
  level: number
  openItems: {
    [key: string]: boolean
  }
  setOpenItems: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean
    }>
  >
  disabled: boolean
}

const RecursiveListItem: NextPage<TListItems> = ({ items, level, openItems, setOpenItems, disabled }) => {
  const handleClick = (title: string) => {
    if (!disabled) {
      setOpenItems(prev => ({
        ...prev,
        [title]: !prev[title]
      }))
    }
  }

  return items.map((item: any) => (
    <Fragment key={item.title}>
      <ListItemButton
        sx={{ padding: `8px 10px 8px ${level * level === 1 ? 28 : 20}px` }}
        onClick={() => {
          if (item.childrens) {
            handleClick(item.title)
          }
        }}
      >
        <ListItemIcon>
          <IconifyIcon icon={item.icon} />
        </ListItemIcon>
        {!disabled && <ListItemText primary={item.title} />}
        {item.childrens && item.childrens.length > 0 && (
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
          <RecursiveListItem
            items={item.childrens}
            level={level + 1}
            openItems={openItems}
            setOpenItems={setOpenItems}
            disabled={disabled}
          />
        </Collapse>
      )}
    </Fragment>
  ))
}

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (!open) {
      handleToggleAll()
    }
  }, [open])

  const handleToggleAll = () => {
    setOpenItems({})
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItem
        items={VerticalItems}
        level={1}
        disabled={!open}
        openItems={openItems}
        setOpenItems={setOpenItems}
      />
    </List>
  )
}

export default ListVerticalLayout
