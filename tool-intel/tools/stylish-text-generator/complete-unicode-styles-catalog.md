# Complete Unicode Styles & Nickname Decorators Catalog

> **Target Tool:** `stylish-text-generator`  
> **Source:** Full-Page SERP & Competitor Catalog Teardown (Screen Analysis)  
> **Status:** Fully Mapped & Documented for Direct Component Implementation  

---

## 1. Mathematical Alphanumeric Unicode Transformation Maps

Each style below converts standard ASCII `[a-z, A-Z, 0-9]` directly to native Unicode code-points without downloading font files:

| # | Style Name | Category | Sample Output (`Hello`) | Unicode Code Range / Transformation Logic |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Mathematical Bold** | Bold / Clean | `𝗛𝗲𝗹𝗹𝗼` | `U+1D5D4` - `U+1D607` (Sans-Serif Bold) |
| 2 | **Serif Bold** | Bold / Classic | `𝐇𝐞𝐥𝐥𝐨` | `U+1D400` - `U+1D433` (Mathematical Bold) |
| 3 | **Sans-Serif Normal** | Clean / Modern | `𝖧𝖾𝗅𝗅𝗈` | `U+1D5A0` - `U+1D5D3` (Sans-Serif) |
| 4 | **Mathematical Italic** | Italic | `𝐻𝑒𝓁𝓁𝑜` / `𝘏𝘦𝘭𝘭𝘰` | `U+1D434` - `U+1D467` / `U+1D622` - `U+1D655` |
| 5 | **Bold Italic** | Bold / Italic | `𝙃𝙚𝙡𝙡𝙤` | `U+1D63C` - `U+1D66F` (Sans-Serif Bold Italic) |
| 6 | **Serif Bold Italic** | Classic / Italic | `𝑯𝒆𝒍𝒍𝒐` | `U+1D468` - `U+1D49B` |
| 7 | **Script / Cursive** | Cursive | `𝐻𝑒𝓁𝓁𝑜` / `𝒳𝓍` | Mathematical Script (`U+1D49C` - `U+1D4CF` with standard exceptions `B, E, F, H, I, L, M, R, e, g, o`) |
| 8 | **Bold Script / Calligraphy** | Cursive | `𝓗𝓮𝓵𝓵𝓸` | `U+1D4D0` - `U+1D503` (Mathematical Bold Script) |
| 9 | **Fraktur / Gothic** | Gothic | `ℌ𝔢𝔩𝔩𝔬` | Mathematical Fraktur (`U+1D504` - `U+1D537` with standard exceptions `C, H, I, R, Z`) |
| 10 | **Bold Fraktur / Dark Gothic** | Gothic | `𝕳𝖊𝖑𝖑𝖔` | `U+1D56C` - `U+1D59F` (Mathematical Bold Fraktur) |
| 11 | **Double-Struck / Blackboard** | Modern / Cool | `ℍ𝕖𝕝𝕝𝕠` | `U+1D538` - `U+1D56B` (Blackboard Bold with standard exceptions `C, H, N, P, Q, R, Z`) |
| 12 | **Small Capitals** | Minimalist | `ʜᴇʟʟᴏ` | IPA Small Capital glyphs (`ᴀ ʙ ᴄ ᴅ ᴇ ғ ɢ ʜ ɪ ᴊ ᴋ ʟ ᴍ ɴ ᴏ ᴘ ǫ ʀ s ᴛ ᴜ ᴠ ᴡ x ʏ ᴢ`) |
| 13 | **Circled / Bubble** | Cute / Bubble | `Ⓗⓔⓛⓛⓞ` | Enclosed Alphanumerics (`U+24B6` - `U+24E9`, `U+2460` - `U+2468`) |
| 14 | **Negative Circled / Black Bubble** | Modern / Bold | `🅗🅔🅛🅛🅞` | Enclosed Alphanumeric Supplement (`U+1F150` - `U+1F169`) |
| 15 | **Squared / Boxed** | Modern / Tech | `🄷🄴🄻🄻🄾` | Enclosed Alphanumerics Squared (`U+1F130` - `U+1F149`) |
| 16 | **Negative Squared / Black Boxed** | Gamer / Dark | `🅷🅴🅻🅻🅾` | Enclosed Ideographic / Squared Negative (`U+1F170` - `U+1F189`) |
| 17 | **Inverted / Upside Down** | Viral / Fun | `oןןǝH` | Reversed Character Translation Table (`a->ɐ, b->q, c->ɔ, d->p, e->ǝ, ...`) |
| 18 | **Mirrored / Reverse** | Fun / Viral | `oʃʃɘH` | Character Mirror Table (`a->ɒ, b->d, c->ɔ, d->b, e->ɘ, ...`) |
| 19 | **Vaporwave / Fullwidth** | Aesthetic | `Ｈｅｌｌｏ` | Halfwidth and Fullwidth Forms (`U+FF01` - `U+FF5E`, `offset = 0xFEE0`) |
| 20 | **Monospace / Code** | Tech / Clean | `𝙷𝚎𝚕𝚕𝚘` | `U+1D670` - `U+1D6A3` (Mathematical Monospace) |
| 21 | **Tiny / Superscript** | Cute / Bio | `ᴴᵉˡˡᵒ` | Unicode Superscript Glyphs (`ᵃ ᵇ ᶜ ᵈ ᵉ ᶠ ᵍ ʰ ⁱ ʲ ᵏ ˡ ᵐ ⁿ ᵒ ᵖ ʳ ˢ ᵗ ᵘ ᵛ ʷ ˣ ʸ ᶻ`) |
| 22 | **Subscript** | Scientific | `ₕₑₗₗₒ` | Unicode Subscript Glyphs (`ₐ ᵦ 𝒸 𝒹 ₑ 𝒻 𝓰 ₕ ᵢ ⱼ ₖ ₗ ₘ ₙ ₒ ₚ ᵣ ₛ ₜ ᵤ ᵥ 𝓌 ₓ ᵧ 𝓏`) |
| 23 | **Strikethrough / Slashed** | Social / Chat | `H̶e̶l̶l̶o̶` | Combining Long Stroke Overlay `U+0336` |
| 24 | **Tilde Strikethrough** | Aesthetic | `H̴e̴l̴l̴o̴` | Combining Tilde Overlay `U+0334` |
| 25 | **Underlined (Single)** | Formatting | `H̲e̲l̲l̲o̲` | Combining Low Line `U+0332` |
| 26 | **Double Underlined** | Formatting | `H̳e̳l̳l̳o̳` | Combining Double Low Line `U+0333` |
| 27 | **Overline / Top Dotted** | Aesthetic | `H̅e̅l̅l̅o̅` | Combining Overline `U+0305` |
| 28 | **Cross / Slashed** | Tech / Hacker | `H̷e̷l̷l̷o̷` | Combining Long Solidus Overlay `U+0338` |
| 29 | **Dotted Above** | Cute | `Ḣėl̇l̇ȯ` | Combining Dot Above `U+0307` |
| 30 | **Parenthesized** | Classic | `⒣⒠⒧⒧⒪` | Enclosed Alphanumerics Parenthesized (`U+249C` - `U+24B5`) |
| 31 | **Zalgo / Glitched Text** | Glitch / Gaming | `H̶̨̓e̷͇̾l̴̤̐l̵͓͝o̷͙̔` | Stacked Combining Diacritical Marks (Randomized generator with intensity slider) |
| 32 | **Spaced / Wide** | Aesthetic | `H e l l o` | Extra Half-Space (`U+2009`) or Full Space insertion |
| 33 | **Braille Dots** | Fun / Geek | `⠓⠑⠇⠇⠕` | Braille Patterns (`U+2800` - `U+28FF`) |
| 34 | **Morse Code** | Geek / Secret | `.... . .-.. .-.. ---` | Morse mapping (`.-`, `-...`, `-.-.`, etc.) |
| 35 | **Leet Speak (1337)** | Gamer | `H3ll0` | Letter to numeric substitution (`A->4, E->3, I->1, O->0, T->7, S->5`) |

