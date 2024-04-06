import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@component/server/api/trpc";
import bcrypt from "bcrypt";

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
      .mutation(async ({ ctx, input }) => {
        try {
          const existingUser = await ctx.db.user.findUnique({
            where: {
              email: input.email,
            },
          });
          if (existingUser) {
            return "User already exists. Please try to login.";
          }
          
          // Hash the password
          const hashedPassword = await bcrypt.hash(input.password, 10);
      
          // Create the user in the database with the hashed password
          const newUser = await ctx.db.user.create({
            data: {
              name: input.name,
              email: input.email,
              password: hashedPassword,
            },
          });
      
          console.log("User created successfully:", newUser);
          return newUser;
        } catch (error) {
          console.error("Error creating user:", error);
          throw new Error("Failed to create user. Please try again later.");
        }
    }),    
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
