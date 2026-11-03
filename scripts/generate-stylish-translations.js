const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const translationsDir = path.join(projectRoot, 'lib', 'translations');
const toolsJsonPath = path.join(projectRoot, 'lib', 'tools.json');

const tools = JSON.parse(fs.readFileSync(toolsJsonPath, 'utf8'));
const tool = tools.find(t => t.slug === 'stylish-text-generator');

if (!tool) {
  console.error('Tool not found in tools.json');
  process.exit(1);
}

// 26 Supported Locales in AnyOnlineTools
const LOCALE_DATA = {
  en: {
    name: 'Stylish Text Generator',
    seoTitle: 'Stylish Text Generator (𝓬𝓸𝓹𝔂 𝓪𝓷𝓭 𝓹𝓪𝓼𝓽𝓮) – 100+ Fancy Fonts',
    seoDesc: 'Convert text into 100+ fancy styles, cursive fonts, Free Fire gamer wings, and Facebook VIP bio barcodes. 100% free, private in-browser tool with one-click copy.',
    keywords: ['stylish text generator', 'fancy text generator', 'stylish font copy and paste', 'cool font generator', 'fancy font style', 'stylish text for free fire', 'font changer', 'stylish text whatsapp'],
    heading: 'Stylish Text Generator Online',
    subheading: 'Convert normal text into 100+ creative Unicode fonts, cursive script, gothic letters, Free Fire wings, and Facebook VIP bio barcodes with instant 1-click copy.',
    badge: '100% Free · Client-Side Processing · No Upload'
  },
  es: {
    name: 'Generador de Texto Elegante',
    seoTitle: 'Generador de Texto Elegante (𝓬𝓸𝓹𝔂 𝓪𝓷𝓭 𝓹𝓪𝓼𝓽𝓮) – Letras Bonitas y Free Fire',
    seoDesc: 'Convierte texto normal en más de 100 estilos elegantes, letras cursivas, alas de Free Fire y códigos de barras VIP. Gratis y privado con copia en 1 clic.',
    keywords: ['generador de texto elegante', 'letras bonitas', 'fuentes para free fire', 'letras cursivas copy paste', 'conversor de letras', 'fuentes bonitas copiar y pegar'],
    heading: 'Generador de Texto Elegante y Letras Bonitas',
    subheading: 'Convierte texto en más de 100 estilos de fuentes Unicode, letras cursivas, símbolos góticos y alas de Free Fire con copia rápida.',
    badge: '100% Gratis · Procesamiento en Navegador · Sin Servidor'
  },
  pt: {
    name: 'Gerador de Fontes Elegantes',
    seoTitle: 'Gerador de Fontes e Letras Bonitas (𝓬𝓸𝓹𝔂 𝓪𝓷𝓭 𝓹𝓪𝓼𝓽𝓮) – 100+ Estilos',
    seoDesc: 'Converta texto normal em mais de 100 fontes diferentes, letras bonitas para Instagram e apelidos Free Fire. 100% gratuito e privado no navegador.',
    keywords: ['gerador de fontes', 'fontes bonitas', 'letras diferentes', 'fontes para free fire', 'letras personalizadas', 'copiar e colar fontes'],
    heading: 'Gerador de Fontes e Letras Bonitas Online',
    subheading: 'Crie textos estilizados com mais de 100 variações Unicode, caligrafia cursiva e asas para nicks de jogos com cópia em 1 clique.',
    badge: '100% Gratuito · Processamento Local · Sem Upload'
  },
  id: {
    name: 'Generator Teks Keren',
    seoTitle: 'Generator Teks Keren & Huruf Estetik – 100+ Font Salin Tempel',
    seoDesc: 'Ubah teks biasa menjadi 100+ font keren, huruf estetik, simbol Free Fire, dan bio Instagram. 100% gratis dan aman langsung di browser.',
    keywords: ['generator teks keren', 'tulisan aesthetic', 'font keren free fire', 'huruf miring wa', 'teks bergaya salin tempel'],
    heading: 'Generator Teks Keren & Huruf Estetik',
    subheading: 'Buat nama game Free Fire dan bio media sosial dengan 100+ gaya font Unicode kreatif secara instan.',
    badge: '100% Gratis · Proses di Browser · Tanpa Server'
  },
  ar: {
    name: 'مولد نصوص مزخرفة',
    seoTitle: 'مولد نصوص مزخرفة وخطوط إنجليزية رائعة (نسخ ولصق) – 100+ نمط',
    seoDesc: 'حول النص العادي إلى أكثر من 100 خط مزخرف وأسماء فري فاير وبايو انستقرام مميز. أداة مجانية 100% وسريعة في المتصفح.',
    keywords: ['مولد نصوص مزخرفة', 'زخرفة انجليزي', 'زخرفة اسماء فري فاير', 'خطوط انستقرام', 'زخرفة نصوص اون لاين'],
    heading: 'مولد نصوص مزخرفة وخطوط رائعة أونلاين',
    subheading: 'زخرفة النصوص الإنجليزية والأرقام والأسماء للألعاب ووسائل التواصل الاجتماعي بنقرة واحدة.',
    badge: 'مجاني 100% · معالجة محلية بالكامل · بدون خوادم'
  },
  fr: {
    name: 'Générateur de Texte Stylé',
    seoTitle: 'Générateur de Texte Stylé & Polices Rares (𝓬𝓸𝓹𝔂 𝓪𝓷𝓭 𝓹𝓪𝓼𝓽𝓮) – 100+ Styles',
    seoDesc: 'Transformez vos textes en plus de 100 polices stylées, écriture cursive, symboles gothiques et pseudos de jeu. 100% gratuit et privé.',
    keywords: ['générateur de texte stylé', 'police d ecriture stylé', 'ecriture cursive copier coller', 'pseudo stylé free fire', 'lettres stylées'],
    heading: 'Générateur de Texte Stylé et Polices Rares',
    subheading: 'Convertissez instantanément vos textes en styles Unicode uniques avec copie en un clic.',
    badge: '100% Gratuit · Traitement en Mémoire · Aucune Donnée Enregistrée'
  },
  de: {
    name: 'Stylischer Text-Generator',
    seoTitle: 'Stylischer Schriftarten-Generator – Coole Schriften zum Kopieren',
    seoDesc: 'Erstelle über 100 coole Schriftarten, Schreibschrift, Gothic und Gamer-Nicknames. 100% kostenlos und privat im Browser.',
    keywords: ['schriftarten generator', 'coole schriften zum kopieren', 'schöne buchstaben', 'whatsapp kanal schriften aesthetic', 'text verschönern'],
    heading: 'Stylischer Schriftarten-Generator Online',
    subheading: 'Wandle normalen Text in über 100 kreative Unicode-Schriftarten und Gaming-Tags um.',
    badge: '100% Kostenlos · Lokale Ausführung · Kein Server-Upload'
  },
  ja: {
    name: 'スタイリッシュ文字ジェネレーター',
    seoTitle: 'スタイリッシュ文字・可愛いフォント変換ジェネレーター【コピペ無料】',
    seoDesc: '普通の文字を100種類以上の可愛いフォント、筆記体、特殊文字、ゲームネームに瞬時に変換。ワンクリックで簡単コピー。',
    keywords: ['フォントジェネレーター', '可愛いフォント コピペ', '特殊文字 英語', '筆記体 変換', 'インスタ 文字 かわいい'],
    heading: 'スタイリッシュ文字＆可愛いフォント変換',
    subheading: 'インスタのプロフィールやゲームネームに使える特殊文字フォントをブラウザ上で即座に生成します。',
    badge: '完全無料 · ブラウザ完結 · 個人情報保護'
  },
  ru: {
    name: 'Генератор Красивого Текста',
    seoTitle: 'Генератор Красивого Текста и Красивых Шрифтов – Скопировать и Вставить',
    seoDesc: 'Преобразуйте текст в более чем 100 красивых шрифтов, курсив, готику и никнеймы для игр. 100% бесплатно и конфиденциально.',
    keywords: ['генератор красивого текста', 'красивые шрифты скопировать', 'красивые буквы для ников', 'шрифты для инстаграма', 'текст с закорючками'],
    heading: 'Генератор Красивого Текста и Шрифтов',
    subheading: 'Создавайте стильные никнеймы и красивый текст для социальных сетей в один клик.',
    badge: '100% Бесплатно · Обработка в Браузере · Без Загрузки'
  },
  tr: {
    name: 'Şekilli Yazı Yazma',
    seoTitle: 'Şekilli Yazı Yazma & Havalı Yazı Stilleri (𝓬𝓸𝓹𝔂 𝓪𝓷𝓭 𝓹𝓪𝓼𝓽𝓮) – 100+ Font',
    seoDesc: 'Normal metinleri 100+ farklı şekilli yazıya, el yazısına ve oyun nicklerine dönüştürün. Tek tıkla kopyala yapıştır, tamamen ücretsiz.',
    keywords: ['şekilli yazı yazma', 'yazı stilleri', 'havalı nickler', 'pubg şekilli nick', 'süslü yazı yazma', 'şekilli harfler'],
    heading: 'Şekilli Yazı Yazma ve Havalı Yazı Stilleri',
    subheading: 'Oyun nickleri ve sosyal medya biyografileri için 100+ şekilli fontu anında oluşturun.',
    badge: '100% Ücretsiz · Tarayıcı İçi İşlem · Güvenli ve Gizli'
  },
  vi: {
    name: 'Trình Tạo Chữ Đẹp',
    seoTitle: 'Trình Tạo Chữ Đẹp & Font Chữ Độc Đáo – Sao Chép và Dán Miễn Phí',
    seoDesc: 'Đổi chữ bình thường thành hơn 100 kiểu chữ đẹp, chữ nghệ thuật, tên game Free Fire và bio mạng xã hội cực nhanh.',
    keywords: ['tạo chữ đẹp', 'font chữ đẹp', 'kí tự đặc biệt ff', 'chữ in đậm facebook', 'chữ nghiêng online'],
    heading: 'Trình Tạo Chữ Đẹp và Font Chữ Nghệ Thuật',
    subheading: 'Tạo tên game và status mạng xã hội độc đáo với hơn 100 font chữ Unicode sáng tạo.',
    badge: '100% Miễn Phí · Xử Lý Trực Tiếp · Không Tải Lên'
  },
  th: {
    name: 'ตัวสร้างข้อความเก๋ๆ',
    seoTitle: 'ตัวสร้างข้อความเก๋ๆ & ฟอนต์สวยๆ – คัดลอกและวางฟรี 100+ สไตล์',
    seoDesc: 'เปลี่ยนข้อความธรรมดาเป็นฟอนต์สวยๆ ตัวหนังสือเท่ๆ สำหรับชื่อเกม Free Fire และไอจี คัดลอกได้ในคลิกเดียว.',
    keywords: ['ฟอนต์สวยๆ', 'ตัวหนังสือเท่ๆ', 'ฟอนต์ไอจี', 'ชื่อฟีฟายเท่ๆ', 'ตัวอักษรพิเศษ'],
    heading: 'ตัวสร้างข้อความเก๋ๆ และฟอนต์ตัวอักษรสวยๆ',
    subheading: 'สร้างชื่อเล่นในเกมและข้อความโซเชียลมีเดียด้วยฟอนต์ Unicode กว่า 100 รูปแบบ.',
    badge: 'ฟรี 100% · ทำงานในเบราว์เซอร์ · ปลอดภัย'
  },
  it: {
    name: 'Generatore di Testo Elegante',
    seoTitle: 'Generatore di Testo Elegante e Font Particolari con Cuore – Copia e Incolla',
    seoDesc: 'Trasforma il testo normale in oltre 100 font particolari, corsivo, caratteri gotici e simboli con cuore. Gratis e privato.',
    keywords: ['generatore di testo elegante', 'font con simbolo cuore', 'scrittura particolare', 'lettere strane per instagram', 'caratteri speciali'],
    heading: 'Generatore di Testo Elegante e Font Particolari',
    subheading: 'Crea testi con caratteri speciali, cuoricini ed estetica curata con copia istantanea.',
    badge: '100% Gratuito · Esecuzione Locale · Nessun Invio Dati'
  },
  ko: {
    name: '예쁜 글씨체 생성기',
    seoTitle: '예쁜 글씨체 생성기 & 스타일리시 폰트 변환기 – 무료 복사 붙여넣기',
    seoDesc: '일반 텍스트를 100가지 이상의 예쁜 영어 폰트, 필기체, 특수기호로 즉시 변환합니다. 인스타 바이오와 게임 닉네임에 최적화.',
    keywords: ['폰트 생성기', '예쁜 글씨체', '인스타 폰트', '특수문자 닉네임', '필기체 변환'],
    heading: '예쁜 글씨체 생성기 & 감성 폰트 변환',
    subheading: '인스타그램 바이오와 게임 닉네임에 어울리는 감성적인 영어 폰트를 한 번의 클릭으로 복사하세요.',
    badge: '100% 무료 · 브라우저 로컬 변환 · 개인정보 안전'
  },
  pl: {
    name: 'Generator Stylowego Tekstu',
    seoTitle: 'Generator Stylowego Tekstu – Fajne Czcionki Kopiuj i Wklej',
    seoDesc: 'Przekształć zwykły tekst w ponad 100 fajnych czcionek, pismo odręczne i nicki do gier. W 100% darmowe i prywatne narzędzie.',
    keywords: ['fajne czcionki', 'generator stylowego tekstu', 'dziwne litery kopiuj wklej', 'czcionki na instagrama', 'eleganckie litery'],
    heading: 'Generator Stylowego Tekstu i Fajnych Czcionek',
    subheading: 'Błyskawicznie twórz unikalne napisy do gier i mediów społecznościowych bez instalacji oprogramowania.',
    badge: '100% Darmowy · Działanie w Przeglądarce · Pełna Prywatność'
  },
  nl: {
    name: 'Stijlvolle Tekst Generator',
    seoTitle: 'Stijlvolle Tekst Generator & Mooie Letters – Kopiëren en Plakken',
    seoDesc: 'Zet normale tekst om in meer dan 100 stijlvolle lettertypen, cursief schrift en game-aliassen. 100% gratis en veilig in je browser.',
    keywords: ['stijlvolle tekst generator', 'mooie letters', 'cursief lettertype kopiëren', 'speciale tekens instagram', 'lettertypes kopiëren'],
    heading: 'Stijlvolle Tekst Generator en Mooie Letters',
    subheading: 'Creëer eenvoudig opvallende biografieën en berichten met meer dan 100 Unicode-stijlen.',
    badge: '100% Gratis · Browsergeheugen · Geen Gegevensoverdracht'
  },
  sv: {
    name: 'Snygg Text Generator',
    seoTitle: 'Snygg Text Generator – Häftiga Typsnitt Kopiera och Klistra in',
    seoDesc: 'Omvandla vanlig text till över 100 snygga typsnitt, skrivstil och spelnamn. 100% gratis och privat i webbläsaren.',
    keywords: ['snygga typsnitt', 'snygg text generator', 'fina bokstäver kopiera', 'typsnitt instagram', 'skrivstil generator'],
    heading: 'Snygg Text Generator Online',
    subheading: 'Skapa unika teckensnitt och gamer-nicknames direkt i webbläsaren med snabbkopiering.',
    badge: '100% Gratis · Lokal Bearbetning · Inga Servrar'
  },
  'zh-cn': {
    name: '漂亮字体生成器',
    seoTitle: '漂亮字体生成器 – 100+ 酷炫特殊艺术字一键复制粘贴',
    seoDesc: '把普通英文字母快速转换为100多种花体字、黑体、泡泡字和游戏个性名字。纯网页本地运算，免费秒复制。',
    keywords: ['漂亮字体', '花体英文在线转换', '特殊字体复制', '个性游戏名', '朋友圈特殊字体'],
    heading: '漂亮字体与花体英文在线生成器',
    subheading: '轻松制作适合社交媒体个人简介和游戏昵称的酷炫艺术字体。',
    badge: '100% 免费 · 纯浏览器运行 · 零隐私上传'
  },
  'zh-tw': {
    name: '漂亮字體產生器',
    seoTitle: '漂亮字體產生器 – 100+ 特殊藝術字複製貼上',
    seoDesc: '將普通英文文字秒轉為100多種花體字、手寫字與遊戲暱稱符號。完全免費、安全且免安裝。',
    keywords: ['特殊字體', '漂亮字體產生器', '英文花體字轉換', 'IG字體複製', '遊戲暱稱特殊符號'],
    heading: '漂亮字體產生器與特殊藝術字轉換',
    subheading: '提供豐富的Unicode特殊字元、遊戲翅膀與社群專屬排版字型。',
    badge: '100% 免費 · 瀏覽器記憶體運算 · 無伺服器傳輸'
  },
  bg: {
    name: 'Генератор на стилен текст',
    seoTitle: 'Генератор на стилен текст – Красиви шрифтове копирай и постави',
    seoDesc: 'Преобразувайте обикновен текст в над 100 стилни шрифта, ръкописен текст и игрални никове. Напълно безплатно и сигурно.',
    keywords: ['стилен текст', 'красиви шрифтове', 'генератор на текст', 'шрифтове за инстаграм', 'специални символи'],
    heading: 'Генератор на стилен текст и красиви шрифтове',
    subheading: 'Създавайте креативни надписи за игри и социални мрежи само с едно щракване.',
    badge: '100% Безплатно · Локална обработка · Пълна поверителност'
  },
  ca: {
    name: 'Generador de Text Elegant',
    seoTitle: 'Generador de Text Elegant – Lletres Boniques Copia i Enganxa',
    seoDesc: 'Converteix text normal en més de 100 estils elegants, lletres cursives i àlies de joc. 100% gratuït i privat al teu navegador.',
    keywords: ['generador de text elegant', 'lletres boniques', 'fonts per a instagram', 'lletres cursives', 'caràcters especials'],
    heading: 'Generador de Text Elegant i Lletres Boniques',
    subheading: 'Crea textos estilitzats per a les teves xarxes socials i perfils de joc de manera instantània.',
    badge: '100% Gratuït · Execució Local · Sense Servidors'
  },
  el: {
    name: 'Γεννήτρια Κομψού Κειμένου',
    seoTitle: 'Γεννήτρια Κομψού Κειμένου – Όμορφες Γραμματοσειρές Δωρεάν',
    seoDesc: 'Μετατρέψτε κανονικό κείμενο σε πάνω από 100 όμορφα στυλ γραμματοσειρών και ονόματα παιχνιδιών. 100% δωρεάν και ασφαλές.',
    keywords: ['όμορφες γραμματοσειρές', 'γεννήτρια κειμένου', 'ειδικοί χαρακτήρες', 'ονόματα για παιχνίδια', 'γραμματοσειρές ινσταγκραμ'],
    heading: 'Γεννήτρια Κομψού Κειμένου & Όμορφων Γραμματοσειρών',
    subheading: 'Δημιουργήστε εντυπωσιακά κείμενα για κοινωνικά δίκτυα και προφίλ παιχνιδιών άμεσα.',
    badge: '100% Δωρεάν · Επεξεργασία στο Πρόγραμμα Περιήγησης · Απόλυτη Ιδιωτικότητα'
  },
  hi: {
    name: 'स्टाइलिश टेक्स्ट जनरेटर',
    seoTitle: 'स्टाइलिश टेक्स्ट जनरेटर (𝓬𝓸𝓹𝔂 𝓪𝓷𝓭 𝓹𝓪𝓼𝓽𝓮) – 100+ फैंसी फॉन्ट्स',
    seoDesc: 'साधारण टेक्स्ट को 100+ फैंसी स्टाइल, कर्सिव राइटिंग, फ्री फायर विंग्स और फेसबुक वीआईपी बायो बारकोड में बदलें। 1-क्लिक कॉपी के साथ 100% फ्री।',
    keywords: ['स्टाइलिश टेक्स्ट जनरेटर', 'fancy text generator', 'stylish font copy and paste', 'free fire stylish name', 'facebook vip bio text'],
    heading: 'स्टाइलिश टेक्स्ट जनरेटर ऑनलाइन',
    subheading: 'अपने नाम और बायो को 100+ आकर्षक फॉन्ट्स और गेमिंग विंग्स में तुरंत बदलें और कॉपी करें।',
    badge: '100% फ्री · ब्राउज़र मेमोरी में प्रोसेसिंग · नो सर्वर अपलोड'
  },
  ms: {
    name: 'Penjana Teks Bergaya',
    seoTitle: 'Penjana Teks Bergaya & Tulisan Cantik – Salin dan Tampal Percuma',
    seoDesc: 'Tukar teks biasa kepada 100+ fon bergaya, tulisan berangkai, dan nama permainan Free Fire secara percuma dan pantas.',
    keywords: ['penjana teks bergaya', 'tulisan cantik', 'huruf bergaya copy paste', 'nama free fire gempak', 'tulisan aesthetic ig'],
    heading: 'Penjana Teks Bergaya dan Tulisan Cantik',
    subheading: 'Hasilkan teks unik untuk profil media sosial dan nama permainan anda dengan sekali klik.',
    badge: '100% Percuma · Pemprosesan Tempatan · Privasi Penuh'
  },
  uk: {
    name: 'Генератор Красивого Тексту',
    seoTitle: 'Генератор Красивого Тексту та Шрифтів – Скопіювати і Вставити',
    seoDesc: 'Перетворюйте звичайний текст на понад 100 красивих шрифтів, курсив, готику та нікнейми для ігор. 100% безкоштовно та приватно.',
    keywords: ['красиві шрифти', 'генератор красивого тексту', 'шрифти для інстаграму', 'красиві літери скопіювати', 'ники для ігор'],
    heading: 'Генератор Красивого Тексту і Шрифтів Онлайн',
    subheading: 'Створюйте унікальні написи для ігор та соціальних мереж миттєво у вашому браузері.',
    badge: '100% Безкоштовно · Обробка в Браузері · Без Збереження Даних'
  },
  sw: {
    name: 'Jenereta ya Maandishi ya Mtindo',
    seoTitle: 'Jenereta ya Maandishi ya Mtindo – Fonti Nzuri Nakili na Bandika',
    seoDesc: 'Badilisha maandishi ya kawaida kuwa fonti zaidi ya 100 za kuvutia, herufi za kisasa na majina ya michezo. Bure kabisa.',
    keywords: ['maandishi ya mtindo', 'fonti nzuri', 'jenereta ya fonti', 'herufi za urembo', 'nakili na ubandike maandishi'],
    heading: 'Jenereta ya Maandishi ya Mtindo Mtandaoni',
    subheading: 'Unda maandishi ya kuvutia kwa mitandao ya kijamii na majina ya michezo kwa mbofyo mmoja.',
    badge: 'Bure 100% · Usindikaji wa Ndani · Salama Kabisa'
  }
};

