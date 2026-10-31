import { NextResponse } from 'next/server';
import tls from 'tls';
import { emailConfig } from '../../../lib/email-config';
import { siteConfig } from '../../../lib/site-config';

function sendSmtpMail(name: string, senderEmail: string, message: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const host = emailConfig.host;
    const port = emailConfig.port;
    const user = emailConfig.user;
    const pass = emailConfig.pass;
    const to = emailConfig.to;

    const socket = tls.connect(port, host, { rejectUnauthorized: false }, () => {});
    socket.setEncoding('utf8');

    let step = 0;
    const timeout = setTimeout(() => {
      socket.destroy();
      reject(new Error('SMTP Connection Timed Out'));
    }, 12000);

    socket.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });

    socket.on('data', (data) => {
      const resp = data.toString();

      if (step === 0 && resp.startsWith('220')) {
        step = 1;
        socket.write('EHLO localhost\r\n');
      } else if (step === 1 && (resp.includes('250-') || resp.includes('250 '))) {
        step = 2;
        const authPlain = Buffer.from(`\0${user}\0${pass}`).toString('base64');
        socket.write(`AUTH PLAIN ${authPlain}\r\n`);
      } else if (step === 2 && resp.startsWith('235')) {
        step = 3;
        socket.write(`MAIL FROM:<${user}>\r\n`);
      } else if (step === 3 && resp.startsWith('250')) {
        step = 4;
        socket.write(`RCPT TO:<${to}>\r\n`);
      } else if (step === 4 && resp.startsWith('250')) {
        step = 5;
        socket.write('DATA\r\n');
      } else if (step === 5 && resp.startsWith('354')) {
        step = 6;
        const mailContent = [
          `From: "${siteConfig.siteName} Contact" <${user}>`,
          `To: <${to}>`,
          `Reply-To: "${name}" <${senderEmail}>`,
          `Subject: New Inquiry from ${name} - ${siteConfig.siteName}`,
          'MIME-Version: 1.0',
          'Content-Type: text/plain; charset=UTF-8',
          '',
          `Name: ${name}`,
          `Email: ${senderEmail}`,
          `Time: ${new Date().toISOString()}`,
          '',
          'Message:',
          message,
          '',
          '.'
        ].join('\r\n');
        socket.write(`${mailContent}\r\n`);
      } else if (step === 6 && resp.startsWith('250')) {
        clearTimeout(timeout);
        socket.write('QUIT\r\n');
        socket.end();
        resolve();
      } else if (resp.startsWith('5')) {
        clearTimeout(timeout);
        socket.destroy();
        reject(new Error(`SMTP Error: ${resp.trim()}`));
      }
    });
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    try {
      await sendSmtpMail(name, email, message);
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully!'
      });
    } catch (smtpError: any) {
      console.error('SMTP Delivery Error:', smtpError.message);
      return NextResponse.json(
        {
          success: false,
          message: `Mail server delivery issue: ${smtpError.message}. Please email ${siteConfig.supportEmail} directly.`
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: `Invalid request data: ${error?.message || error}` },
      { status: 400 }
    );
  }
}
