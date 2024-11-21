import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

export const checkRole = (allowedRoles: string[]) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    try {
      const { userId } = req.query;
      console.log(userId);
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };
};
