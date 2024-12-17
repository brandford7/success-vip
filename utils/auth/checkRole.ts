import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import dbConnect from "../dbConnect";

/**
 * Middleware to check if a user has an allowed role.
 * @param {string[]} allowedRoles - Array of roles that are permitted to access the route.
 * @returns Middleware function to verify the user's role.
 */
export const checkRole = (allowedRoles: string[]) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    try {
      await dbConnect();
      const { userId } = req.query;

      // Ensure the user ID is provided
      if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Missing user ID" });
      }

      // Fetch the user from the database
      const user = await User.findById(userId);

      // If user is not found, respond with an error
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user's role is within the allowed roles
      if (!allowedRoles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient role permissions" });
      }

      // If all checks pass, proceed to the next middleware or handler
      next();
    } catch (error) {
      console.error("Error in checkRole middleware:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error });
    }
  };
};
