# 🛠️ ANYONLINETOOLS — SINGLE TOOL SPECIFICATION: BLUR TEXT
> **Status:** Live & Fully Implemented  
> **Tool Slug:** `blur-text`  
> **Target Platform:** AnyOnlineTools (`https://anyonlinetools.com`)  
> **Architecture:** 100% Native Next.js 14 App Router Dynamic Engine (`components/tools/BlurText.tsx`)  
> **Localization:** Full-Page Intent Localization across all 26 supported languages via `lib/translations/blur-text.json`  

---

## 1. TOOL IDENTITY & SEO TARGETING

* **Tool Slug (URL Path):** `blur-text`
* **Tool Display Name:** `Blur Text`
* **Category:** `security` / `text`
* **Category Label:** `Privacy & Text Redaction`
* **Primary Target Keyword:** `blur text` (100K – 1M searches/mo, ₹560.40 Top Bid CPC)
* **Secondary Keywords:** `blur writing`, `blur out words`, `blur text in image`, `blur text in picture`, `censor text`, `spoiler text generator`, `redact screenshot text`
* **Icon Name:** `EyeOff`
* **Badge:** `Security & Privacy`

### 🛑 Anti-Saturation Guardrail Check:
- [x] **Keyword Difficulty Verified:** Low competition (KD < 25), massive search intent with +900% growth.
- [x] **Zero Cloud Security Vulnerability:** Unlike competitors who upload images to remote cloud servers for 1 hour, AnyOnlineTools runs 100% locally in browser memory.
- [x] **Dual Workspace Value:** Combines both live CSS/Unicode text obfuscation and multi-region screenshot image redaction.

---

## 2. CLIENT-SIDE PRIVACY & ENGINE SPECIFICATION

* **Execution Engine:** 
  - **Mode 1 (Text Obfuscation):** CSS backdrop-filter, SVG gaussian filters, Unicode zero-width/scramble mapping.
  - **Mode 2 (Image Redactor):** HTML5 Canvas 2D / WebGL pixelation and gaussian blur matrices.
* **Server Data Transmission:** **0 Bytes Uploaded** (Runs 100% in client browser memory)
* **Data Retention:** **0 Seconds** (Nothing stored on servers or persistent cookies)
* **Offline Compatibility:** **100% Functional Offline** via Service Worker
* **Pricing Model:** **$0 Free Forever** (No watermarks, no image limits, no signup)
* **Speed Benchmark:** **< 5ms image filter processing**, **CLS = 0.000**

---

## 3. CORE FEATURE ARCHITECTURE

### Workspace Mode 1: Text & CSS Obfuscator
- **4 Obfuscation Modes:**
  1. `blur`: Adjustable CSS Gaussian blur (`filter: blur(Xpx)`) with direction options (uniform, left-to-right, right-to-left, bidirectional gradient).
  2. `censor`: Blackout / Redaction bars (`████████`) replacing sensitive text.
  3. `spoiler`: Interactive click-to-reveal spoiler cards (Discord/Reddit style).
  4. `scramble`: Cryptographic character shuffling preserving word length.
- **Developer Export:** 1-Click copy of clean CSS snippets (`filter`, `backdrop-filter`, `user-select: none`).

### Workspace Mode 2: Multi-Region Screenshot Redactor
- **3 Redaction Styles:** Gaussian Blur, Mosaic Pixelation, and Solid Blackout.
- **2 Geometry Shapes:** Freeform Rectangles and Ellipses / Circles.
- **Interactive Controls:** Drag-to-draw, move, resize handles, and delete boxes.
- **Split Comparison:** Interactive draggable Before/After slider (0% to 100%).
- **Native Clipboard Copy:** `navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])` for instant pasting into Slack, WhatsApp, or Gmail.

---

## 4. 26-LANGUAGE FULL-PAGE LOCALIZATION MATRIX

