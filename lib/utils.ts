import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
//client only functions
export function isAppleDevice() {
  const userAgent = navigator.userAgent

  // Check for iPhone, iPad, and iPod
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent)

  // Check for Mac. For iPadOS 13+, the userAgent includes "Mac".
  const isMac = userAgent.includes('Mac')

  // To distinguish between a Mac and a modern iPad, check for touch capability.
  const isTouchDevice = 'ontouchend' in document

  // If it's a Mac with a touch screen, it's a modern iPad.
  if (isMac && isTouchDevice) {
    return true
  }

  // Otherwise, check for the specific iOS devices.
  return isIOS || isMac
}
