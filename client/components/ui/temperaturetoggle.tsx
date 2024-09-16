// client/components/ui/temperaturetoggle.tsx
import { useState } from 'react'

interface TemperatureToggleProps {
  onUnitChange: (isCelsius: boolean) => void
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({
  onUnitChange,
}) => {
  const [isCelsius, setIsCelsius] = useState(true)

  const handleToggle = () => {
    setIsCelsius((prev) => !prev)
    onUnitChange(!isCelsius)
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={isCelsius} onChange={handleToggle} />
        {isCelsius ? 'Celsius' : 'Fahrenheit'}
      </label>
    </div>
  )
}

export default TemperatureToggle
