import bcrypt from "bcrypt"
import User from "../models/adminModel.js";
import jwt from "jsonwebtoken"
import "dotenv/config.js"
import Admin from "../models/adminModel.js";

export async function loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
  
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(404).send({ message: "Email not found" });
  
      const passwordMatches = await bcrypt.compare(password, admin.password);
      if (!passwordMatches)
        return res.status(404).send({ message: "Invalid Crendentials" });
  
      const adminToken = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
  
      console.log("LoginToken", adminToken);
  
      res
        .cookie("adminToken", adminToken, {
          httpOnly: false,
          secure: false,
          sameSite: "strict",
          maxAge: 3600000,
        })
        .send({ message: "Login Successfull", admin: admin });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "User not login", errorString: error.message });
    }
  }
  