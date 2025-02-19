// ** React
import React from 'react'

// ** Next
import { useTranslation } from 'react-i18next'

// ** Mui Imports
import IconButton from '@mui/material/IconButton'
import { Menu, MenuItem } from '@mui/material'

// ** Components
import Icon from 'src/components/Icon'

// ** Config
import { LANGUAGE_OPTIONS } from 'src/configs/i18n'

type TProps = {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LanguageDropdown = (props: TProps) => {
  // ** State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  // ** Hooks
  const { i18n } = useTranslation()

  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOnchangeLang = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <>
      <IconButton color='inherit' onClick={handleOpen} id='language-dropdown'>
        <Icon icon='material-symbols-light:translate' />
      </IconButton>
      {/* <Popover
        id='language-dropdown'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        {LANGUAGE_OPTIONS.map(lang => (
          <StyledItemLanguage
            selected={lang.value === i18n.language}
            key={lang.value}
            onClick={() => handleOnchangeLang(lang.value)}
          >
            <Typography>{lang.lang}</Typography>
          </StyledItemLanguage>
        ))}
      </Popover> */}
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {LANGUAGE_OPTIONS.map(lang => (
          <MenuItem
            selected={lang.value === i18n.language}
            key={lang.value}
            onClick={() => handleOnchangeLang(lang.value)}
          >
            {lang.lang}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default LanguageDropdown