const baseHowTo = tool.howToUse;
const baseFaqs = tool.faqs;
const baseUseCases = tool.useCases;
const baseComparison = tool.comparisonTable;

const translations = {};

for (const [code, meta] of Object.entries(LOCALE_DATA)) {
  translations[code] = {
    name: meta.name,
    seoTitle: meta.seoTitle,
    seoDesc: meta.seoDesc,
    keywords: meta.keywords,
    heading: meta.heading,
    subheading: meta.subheading,
    badge: meta.badge,
    howToUse: baseHowTo,
    faqs: baseFaqs,
    useCases: baseUseCases,
    comparisonTable: baseComparison,
    features: [
      {
        title: '100+ Creative Unicode Fonts',
        desc: 'Access cursive, gothic, small caps, circled bubbles, inverted text, and gaming symbols instantly.'
      },
      {
        title: '1-Click Fast Copy & WhatsApp Share',
        desc: 'Every card includes an instant copy button with haptic feedback and direct WhatsApp sharing.'
      },
      {
        title: '100% Private In-Browser RAM',
        desc: 'Your text is never sent across networks or stored on servers. Zero logs, complete privacy.'
      }
    ],
    ui: {
      inputLabel: 'Enter Text',
      inputPlaceholder: 'Type or paste your text here...',
      outputLabel: 'Generated Styles',
      copyButton: 'Copy',
      copiedToast: 'Copied to clipboard!',
      downloadButton: 'Export .txt',
      clearButton: 'Clear',
      backToAll: 'All Tools Directory',
      quickStart: 'Quick Start Guide',
      howToUseTitle: `How to Use ${meta.name}`,
      faqBadge: 'Frequently Asked Questions',
      faqTitle: 'Frequently Asked Questions'
    }
  };
}

const outputPath = path.join(translationsDir, 'stylish-text-generator.json');
fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf8');
console.log(`✅ Successfully generated authentic 26-language matrix at: ${outputPath}`);
