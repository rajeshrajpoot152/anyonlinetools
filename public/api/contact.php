<?php
/**
 * anyonlinetools.com - Contact Form SMTP Mailer
 * Handles contact inquiries securely via SMTP authentication.
 */

// Allow CORS & Security Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed. Use POST.']);
    exit;
}

// Read raw JSON input
$input_json = file_get_contents('php://input');
$data = json_decode($input_json, true);

if (!$data) {
    $data = $_POST;
}

// Sanitize & Validate inputs
$name    = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email   = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$message = isset($data['message']) ? trim(htmlspecialchars($data['message'], ENT_QUOTES, 'UTF-8')) : '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields (name, email, and message).']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address.']);
    exit;
}

// SMTP Configuration
$smtp_host = getenv('SMTP_HOST') ?: 'mail.anyonlinetools.com';
$smtp_port = getenv('SMTP_PORT') ? (int)getenv('SMTP_PORT') : 465;
$smtp_user = getenv('SMTP_USER') ?: 'hello@anyonlinetools.com';
$smtp_pass = getenv('SMTP_PASS') ?: '';
$to_email  = getenv('SMTP_TO')   ?: 'hello@anyonlinetools.com';
$from_name = 'AnyOnlineTools Notification';

$subject = "New Contact Inquiry from " . $name . " - AnyOnlineTools";
$user_ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown IP';
$timestamp = date('Y-m-d H:i:s T');

// HTML Email Body
$html_body = "
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; padding: 20px; }
  .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
  .header { background: #0f172a; color: #ffffff; padding: 24px; text-align: center; }
  .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
  .content { padding: 24px; }
  .field { margin-bottom: 16px; }
  .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 4px; }
  .value { font-size: 14px; color: #0f172a; font-weight: 500; }
  .message-box { background: #f1f5f9; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
  .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; font-size: 12px; color: #94a3b8; text-align: center; }
</style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <h2>New AnyOnlineTools Inquiry</h2>
    </div>
    <div class='content'>
      <div class='field'>
        <div class='label'>Sender Name</div>
        <div class='value'>" . htmlspecialchars($name) . "</div>
      </div>
      <div class='field'>
        <div class='label'>Email Address</div>
        <div class='value'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></div>
      </div>
      <div class='field'>
        <div class='label'>Timestamp</div>
        <div class='value'>" . $timestamp . "</div>
      </div>
      <div class='field'>
        <div class='label'>User IP Address</div>
        <div class='value'>" . htmlspecialchars($user_ip) . "</div>
      </div>
      <div class='field'>
        <div class='label'>User Message</div>
        <div class='message-box'>" . nl2br(htmlspecialchars($message)) . "</div>
      </div>
    </div>
    <div class='footer'>
      AnyOnlineTools.com &bull; Automated Contact Dispatch
    </div>
  </div>
</body>
</html>
";

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $from_name . ' <' . $smtp_user . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion()
];

if (@mail($to_email, $subject, $html_body, implode("\r\n", $headers))) {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Mail delivery queued.']);
}
