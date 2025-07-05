import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tranduydung2004@gmail.com",
    pass: "oddooabyucodnhjs",
  },
});

export const mailOptions = {
  from: "tranduydung2004@gmail.com",
};
