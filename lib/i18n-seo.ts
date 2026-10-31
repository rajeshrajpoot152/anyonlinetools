export interface LocaleSEO {
  code: string;
  name: string;
  nativeName: string;
  dir?: 'ltr' | 'rtl';
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export const LOCALE_SEO: Record<string, LocaleSEO> = {
  // 1. English (en) - Global base & India
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    title: 'AnyOnlineTools – 100% Free, Fast & Private Online Utilities',
    description: 'Instant, free, and private online utilities for developers, writers, and students. Word counter, text repeater, blur tools, short words finder, and more.',
    ogTitle: 'AnyOnlineTools – Free, Fast & Private Online Utilities',
    ogDescription: 'Instant in-browser utilities for developers, creators, and professionals with 100% client-side privacy.'
  },

  // 2. Español (es) - Spanish (Latin America & Spain)
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr',
    title: 'AnyOnlineTools – Herramientas Online Gratis, Rápidas y Privadas',
    description: 'Colección de utilidades web gratuitas para desarrolladores y escritores. Repetidor de texto, buscador de palabras cortas, censura de imágenes y texto con privacidad total.',
    ogTitle: 'AnyOnlineTools – Herramientas Online Gratis y Privadas',
    ogDescription: 'Utilidades en el navegador para desarrolladores y creadores con privacidad total.'
  },

  // 3. Português (pt) - Portuguese (Brazil)
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    dir: 'ltr',
    title: 'AnyOnlineTools – Ferramentas Online Gratuitas, Rápidas e Privadas',
    description: 'Utilitários web gratuitos para desenvolvedores e escritores. Repetidor de texto, localizador de palavras curtas, desfoque de imagem e texto no navegador.',
    ogTitle: 'AnyOnlineTools – Ferramentas Online Gratuitas',
    ogDescription: 'Ferramentas rápidas no navegador com total privacidade e sem upload para o servidor.'
  },

  // 4. Bahasa Indonesia (id) - Indonesian
  id: {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    dir: 'ltr',
    title: 'AnyOnlineTools – Alat Online Gratis, Cepat dan Privat',
    description: 'Kumpulan utilitas web gratis untuk pengembang dan pembuat konten: pengulang teks WhatsApp, pencari kata pendek, sensor gambar dan teks dengan privasi 100%.',
    ogTitle: 'AnyOnlineTools – Alat Online Gratis',
    ogDescription: 'Utilitas instan di browser dengan privasi 100% tanpa upload data ke server.'
  },

  // 5. Arabic (ar) - Middle East
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    title: 'AnyOnlineTools – أدوات مجانية وسريعة وخاصة عبر الإنترنت',
    description: 'مجموعة أدوات مفيدة للمطورين والمبدعين: مكرر النصوص، مكرر نصوص واتساب، طمس الصور والنصوص، وباحث الكلمات القصيرة مع خصوصية تامة 100%.',
    ogTitle: 'AnyOnlineTools – أدوات مجانية عبر الإنترنت',
    ogDescription: 'أدوات تعمل داخل المتصفح بأمان وخصوصية 100% دون تخزين أي بيانات.'
  },

  // 6. Français (fr) - French
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    title: 'AnyOnlineTools – Outils en Ligne Gratuits, Rapides et Privés',
    description: 'Outils web gratuits pour développeurs et créateurs: répéteur de texte, répéteur WhatsApp, flou d\'image et de texte, recherche de mots courts avec confidentialité 100%.',
    ogTitle: 'AnyOnlineTools – Outils en Ligne Gratuits et Privés',
    ogDescription: 'Utilitaires en ligne instantanés avec confidentialité 100% côté client.'
  },

  // 7. Deutsch (de) - German
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
    title: 'AnyOnlineTools – Kostenlose, schnelle und private Online-Tools',
    description: 'Sammlung nützlicher Web-Tools für Entwickler und Autoren: Text-Repeater, WhatsApp-Nachrichten-Multiplikator, Bildunschärfe und Wortsuche mit vollständiger Privatsphäre.',
    ogTitle: 'AnyOnlineTools – Kostenlose und private Online-Tools',
    ogDescription: 'Schnelle Web-Dienstprogramme im Browser mit vollständiger Privatsphäre.'
  },

  // 8. 日本語 (ja) - Japanese
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    dir: 'ltr',
    title: 'AnyOnlineTools – 無料で高速、安全なオンライン便利ツール',
    description: '開発者やクリエイター向けの無料Webツール集：テキストリピーター、文字ぼかし、画像モザイク・ぼかし、ショートワード検索など、ブラウザ完結で100%安全。',
    ogTitle: 'AnyOnlineTools – 無料オンライン便利ツール',
    ogDescription: 'ブラウザで完結する100%プライベートな高速Webツール。サーバー送信一切なし。'
  },

  // 9. Русский (ru) - Russian
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    dir: 'ltr',
    title: 'AnyOnlineTools – Бесплатные, быстрые и приватные онлайн-инструменты',
    description: 'Набор полезных веб-инструментов: повторитель текста, повторитель для WhatsApp, размытие фото и цензура текста, поиск коротких слов со 100% конфиденциальностью.',
    ogTitle: 'AnyOnlineTools – Бесплатные онлайн-инструменты',
    ogDescription: 'Мгновенные браузерные утилиты с гарантией конфиденциальности данных без загрузки на сервер.'
  },

  // 10. Türkçe (tr) - Turkish
  tr: {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    dir: 'ltr',
    title: 'AnyOnlineTools – Ücretsiz, Hızlı ve Güvenli Çevrimiçi Araçlar',
    description: 'Geliştiriciler ve içerik üreticileri için pratik web araçları: metin tekrarlayıcı, WhatsApp mesaj tekrarlayıcı, resim ve metin bulanıklaştırma araçları.',
    ogTitle: 'AnyOnlineTools – Ücretsiz Çevrimiçi Araçlar',
    ogDescription: 'Tarayıcınızda çalışan 100% gizlilik odaklı araç seti. Sıfır sunucu yüklemesi.'
  },

  // 11. Tiếng Việt (vi) - Vietnamese
  vi: {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    dir: 'ltr',
    title: 'AnyOnlineTools – Công Cụ Trực Tuyến Miễn Phí, Nhanh & Riêng Tư',
    description: 'Bộ công cụ trực tuyến hữu ích: lặp lại văn bản, gửi tin nhắn lặp WhatsApp, làm mờ ảnh và che giấu văn bản nhạy cảm. Bảo mật 100% trên trình duyệt.',
    ogTitle: 'AnyOnlineTools – Công Cụ Trực Tuyến Miễn Phí',
    ogDescription: 'Tiện ích xử lý trực tiếp trên trình duyệt, an toàn bảo mật 100% không lưu trữ máy chủ.'
  },

  // 12. ภาษาไทย (th) - Thai
  th: {
    code: 'th',
    name: 'Thai',
    nativeName: 'ภาษาไทย',
    dir: 'ltr',
    title: 'AnyOnlineTools – เครื่องมือออนไลน์ฟรี รวดเร็ว และเป็นส่วนตัว 100%',
    description: 'ชุดยูทิลิตี้ออนไลน์ฟรีสำหรับทุกคน: ตัวทำซ้ำข้อความ (Text Repeater), ส่งข้อความซ้ำ WhatsApp, เบลอรูปภาพและเซ็นเซอร์ข้อความ ทำงานในเบราว์เซอร์ 100% ปลอดภัย ไร้การอัปโหลด',
    ogTitle: 'AnyOnlineTools – เครื่องมือออนไลน์ฟรีและปลอดภัย',
    ogDescription: 'เครื่องมือบนเว็บที่รวดเร็ว ประมวลผลในเครื่อง ปลอดภัย ไร้การอัปโหลดข้อมูล 100%'
  },

  // 13. Italiano (it) - Italian
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    dir: 'ltr',
    title: 'AnyOnlineTools – Strumenti Online Gratuiti, Veloci e Privati',
    description: 'Utilità web per sviluppatori e scrittori: ripetitore di testo, ripetitore messaggi WhatsApp, sfocatura immagini e testo con privacy 100% lato client.',
    ogTitle: 'AnyOnlineTools – Strumenti Online Gratuiti',
    ogDescription: 'Strumenti online istantanei nel browser con privacy totale e nessun upload.'
  },

  // 14. 한국어 (ko) - Korean
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    dir: 'ltr',
    title: 'AnyOnlineTools – 빠르고 안전한 무료 온라인 유틸리티 도구',
    description: '개발자 및 크리에이터를 위한 유용한 웹 도구 모음: 텍스트 반복기, 카카오톡/왓츠앱 메시지 생성기, 이미지 블러 처리 및 텍스트 마스킹. 100% 로컬 브라우저 실행.',
    ogTitle: 'AnyOnlineTools – 무료 온라인 도구 모음',
    ogDescription: '브라우저에서 100% 안전하게 동작하는 무료 웹 유틸리티. 서버 전송 없는 완벽한 개인정보 보호.'
  },

  // 15. Polski (pl) - Polish (High RPM)
  pl: {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    dir: 'ltr',
    title: 'AnyOnlineTools – Darmowe, szybkie i prywatne narzędzia online',
    description: 'Zestaw darmowych narzędzi webowych dla twórców i deweloperów: powtarzanie tekstu (Text Repeater), generator wiadomości WhatsApp, rozmywanie zdjęć i tekstu. 100% prywatności w przeglądarce.',
    ogTitle: 'AnyOnlineTools – Darmowe i prywatne narzędzia online',
    ogDescription: 'Błyskawiczne narzędzia internetowe działające w Twojej przeglądarce bez przesyłania danych na serwer.'
  },

  // 16. Dutch (nl) - Netherlands & Belgium
  nl: {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    dir: 'ltr',
    title: 'AnyOnlineTools – 100% Gratis, Snelle & Veilige Online Tools',
    description: 'Gratis online hulpprogramma\'s voor ontwikkelaars en schrijvers: tekstherhaler, wazige tekst en afbeeldingen, korte woordenzoeker en meer. 100% lokaal in uw browser.',
    ogTitle: 'AnyOnlineTools – Gratis & Veilige Online Hulpprogramma\'s',
    ogDescription: 'Bliksemsnelle online tools die direct in uw browser werken met 100% privacy en zonder serveropslag.'
  },

  // 17. Swedish (sv) - Sweden
  sv: {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'Svenska',
    dir: 'ltr',
    title: 'AnyOnlineTools – 100% Gratis, Snabba & Privata Onlineverktyg',
    description: 'Gratis webbverktyg för utvecklare och skribenter: textupprepare, sudda text och bilder, hitta korta ord och mer. 100% lokalt i din webbläsare.',
    ogTitle: 'AnyOnlineTools – Gratis & Privata Onlineverktyg',
    ogDescription: 'Blixtsnabba onlineverktyg som körs direkt i din webbläsare med fullständig integritet och noll serveruppladdning.'
  },

  // 18. Chinese Simplified (zh-cn)
  'zh-cn': {
    code: 'zh-cn',
    name: 'Chinese (Simplified)',
    nativeName: '中文 (简体)',
    dir: 'ltr',
    title: 'AnyOnlineTools – 100% 免费、极速且私密的在线工具箱',
    description: '为开发者、创作者和学生打造的免费在线工具箱：文本重复器、图片模糊、文字打码、短词搜索等。100% 浏览器本地运行，零服务器上传，保护您的隐私安全。',
    ogTitle: 'AnyOnlineTools – 免费且私密的在线工具箱',
    ogDescription: '即开即用的浏览器实用工具，全客户端本地计算，100% 隐私安全保障。'
  },

  // 19. Chinese Traditional (zh-tw)
  'zh-tw': {
    code: 'zh-tw',
    name: 'Chinese (Traditional)',
    nativeName: '中文 (繁體)',
    dir: 'ltr',
    title: 'AnyOnlineTools – 100% 免費、極速且隱私安全的線上工具箱',
    description: '專為開發者、創作者與學生打造的免費線上工具：文字重複器、圖片模糊處理、文字馬賽克、短詞搜尋等。100% 瀏覽器本地運算，零資料上傳，嚴格保護隱私。',
    ogTitle: 'AnyOnlineTools – 免費且隱私安全的線上工具箱',
    ogDescription: '瀏覽器即時工具，全客戶端本機處理，100% 隱私安全，無任何伺服器儲存。'
  },

  // 20. Bulgarian (bg)
  bg: {
    code: 'bg',
    name: 'Bulgarian',
    nativeName: 'Български',
    dir: 'ltr',
    title: 'AnyOnlineTools – 100% Безплатни, бързи и сигурни онлайн инструменти',
    description: 'Безплатни уеб инструменти за разработчици и автори: повтаряне на текст, замъгляване на снимки и текст, търсене на кратки думи. 100% сигурност в браузъра без качване на сървър.',
    ogTitle: 'AnyOnlineTools – Безплатни и сигурни онлайн инструменти',
    ogDescription: 'Бързи онлайн инструменти директно във вашия браузър със 100% защита на личните данни.'
  },

  // 21. Catalan (ca)
  ca: {
    code: 'ca',
    name: 'Catalan',
    nativeName: 'Català',
    dir: 'ltr',
    title: 'AnyOnlineTools – Eines en línia 100% gratuïtes, ràpides i privades',
    description: 'Utilitats web gratuïtes per a desenvolupadors i creadors: repetidor de text, desenfocament d\'imatges i text, cercador de paraules curtes. Privadesa total 100% al navegador.',
    ogTitle: 'AnyOnlineTools – Eines en línia gratuïtes i privades',
    ogDescription: 'Eines web instantànies al vostre navegador amb privadesa total i sense càrrega de dades al servidor.'
  },

  // 22. Greek (el)
  el: {
    code: 'el',
    name: 'Greek',
    nativeName: 'Ελληνικά',
    dir: 'ltr',
    title: 'AnyOnlineTools – 100% Δωρεάν, γρήγορα και ασφαλή διαδικτυακά εργαλεία',
    description: 'Δωρεάν εργαλεία ιστού για προγραμματιστές και συγγραφείς: επανάληψη κειμένου, θόλωση εικόνας και κειμένου, εύρεση σύντομων λέξεων. 100% απόρρητο στο πρόγραμμα περιήγησης.',
    ogTitle: 'AnyOnlineTools – Δωρεάν διαδικτυακά εργαλεία',
    ogDescription: 'Άμεσα εργαλεία περιηγητή με 100% προστασία απορρήτου χωρίς μεταφόρτωση σε διακομιστή.'
  },

  // 23. Hindi (hi) - India Anchor
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    dir: 'ltr',
    title: 'AnyOnlineTools – 100% मुफ़्त, तेज़ और सुरक्षित ऑनलाइन टूल्स',
    description: 'डेवलपर्स, छात्रों और लेखकों के लिए मुफ़्त और सुरक्षित वेब टूल्स: टेक्स्ट रिपीटर (Text Repeater), व्हाट्सएप मैसेज रिपीटर, इमेज और टेक्स्ट ब्लर टूल, शॉर्ट वर्ड्स फाइंडर। 100% इन-ब्राउज़र प्राइवेसी बिना सर्वर अपलोड के।',
    ogTitle: 'AnyOnlineTools – मुफ़्त और सुरक्षित ऑनलाइन टूल्स',
    ogDescription: 'ब्राउज़र में 100% सुरक्षित और तेज़ ऑनलाइन टूल्स। बिना किसी डेटा अपलोड के संपूर्ण गोपनीयता।'
  },

  // 24. Malay (ms)
  ms: {
    code: 'ms',
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
    dir: 'ltr',
    title: 'AnyOnlineTools – Alat Dalam Talian 100% Percuma, Pantas & Privasi',
    description: 'Koleksi utiliti web percuma untuk pembangun dan penulis: pengulang teks, pengulang mesej WhatsApp, kaburkan gambar dan teks, pencari perkataan pendek dengan privasi 100% di penyemak imbas.',
    ogTitle: 'AnyOnlineTools – Alat Dalam Talian Percuma',
    ogDescription: 'Utiliti pantas dalam penyemak imbas dengan privasi pelanggan 100% tanpa sebarang muat naik pelayan.'
  },

  // 25. Ukrainian (uk)
  uk: {
    code: 'uk',
    name: 'Ukrainian',
    nativeName: 'Українська',
    dir: 'ltr',
    title: 'AnyOnlineTools – 100% Безкоштовні, швидкі та конфіденційні онлайн-інструменти',
    description: 'Безкоштовні веб-інструменти для розробників, авторів та студентів: повторювач тексту, генератор для WhatsApp, розмиття зображень і приховування тексту. 100% приватність без завантаження на сервер.',
    ogTitle: 'AnyOnlineTools – Безкоштовні онлайн-інструменти',
    ogDescription: 'Миттєві утиліти прямо у вашому браузері з гарантією 100% конфіденційності.'
  },

  // 26. Swahili (sw)
  sw: {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    dir: 'ltr',
    title: 'AnyOnlineTools – Zana za Mtandaoni 100% Bure, Haraka na Salama',
    description: 'Zana za wavuti za bure kwa watengenezaji na waandishi: kurudia maandishi, ujumbe wa WhatsApp, kufifisha picha na maandishi, na kupata maneno mafupi. Usalama wa 100% kwenye kivinjari chako bila kupakia kwenye seva.',
    ogTitle: 'AnyOnlineTools – Zana za Bure Mtandaoni',
    ogDescription: 'Zana za haraka za kivinjari zenye faragha ya 100% bila kuhifadhi data kwenye seva.'
  }
};
