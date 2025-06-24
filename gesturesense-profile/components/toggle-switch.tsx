"use client"

import { Switch } from "@/components/ui/switch"

interface ToggleSwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function ToggleSwitch({ checked, onCheckedChange }: ToggleSwitchProps) {
  return (
    <Switch
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
    />
  )
}
