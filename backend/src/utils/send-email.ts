import dayjs from "dayjs";
import { emailTemplates } from "./email-template";
import { transporter } from "../config/nodemailer";

export type Subscription = {
  name: string;
  renewalDate: Date | string;
  price: number;
  currency: string;
  frequency: string;
  paymentMethod: string;
  user: {
    name: string;
  };
};

export type EmailTemplateData = {
  userName: string;
  subscriptionName: string;
  renewalDate: string;
  planName: string;
  price: string;
  paymentMethod: string;
  accountSettingsLink: string;
  supportLink: string;
  daysLeft: number;
};

type BaseTemplateData = Omit<EmailTemplateData, "daysLeft">;

export type EmailTemplate = {
  label: string;
  generateSubject: (data: BaseTemplateData) => string;
  generateBody: (data: BaseTemplateData) => string;
};

export type EmailType = (typeof emailTemplates)[number]["label"];

export type SendReminderEmailParams = {
  to: string;
  type: EmailType;
  subscription: Subscription;
};

export const sendReminderEmail = async ({
  to,
  type,
  subscription,
}: SendReminderEmailParams) => {
  if (!to || !type) throw new Error("Missing required parameters");

  const template = emailTemplates.find((t) => t.label === type);

  if (!template) throw new Error("Invalid email type");

  const mailInfo: BaseTemplateData = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
    accountSettingsLink: "#",
    supportLink: "#",
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error, "Error sending email");

    console.log("Email sent: " + info.response);
  });
};