---

## 2. Gamer Nickname Wings & Brackets Library (Free Fire, BGMI, PUBG)

These are the most viral copy-paste decorators used across mobile gaming:

### A. Free Fire / Battle Royale Elite Brackets
- `꧁༺ Hello ༻꧂`
- `★彡 Hello 彡★`
- `彡[ Hello ]彡`
- `⚔️ Hello ⚔️`
- `⚡ Hello ⚡`
- `亗 Hello 亗`
- `☠️ Hello ☠️`
- `† Hello †`
- `『 Hello 』`
- `【 Hello 】`
- `〖 Hello 〗`
- `〔 Hello 〕`
- `〘 Hello 〙`

### B. Aesthetic, Hearts & Cute Surrounds (Instagram / TikTok)
- `♡ Hello ♡`
- `♥ Hello ♥`
- `✿ Hello ✿`
- `❀ Hello ❀`
- `✧･ﾟ: *✧ Hello ✧*:･ﾟ✧`
- `*:･ﾟ✧ Hello ✧･ﾟ:*`
- `｡･:*:･ﾟ★ Hello ★｡･:*:･ﾟ`
- `✨ Hello ✨`
- `🍓 Hello 🍓`
- `(⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠❤ Hello ❤(⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)`

### C. Royalty & Crown Badges
- `👑 Hello 👑`
- `♛ Hello ♛`
- `♚ Hello ♚`
- `✦ Hello ✦`
- `✪ Hello ✪`

### D. Arrows, Musical & Weapons
- `➸ Hello ➸`
- `➳ Hello ➳`
- `♪ Hello ♪`
- `♫ Hello ♫`
- `▄︻̷̿┻̿═━一 Hello`
- `⌐╦╦═─ Hello`

---

## 3. Tool Architecture Implementation Strategy

To deliver zero lag and instantaneous rendering across all 50+ styles:
1. **Pure Pre-computed Character Lookup Maps:**
   - No regex string-replace chains in tight loops.
   - A single lookup table for `a-z`, `A-Z`, and `0-9` maps characters in $O(1)$ constant time.
2. **Instant Live Typing:**
   - Every keystroke immediately updates all 50+ card components.
   - State managed in local React state with zero external API calls (100% in-browser RAM).
3. **Filter Tabs:**
   - `All Fonts` (50+ styles)
   - `🔥 Popular` (Bold, Script, Gothic, Small Caps, Double Struck)
   - `🎮 Gaming & FF` (Wings, Brackets, Bold Gothic, Glitch)
   - `✍️ Cursive & Handwriting` (Mathematical Script, Bold Script, Italic)
   - `🖤 Gothic & Fraktur` (Fraktur, Bold Fraktur, Medieval)
   - `💖 Cute & Aesthetic` (Bubble, Hearts, Flowers, Vaporwave, Tiny)
   - `🔲 Glitch & Weird` (Zalgo, Inverted, Mirrored, Strikethrough)
4. **1-Click Copy with Haptic Toast:**
   - Every font card has its own Copy button.
   - Clicking it triggers `navigator.clipboard.writeText()` with a floating toast notification and visual green checkmark.
