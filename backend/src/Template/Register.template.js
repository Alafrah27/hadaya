export const RegisterTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to ShareGifts</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; }
        .header { text-align: center; padding: 20px 0; }
        .content { padding: 20px; text-align: center; color: #333333; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #888888; }
        .button { background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
        .otp-code { font-size: 32px; font-weight: bold; color: #dc2626; letter-spacing: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to ShareGifts!</h1>
        </div>
        <div class="content">
            <h2>Hi {username},</h2>
            <p>Thank you for joining ShareGifts. We are excited to have you on board.</p>
            <p>Start sending joy instantly to your friends and family.</p>
            <p>Please use the following OTP code to verify your email address:</p>
            <div class="otp-code">{Verifycode}</div>
            <p>This code is valid for a limited time. Do not share it with anyone.</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ShareGifts. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
