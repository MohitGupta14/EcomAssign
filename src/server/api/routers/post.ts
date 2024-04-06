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
  login: publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })
  )
  .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: {
            email: input.email,
          },
        });

        // If user not found, return error
        if (!user) {
          throw new Error("User not found. Please register first.");
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(input.password, user.password);

        // If passwords don't match, return error
        if (!passwordMatch) {
          throw new Error("Invalid email or password.");
        }
        console.log(user)
        // Passwords match, return the user object
        return user;
      } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Failed to log in. Please check your credentials.");
      }
  }),
  
  interest: publicProcedure
  .input(
    z.object({
      interests: z.array(z.string()),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const interests = await ctx.db.interest.create({
        data: {
          type: input.interests,
        },
      });

      return interests;
    } catch (error) {
      console.error("Error processing interests:", error);
      throw new Error("Failed to process interests. Please try again later.");
    }
  }),

  getInterests : publicProcedure
  .query(async ({ ctx }) => {
    try {
      // const interests = await ctx.db.interest.findMany();
      const interests =  [ "Shoes", "Car", "Jewelry", "Technology", "Travel",
      "Fashion", "Food", "Music", "Photography", "Books",
      "Movies", "Sports", "Fitness", "Cooking", "Gaming",
      "Art", "Nature", "Animals", "Health", "Beauty",
      "Design", "Education", "Finance", "Business", "Shopping",
      "Adventure", "Crafts", "DIY", "Home Decor", "History",
      "Science", "Environment", "Politics", "Spirituality", "Yoga",
      "Meditation", "Camping", "Hiking", "Sustainability", "Volunteering",
      "Social Media", "Writing", "Reading", "Learning", "Languages",
      "Coding", "Technology", "Entrepreneurship", "Fitness", "Nutrition",
      "Self Improvement", "Parenting", "Relationships", "Fashion", "Photography",
      "Art", "Music", "Dancing", "Singing"] 

      return interests;
    } catch (error) {
      console.error("Error fetching interests:", error);
      throw new Error("Failed to fetch interests. Please try again later.");
    }
  }),
})