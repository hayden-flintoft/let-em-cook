import React from 'react'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="slider"></span>
    </label>
  )
}

export default Switch
