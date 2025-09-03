import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut } from '@/auth'
import ProfileDropdownButton from '@/components/profileNavLink'

export const MyHeader = async () => {
  const session = await auth()

  const user = session?.user
  return (
    <header className={`border-solid border-b-1 w-full -mb-1 `}>
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/Intake_Ehr_logo-200px.png"
            alt="Intake EHR"
            width={150}
            height={100}
          />
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              {session && session.user ? (
                <ProfileDropdownButton session={session}>
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                    <button
                      onClick={async () => {
                        'use server'
                        await signOut()
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </ProfileDropdownButton>
              ) : (
                <NavigationMenuLink>Sign up</NavigationMenuLink>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
