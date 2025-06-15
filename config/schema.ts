import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users',{
    id: serial('id').primaryKey().notNull(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    imageUrl: varchar('imageUrl').notNull(),
    credits: integer('credits').notNull().default(3),
})

export const aiGeneratedImage = pgTable('aiGeneratedImage', {
    id: serial('id').primaryKey().notNull(),
    roomType: varchar('roomType').notNull(),
    designType: varchar('designType').notNull(),
    orgImage: varchar('orgImage').notNull(),
    aiImage: varchar('aiImage').notNull(),
    userEmail: varchar('userEmail'),
})