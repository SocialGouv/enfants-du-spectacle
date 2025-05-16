import { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    dbUser?: {
      id: number
      // Add any other user properties that you need
    }
    user?: {
      id?: number
    } & DefaultSession["user"]
  }
}
