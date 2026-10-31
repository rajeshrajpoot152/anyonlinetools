# Automatic Background Blur & Portrait Bokeh Tool – Architecture Blueprint
> **Blueprint File:** `tool-intel/blur-background-image-tool.md`  
> **Tool Slug:** `blur-background`  
> **Category:** `security` / `image` | Photo Editing & Privacy Tools  
> **Brand & Trademark Safety:** 100% White-Label (Independent, non-infringing web utility)  
> **Target Platform:** AnyOnlineTools (`https://anyonlinetools.com`)

---

## 1. CONCEPT & HIGH-CONVERTING VALUE PROPOSITION

An intelligent in-browser photo utility that blurs backgrounds behind people, objects, or sensitive scenes while keeping the central subject crisp, sharp, and in high resolution (DSLR Bokeh & Portrait Mode effect).

### Core Value Proposition:
- **Zero Server Upload (The 1-Hour Security Flaw Solved):** Market competitors upload personal photos to remote cloud servers and store them for 1 hour. AnyOnlineTools processes images **100% locally in browser memory via HTML5 Canvas and WebGL**—ensuring zero data leakage for personal selfies, business headshots, or private photos.
- **Instant Processing Without Artificial Delays:** Zero 15-second countdown gates or paid tier upsells.
- **Multiple Bokeh Lens Presets:** Circular/Oval Portrait Focus, Tilt-Shift Miniature, and Interactive Protection Brush.
- **Interactive "Before / After" Split View:** Slider to compare original image sharpness against the blurred background.

---

## 2. COMPETITOR STRATEGY DECONSTRUCTION

### What the Competitor Page Does:
1. **Clean Drag-and-Drop Hero Area:** Dashed upload box with prominent "Upload from PC or Mobile" button.
2. **Review & Rating Social Proof:** Displays a high trust metric (`4.9 ⭐ based on 7,000+ reviews`) to assure users of quality.
3. **Massive Global Search Volume:** Millions of users search for *"blur background online"*, *"make background blurry free"*, *"portrait mode online"* for LinkedIn profile photos, resumes, and Instagram posts.

### Competitor Limitations & Vulnerabilities:
- **Cloud Server Retention:** Explicitly states: *"Uploaded and generated files are deleted 1 hour after upload"*. For enterprise, medical, or privacy-conscious users, letting confidential photos sit on third-party servers is unacceptable.
- **Paywall & Artificial Download Wait:** Non-paying users are forced to wait through countdown timers and captchas before downloading.
- **Lack of Manual Control:** If the competitor's automatic segmentation cuts off hair or ears, the user has zero ability to adjust the focus mask.

---

## 3. OUR SUPERIOR 10x IN-BROWSER BLUEPRINT (AnyOnlineTools Advantage)

### Feature 1: 100% Client-Side Bokeh Engine
- Executes entirely inside the client's GPU/Canvas using dual-layer rendering:
  - **Layer 1 (Background):** Filtered with adjustable Gaussian Blur (`ctx.filter = 'blur(Xpx)'`).
  - **Layer 2 (Foreground Mask):** Preserves the original sharp image with soft feathered edges.

### Feature 2: 3 In-Browser Bokeh Presets
1. **Oval Portrait Focus (Default):**
   - Automatically places an elliptical focus region over the center/subject.
   - User can resize, drag, or rotate the oval to fit any person or object.
   - Smooth feathering (gradient falloff) creates a natural optical depth-of-field.
2. **Tilt-Shift / Horizon Focus:**
   - Linear focus band for architectural, landscape, and miniature effects.
3. **Brush-to-Focus Mode:**
   - User paints directly over the subject to keep it 100% sharp while the surrounding background dissolves into bokeh.

### Feature 3: Live "Hold to Compare" & Split Slider
- Button to instantly preview the unblurred original image versus the processed bokeh image.

### Feature 4: High-Performance Export
- Instant download in original resolution (PNG or WebP) with zero quality compression.

---

## 4. MATHEMATICAL & CANVAS RENDERING LOGIC

