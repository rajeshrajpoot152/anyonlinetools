const fs = require('fs');
const path = require('path');

const langPattern = '(en|es|pt|id|ar|fr|de|ja|ru|tr|vi|th|it|ko|pl|nl|sv|zh-cn|zh-tw|bg|ca|el|hi|ms|uk|sw)';

let redirectRules = [];

// 0. English Canonicalization Redirects (/en/ -> /)
redirectRules.push(`
# ----------------------------------------------------------------------
# 0. English Canonicalization 301 Redirects (/en/ -> /)
# ----------------------------------------------------------------------
RewriteRule ^en/?$ / [R=301,L]
RewriteRule ^en/([^/]+)/?$ /$1/ [R=301,L]
`);

// 1. Legal Pages Redirect: /:lang/about -> /about/
redirectRules.push(`
# ----------------------------------------------------------------------
# 1. Multi-Language Legal Pages Redirect (English-Only Compliance)
# ----------------------------------------------------------------------
RewriteRule ^${langPattern}/about/?$ /about/ [R=301,L]
RewriteRule ^${langPattern}/privacy/?$ /privacy/ [R=301,L]
RewriteRule ^${langPattern}/terms/?$ /terms/ [R=301,L]
RewriteRule ^${langPattern}/contact/?$ /contact/ [R=301,L]
RewriteRule ^${langPattern}/cookies/?$ /cookies/ [R=301,L]
RewriteRule ^${langPattern}/education/?$ /education/ [R=301,L]
RewriteRule ^${langPattern}/business/?$ /business/ [R=301,L]
RewriteRule ^${langPattern}/guide/?$ /guide/ [R=301,L]
RewriteRule ^${langPattern}/pricing/?$ /pricing/ [R=301,L]
RewriteRule ^${langPattern}/features/?$ /features/ [R=301,L]
RewriteRule ^${langPattern}/developers/?$ /developers/ [R=301,L]
RewriteRule ^${langPattern}/all-tools/?$ /all-tools/ [R=301,L]
`);

// 2. Legacy Legal Aliases -> Clean Root Legal Pages
redirectRules.push(`
# ----------------------------------------------------------------------
# 2. Legacy / Duplicate Legal Pages 301 Redirects
# ----------------------------------------------------------------------
RewriteRule ^legal/privacy-policy/?$ /privacy/ [R=301,L]
RewriteRule ^legal/terms/?$ /terms/ [R=301,L]
RewriteRule ^${langPattern}/legal/privacy-policy/?$ /privacy/ [R=301,L]
RewriteRule ^${langPattern}/legal/terms/?$ /terms/ [R=301,L]
`);

// Full .htaccess content
const htaccessContent = `
# ==============================================================================
# AnyOnlineTools - Production Server Configuration & SEO Engine
# High-Performance Fast Static Host Configuration for Next.js
# ==============================================================================

Options -Indexes +FollowSymLinks
DirectoryIndex index.html index.htm index.php
DirectorySlash On
ServerSignature Off
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# ----------------------------------------------------------------------
# 1. Enforce HTTPS Protocol
# ----------------------------------------------------------------------
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# ----------------------------------------------------------------------
# 2. Canonical Hostname (Auto-strip www for any domain)
# ----------------------------------------------------------------------
RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [L,R=301]

# ----------------------------------------------------------------------
# 3. Clean URLs & Directory Index Resolution
# ----------------------------------------------------------------------
# Pass through existing files
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [L]

# Ensure trailing slash on directories
RewriteCond %{REQUEST_FILENAME} -d
RewriteCond %{REQUEST_URI} !/$
RewriteRule ^(.*)$ /$1/ [L,R=301]

# Strip .html extension if typed directly
RewriteCond %{THE_REQUEST} \\s/+(.+?)\\.html[\\s?] [NC]
RewriteRule ^ /%1/ [R=301,L]

${redirectRules.join('\n')}

# ----------------------------------------------------------------------
# 4. Standard Next.js Static Export Clean URL Resolution
# ----------------------------------------------------------------------
# If request matches folder/index.html
RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
RewriteRule ^(.*)/?$ /$1/index.html [L]

# If request matches file.html
RewriteCond %{DOCUMENT_ROOT}/$1.html -f
RewriteRule ^(.*)/?$ /$1.html [L]

</IfModule>

# ----------------------------------------------------------------------
# 5. High-Performance Caching & Expire Rules (Sub-200ms Instant Loads)
# ----------------------------------------------------------------------
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"

  # HTML documents - fresh load with ETags
  ExpiresByType text/html "access plus 0 seconds"

  # Static hashed JS, CSS, and fonts - 1 Year Immutable
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType application/x-javascript "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/ttf "access plus 1 year"

  # Media & Icons - 1 Year Immutable
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresByType application/manifest+json "access plus 1 week"
</IfModule>

# ----------------------------------------------------------------------
# 6. Security, Privacy & HTTP Performance Headers
# ----------------------------------------------------------------------
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
  Header set Timing-Allow-Origin "*"

  # Zero-Cache for HTML documents (Prevents stale cached pages)
  <FilesMatch "\\.(html|htm)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate, max-age=0"
    Header set Pragma "no-cache"
    Header set Expires "0"
  </FilesMatch>

  # 1-Year Immutable Cache for Next.js static chunks & hashed assets
  <FilesMatch "\\.(js|css|woff2|woff|ttf|png|jpg|jpeg|gif|ico|svg|webp)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>

# ----------------------------------------------------------------------
# 7. Next-Gen Brotli & Gzip Compression
# ----------------------------------------------------------------------
<IfModule mod_brotli.c>
  AddOutputFilterByType BROTLI_COMPRESS text/plain text/html text/xml text/css text/javascript
  AddOutputFilterByType BROTLI_COMPRESS application/xml application/xhtml+xml application/rss+xml
  AddOutputFilterByType BROTLI_COMPRESS application/javascript application/x-javascript application/json
  AddOutputFilterByType BROTLI_COMPRESS image/svg+xml font/woff font/woff2
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>
`;

const rootHtaccessPath = path.join(__dirname, '..', '.htaccess');
const publicHtaccessPath = path.join(__dirname, '..', 'public', '.htaccess');

fs.writeFileSync(rootHtaccessPath, htaccessContent.trim(), 'utf8');
fs.writeFileSync(publicHtaccessPath, htaccessContent.trim(), 'utf8');

console.log('✅ [HTACCESS] Successfully written .htaccess to root and public/.');