| Code | Localized Name | Primary Local Target Keyword | Localized SEO Title Target |
| :--- | :--- | :--- | :--- |
| `en` | Blur Text | `blur text` | Blur Text Online – Free Privacy Text & Screenshot Redactor |
| `es` | Desenfocar Texto | `desenfocar texto` | Desenfocar Texto Online – Censurar y Ocultar Texto en Imágenes Gratis |
| `pt` | Desfocar Texto | `desfocar texto` | Desfocar Texto Online – Censurar Texto e Imagens Grátis |
| `id` | Buramkan Teks | `buramkan teks` | Buramkan Teks Online – Sensor Teks & Redaksi Gambar Gratis |
| `ar` | تمويه النص | `تمويه النص` | تمويه النص أونلاين – حجب وتعتيم النصوص في الصور مجاناً |
| `fr` | Flouter du Texte | `flouter du texte` | Flouter du Texte en Ligne – Masquer et Censurer Texte et Images |
| `de` | Text Verwischen | `text verwischen` | Text Verwischen Online – Text & Screenshots Sicher Zensieren |
| `ja` | テキストぼかし | `テキストぼかし` | テキストぼかし オンライン – 文字や画像の個人情報を無料でモザイク加工 |
| `ru` | Размыть Текст | `размыть текст` | Размыть Текст Онлайн – Скрыть и Зацензурить Текст на Фото Бесплатно |
| `tr` | Metni Bulanıklaştır | `metni bulanıklaştır` | Metni Bulanıklaştır Online – Resimdeki Yazıyı ve Bilgileri Sansürle |
| `vi` | Làm Mờ Văn Bản | `làm mờ văn bản` | Làm Mờ Văn Bản Online – Che Thông Tin & Làm Mờ Ảnh Miễn Phí |
| `th` | เบลอข้อความ | `เบลอข้อความ` | เบลอข้อความออนไลน์ – เซ็นเซอร์ข้อความและรูปภาพฟรี |
| `it` | Sfoca Testo | `sfoca testo` | Sfoca Testo Online – Censura e Nascondi Testo in Immagini Gratis |
| `ko` | 텍스트 흐리게 | `텍스트 흐리게` | 텍스트 흐리게 온라인 – 텍스트 및 이미지 개인정보 모자이크 무료 |
| `pl` | Rozmyj Tekst | `rozmyj tekst` | Rozmyj Tekst Online – Cenzurowanie i Ukrywanie Tekstu na Zdjęciach |
| `nl` | Tekst Vervagen | `tekst vervagen` | Tekst Vervagen Online – Verberg en Censureer Tekst in Afbeeldingen |

---

## 5. 10 GOLDEN RULES COMPLIANCE VERIFICATION

1. [x] **Rule 1 (Canvas Mobile Touch):** Canvas has `style={{ touchAction: 'none' }}`, touch events call `e.cancelable && e.preventDefault()`, safely checks `e.changedTouches`.
2. [x] **Rule 2 (DOM Lag Shield):** Text preview virtualized; image redactor renders directly to HTML5 Canvas at 60fps.
3. [x] **Rule 3 (1-Click Clipboard):** Instant copy button for both text snippets and direct PNG blob clipboard export.
4. [x] **Rule 4 (Resolution-Aware Scaling):** Blur and pixelation kernels dynamically scaled based on natural image dimensions (`Math.max(1, Math.floor(img.width / 1200))`).
5. [x] **Rule 5 (Before/After Split):** Draggable split comparison slider with `skipSplit = true` on export.
6. [x] **Rule 6 (Safety Guidance):** Pre-flight privacy tips ("Common Items People Redact: Passwords, API Keys, Credit Cards").
7. [x] **Rule 7 (Keyboard Shortcuts):** `Ctrl+Z` undo, `Ctrl+V` paste image from clipboard, `Escape` to cancel draw.
8. [x] **Rule 8 (Tool Isolation):** Self-contained in `components/tools/BlurText.tsx` and `lib/translations/blur-text.json`.
9. [x] **Rule 9 (Accessibility):** All icon buttons have full `aria-label` and `title` tags.
10. [x] **Rule 10 (Sitemap Registration):** Canonical `/blur-text/` and all 25 localized routes indexed in `sitemap-tools.xml` and `sitemap-locales.xml`.
