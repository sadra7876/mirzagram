import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

enum EmailTemplates {
  Welcome = "welcome-mail.html",
  ResetPassword = "reset-password-mail.html",
}

interface EmailData {
  [key: string]: string;
}

export class MailerService {
  // private transporter: nodemailer.Transporter;

  constructor(private readonly transporter: nodemailer.Transporter) {}

  public async sendEmail(
    to: string,
    subject: string,
    text: string,
    htmlContent: string
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: "mirzagram0@gmail.com",
        to,
        subject,
        text,
        html: htmlContent,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Handle or throw the error as needed
    }
  }

  public async sendTemplateEmail(
    to: string,
    subject: string,
    text: string,
    templateName: EmailTemplates | string,
    data: EmailData
  ): Promise<void> {
    const htmlContent = await this.loadTemplate(templateName, data);
    await this.sendEmail(to, subject, text, htmlContent);
  }

  public async sendWelcomeEmail(to: string, username: string): Promise<void> {
    const subject = "به میرزاگرام خوش آمدید!";
    const text = `به میرزاگرام خوش آمدید`;
    await this.sendTemplateEmail(to, subject, text, EmailTemplates.Welcome, {
      username,
    });
  }

  public async sendResetPasswordEmail(
    to: string,
    username: string,
    resetLink: string
  ): Promise<void> {
    const subject = "درخواست بازیابی رمز عبور";
    const text = `بازیابی رمز عبور: برای بازیابی رمز عبور خود، لطفا روی لینک زیر کلیک کنید: ${resetLink}`;
    await this.sendTemplateEmail(
      to,
      subject,
      text,
      EmailTemplates.ResetPassword,
      { username, resetLink }
    );
  }
  private async loadTemplate(
    templateName: EmailTemplates | string,
    replacements: EmailData
  ): Promise<string> {
    const templatePath = path.join(__dirname, "../templates", templateName);
    let template = fs.readFileSync(templatePath, "utf8");

    // Validate placeholders
    this.validatePlaceholders(template, replacements);

    // Replace placeholders
    for (const key in replacements) {
      console.log(replacements[key], new RegExp(`{{ ${key} }}`, "g"));
      template = template.replace(
        new RegExp(`{{ ${key} }}`, "g"),
        replacements[key]
      );
    }
    return template;
  }

  private validatePlaceholders(templateContent: string, data: EmailData): void {
    const templateKeys = this.extractTemplateKeys(templateContent);
    const dataKeys = Object.keys(data);

    // Check if all keys in data are present in template
    for (const key of dataKeys) {
      console.log(templateKeys, dataKeys);
      if (!templateKeys.includes(`{{ ${key} }}`)) {
        throw new Error(
          `Key '${key}' in EmailData does not match any placeholder in the template.`
        );
      }
    }

    // Check if all placeholders in template have corresponding keys in data
    for (const key of templateKeys) {
      if (!dataKeys.includes(key.replace(/{{|}}/g, "").trim())) {
        throw new Error(
          `Placeholder '{{ ${key} }}' in template does not have a matching key in EmailData.`
        );
      }
    }
  }

  private extractTemplateKeys(templateContent: string): string[] {
    const regex = /{{\s*(.*?)\s*}}/g;
    const matches = templateContent.match(regex);
    if (!matches) {
      return [];
    }
    return matches.map((match) => match.trim());
  }
}
