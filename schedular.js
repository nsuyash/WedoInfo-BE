const nodemailer = require("nodemailer");
const cron = require("node-cron");
require("dotenv").config();

// Import your schema
const WedoInfo = require("./models/wedoinfo.models"); // Replace with your schema file
let count = 0;

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail SMTP server
    port: 587,             // Port for TLS
    secure: false,         // Use false for TLS
    auth: {
        user: "acefitboyofficial@gmail.com",
        pass: "weonvqrivkcbycnf"
    },
});

// Function to send email
const sendEmail = async (newData) => {
  const mailOptions = {
    from: "acefitboyofficial@gmail.com",
    to: `suyashnandurkar53@gmail.com, ${newData.emailId}`, // Replace with recipient email
    subject: `Thank You for Reaching Out, ${newData.firstName}!`,
    text: `Lead: ${++count}:\n\n${newData}`,
    text: `
Dear ${newData.firstName + " " + newData.lastName},

Thank you for submitting your details! We’re excited to help you achieve your health goal of fat loss. Here’s a summary of the information you provided:

Full Name: ${newData.firstName + " " + newData.lastName}
Phone: ${newData.countryCode + " " + newData.phoneNumber}
Location: ${newData.location}
Email: ${newData.emailId}
Health Goal: ${newData.healthGaol}
Age: ${newData.age}
Instagram: ${newData.instaId}
Previous Supplement Use: ${newData.useSupplementsBefore}
Supplements Used: ${newData.ifYesWhich}

Our team will review your submission and get in touch with you shortly to guide you through the next steps.

If you have any questions or want to share more details, feel free to reply to this email or message us on Instagram!

Looking forward to supporting you on your fitness journey.

Best regards,
Suyash Nandurkar
WeDo Transformation Coach
9834143191/acefitboyofficial@gmail.com
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Track and send email for new data
let lastInsertedId = null; // To store the last inserted document ID

cron.schedule("* * * * * *", async () => {
  try {
    const newEntry = await WedoInfo.findOne().sort({ _id: -1 }).exec(); // Fetch the latest entry
    if (newEntry && (!lastInsertedId || newEntry._id.toString() !== lastInsertedId)) {
      lastInsertedId = newEntry._id.toString();
      sendEmail(newEntry); // Send email with new data
    }
  } catch (error) {
    console.error("Error checking new data:", error);
  }
});

console.log("Cron job running...");