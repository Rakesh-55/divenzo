# EmailJS Setup Guide for Divenzo Contact Form

## Overview
The Discuss page form will send emails to hello@divenzo.com using EmailJS, a free email service that works directly from the frontend.

## Setup Steps

### 1. Create EmailJS Account
- Go to [emailjs.com](https://www.emailjs.com/)
- Click "Sign Up" and create a free account
- Verify your email

### 2. Add Your Email Service
- Go to **Email Services** in the left sidebar
- Click **Add New Service**
- Choose **Gmail** (or your preferred email provider)
- Connect your email account (hello@divenzo.com recommended)
- Name the service something like "Divenzo Gmail"
- Copy the **Service ID** (looks like `service_xxxxx`)

### 3. Create an Email Template
- Go to **Email Templates** in the left sidebar
- Click **Create New Template**
- Configure the template with these variables:

```
Subject: New Form Submission from {{from_name}}

Body:
Hello Divenzo Team,

You have received a new inquiry:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Budget: {{budget}}
Service: {{service}}

Message:
{{message}}

Best regards,
Divenzo Contact Form
```

- Save the template and copy the **Template ID** (looks like `template_xxxxx`)

### 4. Get Your Public Key
- Go to **Account** in the left sidebar
- Click on **API Keys**
- Copy your **Public Key** (looks like `xxxxxxxxxxxxx`)

### 5. Update the Code
Open `src/screens/Discuss.tsx` and replace these placeholders:

```javascript
// Line 8: Add your Public Key
emailjs.init("YOUR_PUBLIC_KEY_HERE");  // Replace with your actual public key

// Line 238: Add your Service ID and Template ID
await emailjs.send(
  "YOUR_SERVICE_ID",      // Replace with your Service ID
  "YOUR_TEMPLATE_ID",     // Replace with your Template ID
  {
    // ... rest of the code
  }
);
```

### 6. Install Dependencies
If you haven't already, install the EmailJS package:
```bash
npm install
```

### 7. Test the Form
- Start your development server: `npm run dev`
- Navigate to the Discuss page
- Fill out the form and submit
- Check `hello@divenzo.com` for the received email
- You should also see a success popup

## Troubleshooting

### "Failed to send email" message
- Double-check your Service ID and Template ID
- Verify your Public Key is correct
- Make sure your email service is properly connected in EmailJS
- Check the browser console for detailed error messages

### Email not received
- Check spam/junk folder
- Verify the template is published (in "Email Templates")
- Make sure the email service is enabled

### Template variable errors
- Ensure all template variables in the email template are wrapped in `{{}}` brackets
- Match the variable names in the template to those sent in the `handleSubmit` function

## Security Notes
- The Public Key is meant to be public (it's safe to have in frontend code)
- Only up to 200 emails per month are free on EmailJS (upgrade plan available)
- EmailJS handles SMTP security for you

## Support
For more help:
- EmailJS Documentation: https://www.emailjs.com/docs/
- Contact EmailJS Support: support@emailjs.com
