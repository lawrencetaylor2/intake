import { signOut } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Session } from 'next-auth'
import Image from 'next/image'
import { ReactNode } from 'react'
interface props {
  session: Session | null
  children: ReactNode
}
const ProfileDropdownButton = ({ session, children }: props) => {
  const user = session!.user
  const userInitials = user!.name
    ?.split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
  console.log('User Initials:', userInitials)
  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative flex h-10 w-10 overflow-hidden shrink-0 rounded-full">
          <Avatar>
            <AvatarImage src={user!.image!} alt={user!.name!} />
            <AvatarFallback>
              <Image
                src="/user-circle.png"
                alt="profile"
                width={80}
                height={80}
              />
            </AvatarFallback>
          </Avatar>
        </div>
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  )
}

export default ProfileDropdownButton
