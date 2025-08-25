import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
export default function AddFieldButton() {
  const [pooverShown, setPopoverShown] = useState(false)
  const handleOpenChange = (isOpen: boolean) => {
    console.log(`popver isOpen = ${isOpen}`)
    setPopoverShown(isOpen)
  }
  return (
    <Popover onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="ghost" disabled={pooverShown}>
              <Plus size={12} color="gray" strokeWidth={2.5} />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>
          <p>Add field</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent>
        <div>Test</div>
      </PopoverContent>
    </Popover>
  )
}
