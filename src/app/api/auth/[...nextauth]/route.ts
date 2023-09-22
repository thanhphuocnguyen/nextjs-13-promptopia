import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      })
      if (sessionUser && session?.user)
        session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile, user }) {
      try {
        await connectToDB();
        const userExisted = await User.findOne({ email: profile?.email });
        if (!userExisted) {
          await User.create({
            email: profile?.email,
            username: (profile?.name ?? "").replaceAll(' ', '_').toLowerCase(),
            image: user?.image
          });
        } else {
          await User.findOne({ email: profile?.email }).updateOne({
            username: (profile?.name ?? "").replaceAll(' ', '_').toLowerCase(),
            image: user?.image
          })
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
})
export { handler as GET, handler as POST };