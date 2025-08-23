import { auth } from '@/auth'

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== '/login') {
    const newUrl = new URL('/login', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (req.auth && req.nextUrl.pathname !== '/add-company') {
    // If the user is authenticated, we can proceed with the request
    console.log('Authenticated user:', req.auth.user)
    if (req.auth.user?.roles.length == 0) {
      const newUrl = new URL('/add-company', req.nextUrl.origin)
      return Response.redirect(newUrl)
    }
  }
})
// Exclude middleware from certain paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