### Radial Bokeh Gradient Mask Algorithm:
```typescript
// Dual-pass canvas compositing with feathered alpha mask:
const sharpCanvas = document.createElement('canvas'); // Sharp original
const blurCanvas = document.createElement('canvas');  // Filtered background
const maskCanvas = document.createElement('canvas');  // Radial alpha mask

// 1. Draw blurred background:
blurCtx.filter = `blur(${blurStrength}px)`;
blurCtx.drawImage(image, 0, 0);

// 2. Create feathered radial gradient on mask:
const gradient = maskCtx.createRadialGradient(
  focusX, focusY, innerRadius, // Sharp core
  focusX, focusY, outerRadius  // Soft feather transition
);
gradient.addColorStop(0, 'rgba(0,0,0,1)');   // Fully visible subject
gradient.addColorStop(1, 'rgba(0,0,0,0)');   // Transparent falloff to blur

// 3. Composite sharp subject over blurred background:
mainCtx.drawImage(blurCanvas, 0, 0);
sharpCtx.globalCompositeOperation = 'destination-in';
sharpCtx.drawImage(maskCanvas, 0, 0);
mainCtx.drawImage(sharpCanvas, 0, 0);
```

---

## 5. REACT CLIENT COMPONENT SPECIFICATION

### Suggested File: `components/tools/BlurBackground.tsx`

```typescript
export interface BlurBackgroundState {
  imageSrc: string | null;
  fileName: string;
  blurStrength: number; // 5 to 40px (default: 18px)
  focusMode: 'portraitOval' | 'tiltShift' | 'brush' | 'full';
  focusX: number; // percentage (0-100)
  focusY: number; // percentage (0-100)
  featherRadius: number; // 10 to 100px
  isComparing: boolean;
}
```

### UI Controls:
- **Upload Zone:** Drag & drop box with file type validation (`image/jpeg`, `image/png`, `image/webp`).
- **Focus Mode Toolbar:** `[Portrait Oval]` `[Tilt-Shift]` `[Freehand Brush]`
- **Interactive Sliders:**
  - Blur Intensity (Subtle -> Medium -> Heavy DSLR Bokeh)
  - Feather Edge Softness (Hard edge vs. Natural optical falloff)
- **Direct Canvas Preview:** Draggable anchor points on canvas for real-time focus repositioning.
- **Export Toolbar:** `[Compare Original]` `[Reset]` `[Download HD Image]`

---

## 6. 17-LANGUAGE SEO MATRIX & METADATA

