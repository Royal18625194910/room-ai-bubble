import { db } from "@/config/db"
import { users } from "@/config/schema"
import { eq } from "drizzle-orm"

export const checkCredits = async (userId: number) => {
    const userCredits = await db.select({ credits: users.credits}).from(users).where(eq(users.id,userId))
    console.log('userCredits',userCredits[0].credits)
    if (userCredits[0].credits <= 0) return false
    return true
}