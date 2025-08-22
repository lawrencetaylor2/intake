// Export the database schema for drizzle-kit
export {
  roleEnum,
  users,
  organization,
  roles,
  invites,
  accounts,
  sessions,
  verificationTokens,
  authenticators,
  usersRelations,
  roleRelations,
  inviteRelations,
  accountRelations,
  sessionRelations,
  organizationRelations,
} from './authtables'

export {
  patients,
  patientsRelations,
  organizationToPatientsRelations,
} from './patient'
