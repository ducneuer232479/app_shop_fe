// ** React
import React from 'react'

// ** Mui Imports
import IconButton from '@mui/material/IconButton'

// ** Component
import Icon from '../../../../components/Icon'

// ** Hook
import { useSettings } from 'src/hooks/useSettings'

// ** Type
import { Mode } from 'src/types/layouts'

type TProps = {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ModeToggle = (props: TProps) => {
  const { settings, saveSettings } = useSettings()

  const handleModeChange = (mode: Mode) => {
    saveSettings({ ...settings, mode })
  }

  const handleToggleMode = () => {
    if (settings.mode === 'dark') {
      handleModeChange('light')
    } else {
      handleModeChange('dark')
    }
  }

  return (
    <IconButton color='inherit' onClick={handleToggleMode}>
      <Icon icon={settings.mode === 'light' ? 'material-symbols:dark-mode-outline' : 'iconamoon:mode-light'} />
    </IconButton>
  )
}

export default ModeToggle
