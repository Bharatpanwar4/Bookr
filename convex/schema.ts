import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // user table
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(), // clerk userid
    email: v.string(),
    imageUrl: v.optional(v.string()),
    hasCompletedOnboarding: v.boolean(),
    location: v.optional(
      v.object({
        city: v.string(),
        state: v.optional(v.string()),
        country: v.string(),
      })
    ),
    interests: v.optional(v.array(v.string())), // min 3
    // organizer tracking (user subscription)
    freeEventsCreated: v.number(), // 1 free
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_token", ["tokenIdentifier"]),
});