| Language Code | SEO Title Template | SEO Description |
| :--- | :--- | :--- |
| `en` | Blur Background Online – Free In-Browser Portrait & Bokeh Photo Tool | Automatically blur photo backgrounds with portrait bokeh effect. 100% free, private client-side processing with zero server uploads. |
| `es` | Desenfocar Fondo de Foto Online – Efecto Retrato y Bokeh Gratis | Desenfoca el fondo de tus imágenes y fotos de perfil al instante. Procesamiento 100% privado en tu navegador sin subir archivos. |
| `pt` | Desfocar Fundo de Foto Online – Efeito Retrato e Bokeh Grátis | Desfoque o fundo de fotos e imagens diretamente no navegador. 100% gratuito, seguro e com privacidade total sem upload. |
| `de` | Bildhintergrund Unscharf Machen – Kostenloser Bokeh & Porträt-Effekt | Machen Sie den Fotohintergrund online kostenlos unscharf. 100% privat im Browser ohne Hochladen auf Server. |
| `fr` | Flouter l'Arrière-Plan d'une Image – Effet Portrait & Bokeh Gratuit | Floutez facilement l'arrière-plan de vos photos en ligne. Traitement 100% privé dans votre navigateur sans téléversement. |
| `nl` | Achtergrond van Foto Vervagen – Gratis Bokeh & Portreteffect Online | Vervaag de achtergrond van foto's direct in uw browser. 100% gratis en privé zonder uploaden naar externe servers. |
| `sv` | Sudda Bakgrund på Bild Online – Gratis Porträtt & Bokeheffekt | Gör bakgrunden oskarp på foton direkt i webbläsaren. 100% gratis, snabbt och privat utan serveruppladdning. |
| `it` | Sfocare lo Sfondo di una Foto Online – Effetto Ritratto Bokeh Gratis | Sfoca lo sfondo delle tue immagini online per ritratti professionali. 100% gratuito e privato direttamente nel browser. |
| `ja` | 写真の背景ぼかしツール – オンラインで一眼レフ風ポートレート加工 | 画像の背景を自動でぼかして被写体を際立たせる無料ツール。サーバー保存なしで100%安全・ブラウザ完結。 |
| `ko` | 사진 배경 흐리게 하기 – 무료 온라인 인물 사진 보케 효과 | 사진 배경을 자연스럽게 블러 처리하여 인물을 돋보이게 만드세요. 서버 업로드 없는 100% 안전한 브라우저 도구. |
| `pl` | Rozmywanie Tła Zdjęcia Online – Darmowy Efekt Portretowy Bokeh | Rozmyj tło na zdjęciu w przeglądarce i uzyskaj profesjonalny efekt portretowy. 100% darmowe i bezpieczne bez wysyłania na serwer. |
| `id` | Buramkan Latar Belakang Foto Online – Efek Bokeh & Potret Gratis | Edit latar belakang foto menjadi blur langsung di browser. 100% gratis, cepat, dan privasi terjamin tanpa upload server. |
| `tr` | Fotoğraf Arka Planını Bulanıklaştırma – Ücretsiz Portre Bokeh Aracı | Fotoğraflarınızın arka planını tarayıcınızda anında bulanıklaştırın. Sunucuya yükleme olmadan 100% güvenli ve ücretsiz. |
| `ru` | Размыть Задний Фон на Фото Онлайн – Бесплатный Эффект Боке и Портрета | Сделайте фон фотографии размытым онлайн. 100% бесплатный и безопасный инструмент в браузере без сохранения на сервере. |
| `ar` | تمويه خلفية الصورة أونلاين – تأثير بوكيه وتأثير البورتريه مجاناً | قم بطمس وتمويه خلفية الصور بسهولة داخل المتصفح. أداة مجانية 100% مع خصوصية كاملة دون رفع الملفات إلى الخادم. |
| `vi` | Làm Mờ Nền Ảnh Trực Tuyến – Hiệu Ứng Chân Dung Bokeh Miễn Phí | Làm mờ hậu cảnh ảnh chân dung nhanh chóng trên trình duyệt. 100% miễn phí, bảo mật tối đa không lưu trữ trên máy chủ. |
| `th` | เบลอพื้นหลังรูปภาพออนไลน์ – เอฟเฟกต์ภาพบุคคลและโบเก้ฟรี | เบลอพื้นหลังรูปภาพอย่างง่ายดายในเบราว์เซอร์ของคุณ ฟรี 100% และเป็นส่วนตัวโดยไม่ต้องอัปโหลดไปยังเซิร์ฟเวอร์. |

---

## 7. ORIGINAL & COMPREHENSIVE FAQ SET

1. **How does this tool blur the background without uploading my image?**  
   *AnyOnlineTools utilizes HTML5 Canvas and hardware-accelerated WebGL directly within your web browser. The image is loaded into your local device memory (RAM), processed visually, and exported without a single byte ever touching a remote cloud server.*

2. **Why is in-browser processing safer than other online background blur tools?**  
   *Most online photo tools upload your personal images to third-party cloud servers where they are stored for an hour or more. This poses privacy risks for family photos, confidential work documents, or official headshots. Our in-browser approach guarantees 100% privacy because your files never leave your device.*

3. **Can I adjust the blur intensity and position?**  
   *Yes. You can use the slider to adjust blur strength from subtle lens softness to intense DSLR bokeh. You can also drag and resize the interactive focus oval to perfectly frame your subject.*

4. **Will my exported image lose resolution or quality?**  
   *No. The output image maintains the original pixel dimensions and resolution of your uploaded file. You can export as a crisp PNG or high-efficiency WebP image.*

---

## 8. INTEGRATION CHECKLIST FOR ANYONLINETOOLS

- [x] Dedicated URL: `blur-background` (Complements existing `blur-image` tool).
- [x] Distinct Use Case: `blur-image` is for document redaction/censorship; `blur-background` is for creative portraits and photo bokeh.
- [x] Component planned: `components/tools/BlurBackground.tsx`
- [x] Auto-sitemap integration ready
- [x] 17-Language SEO mapping complete
- [x] Zero competitor trademark references
