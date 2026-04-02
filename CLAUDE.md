# ROOF UNICORNS — Dokumentacja projektu

## Co to jest

Humorystyczna strona o fikcyjnej grupie kotów (dachowców), które wierzą że są jednorożcami. Parodia świata startupów — pitch decki finansowane sardynkami, LinkedIn bio kotów-founderów, historie "przebudzenia jednorożca".

Cel: viralowy projekt "for fun", dwujęzyczny PL/EN.

## Stack

| Technologia | Wersja | Rola |
|-------------|--------|------|
| Astro | 4.16 | Static site generator |
| Tailwind CSS | 3.4 | Styling (tokeny ze Stitch) |
| TypeScript | relaxed | Typy w i18n |

Fonty: **Epilogue** (nagłówki), **Manrope** (body/labels) — ładowane z Google Fonts.

## Struktura plików

```
roof-unicorns/
├── CLAUDE.md              ← ten plik
├── intake.md              ← oryginalny opis projektu od użytkownika
├── brief.md               ← uporządkowany brief
├── manifest.json          ← stan realizacji + ID Stitch
├── assets/                ← oryginalne zdjęcia kotów (8 plików)
├── stitch/
│   └── dispatch-1/        ← design ze Stitch (HTML + screenshot)
│       ├── screen-1-full-page.html   ← GŁÓWNY design
│       ├── screen-2-full-page.html
│       ├── screen-3-hero.html
│       └── screenshot-full-page.png
└── src/                   ← PROJEKT ASTRO (tu pracujesz)
    ├── astro.config.mjs   ← konfiguracja Astro + i18n
    ├── package.json
    ├── tailwind.config.mjs ← tokeny kolorów ze Stitch (47 kolorów)
    ├── public/images/      ← zdjęcia kotów (kopie z assets/)
    └── src/
        ├── i18n/
        │   ├── pl.json     ← tłumaczenia PL
        │   ├── en.json     ← tłumaczenia EN
        │   └── utils.ts    ← getTranslations(), getUnicornOfDay()
        ├── layouts/
        │   └── Layout.astro ← wrapper HTML, head, Google Fonts
        ├── pages/
        │   ├── index.astro  ← strona PL (/)
        │   └── en/
        │       └── index.astro ← strona EN (/en/)
        └── components/
            ├── Navbar.astro         ← sticky nav + hamburger + PL/EN switch
            ├── Hero.astro           ← grayscale hero, tagline, scroll arrow
            ├── Gallery.astro        ← 4 karty kotów, hover: szary→kolor
            ├── UnicornOfDay.astro   ← spotlight kota dnia (rotacja dzienna)
            ├── CatsTrapStory.astro  ← 3 karty founderów-kotów
            ├── RooftopStories.astro ← 2 historie naprzemiennie tekst/obraz
            └── Footer.astro         ← tęczowy gradient footer
```

## Jak to działa

### i18n (dwujęzyczność)
- Astro routing: PL pod `/`, EN pod `/en/`
- Tłumaczenia w `src/i18n/pl.json` i `en.json`
- Każdy komponent przyjmuje prop `locale` i pobiera tekst przez `getTranslations(locale)`
- Przełącznik PL/EN w navbarze linkuje do drugiej wersji

### Jednorożec Dnia (rotacja)
- `getUnicornOfDay(locale)` w `utils.ts`
- Algorytm: `Math.floor(Date.now() / 86400000) % unicorns.length`
- 5 kotów w rotacji, zmienia się codziennie o północy UTC
- Dane kotów w plikach i18n JSON

### Design (Stitch)
- CAŁY design graficzny pochodzi ze Stitch MCP (kolory, fonty, layout, obrazki)
- Nie zmieniaj kolorów/fontów samodzielnie — edytuj design system na Stitch i pobierz ponownie
- Stitch project ID: `4840024419549792121`
- Design system ID: `914157017831493204`
- Główne kolory: primary `#ba9eff`, secondary `#ec63ff`, tertiary `#ffd16f`, surface `#0e0e0e`

### Obrazki
- Stitch wygenerował AI-obrazki kotów (URL-e `lh3.googleusercontent.com`)
- Użytkownik dostarczył 8 zdjęć w `assets/` → skopiowane do `public/images/`
- Komponenty używają głównie URL-i ze Stitch (zewnętrzne)

## Komendy

```bash
cd projects/roof-unicorns/src

npm run dev        # dev server → http://localhost:4321
npm run build      # build statyczny → dist/
npm run preview    # podgląd buildu
```

## Sekcje strony (od góry)

| # | Sekcja | Komponent | Opis |
|---|--------|-----------|------|
| 1 | Hero | Hero.astro | Pełny ekran, grayscale, tagline |
| 2 | Gallery | Gallery.astro | 4 karty kotów, hover: kolor |
| 3 | Unicorn of the Day | UnicornOfDay.astro | Spotlight + cytat, rotacja dzienna |
| 4 | Cats-trap Story | CatsTrapStory.astro | 3 founderów, parodia startupów |
| 5 | Rooftop Stories | RooftopStories.astro | 2 historie "przebudzenia" |
| 6 | Footer | Footer.astro | Tęczowy gradient, "100% UNICORN" |

## Wizualna progresja "Gray to Glory"
Strona przechodzi od szarości (hero) do pełnego koloru (footer):
- Hero: `grayscale(100%)`, surface dark
- Gallery: kolory zaczynają się pojawiać (hover ujawnia)
- UnicornOfDay: purple glow, animowany border
- CatsTrap: pełne kolory (tertiary/secondary/primary accenty)
- Rooftop: kolorowe obrazy, pink/purple tekst
- Footer: rainbow gradient (gold→pink→purple)

## Zasady edycji

1. **Grafika = Stitch.** Kolory, fonty, spacing — nie zmieniaj ręcznie. Zmiany wizualne → nowy dispatch do Stitch.
2. **Treści = JSON.** Teksty edytuj w `pl.json` / `en.json`, nie w komponentach.
3. **Nowy kot** → dodaj obiekt do tablicy `unicorns` w obu plikach JSON + obrazek.
4. **Build po zmianach** → `npm run build` musi przejść przed deployem.
