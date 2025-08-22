import { auth, signOut } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Image from 'next/image'

const ProfileDropdownButton = async () => {
  const session = await auth()
  console.log('Session:', session)
  if (!session || !session.user) {
    return <></>
  }
  const user = session.user
  const userInitials = user.name
    ?.split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
  console.log('User Initials:', userInitials)
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="relative flex h-10 w-10 overflow-hidden shrink-0 rounded-full">
            <Avatar>
              <AvatarImage src={user.image!} alt={user.name!} />
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
        <PopoverContent>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <button
              onClick={async () => {
                'use server'
                await signOut()
              }}
            >
              Sign out
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default ProfileDropdownButton
