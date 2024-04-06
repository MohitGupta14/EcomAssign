import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@component/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8), // Minimum password length, you can adjust this
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const existingUser = await ctx.db.user.findUnique({
          where: {
            email: input.email,
          },
        });
        if (existingUser) {
          return "User Already exist Please try to login"; // Return null to indicate failure
        }
  
        // Create the user in the database
        const newUser = await ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            password: input.password,
          },
        });
  
        console.log("User created successfully:", newUser);
        return newUser;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Re-throw the error to be handled by TRPC
      }
    }),
  

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
