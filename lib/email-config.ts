export const emailConfig = {
  host: process.env.SMTP_HOST || 'mail.anyonlinetools.com',
  port: Number(process.env.SMTP_PORT) || 465,
  user: process.env.SMTP_USER || 'hello@anyonlinetools.com',
  pass: process.env.SMTP_PASS || '',
  from: process.env.SMTP_FROM || 'hello@anyonlinetools.com',
  to: process.env.SMTP_TO || 'hello@anyonlinetools.com',
};
