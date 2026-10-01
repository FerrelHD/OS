---
name: macOS Golden Gate Design System
description: Ultra-realistic Apple Human Interface Guidelines (HIG) specification for macOS Golden Gate Desktop Simulator featuring Liquid Glass aesthetics, dynamic window management, and native application styling.
colors:
  primary: "#007AFF"
  on-primary: "#FFFFFF"
  secondary: "#F59E0B"
  on-secondary: "#FFFFFF"
  background-deep: "#154868"
  background-mid: "#3B92C5"
  background-light: "#74C0DC"
  surface-solid: "#FFFFFF"
  surface-glass: "rgba(255, 255, 255, 0.65)"
  surface-glass-dark: "rgba(30, 30, 30, 0.70)"
  surface-acrylic: "rgba(20, 24, 33, 0.85)"
  text-primary: "#0F172A"
  text-secondary: "#64748B"
  text-dark-primary: "#F8FAFC"
  text-dark-secondary: "#94A3B8"
  border-glass: "rgba(255, 255, 255, 0.40)"
  border-glass-dark: "rgba(255, 255, 255, 0.12)"
  border-hairline: "rgba(255, 255, 255, 0.25)"
  traffic-close: "#FF5F56"
  traffic-close-border: "#E0443E"
  traffic-minimize: "#FFBD2E"
  traffic-minimize-border: "#DEA123"
  traffic-maximize: "#27C93F"
  traffic-maximize-border: "#1AAB29"
  accent-blue: "#007AFF"
  accent-purple: "#AF52DE"
  accent-pink: "#FF2D55"
  accent-red: "#FF3B30"
  accent-orange: "#FF9500"
  accent-yellow: "#FFCC00"
  accent-green: "#34C759"
  accent-graphite: "#8E8E93"
  app-music: "#FA2D48"
  app-terminal-bg: "rgba(15, 23, 42, 0.90)"
typography:
  display-kpi:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title-window:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
  body-ui:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
  code-terminal:
    fontFamily: "'SF Mono', Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.6
  caption-meta:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  window: "16px"
  widget: "20px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  dock-h: "58px"
  menubar-h: "28px"
components:
  menubar:
    height: "{spacing.menubar-h}"
    backgroundColor: "{colors.surface-glass}"
    backdropBlur: "20px"
    borderBottom: "1px solid {colors.border-hairline}"
    textColor: "{colors.text-primary}"
  dock:
    height: "{spacing.dock-h}"
    backgroundColor: "{colors.surface-glass}"
    backdropBlur: "40px"
    rounded: "{rounded.full}"
    border: "1px solid {colors.border-glass}"
    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.25)"
  window-frame:
    rounded: "{rounded.window}"
    backgroundColor: "{colors.surface-solid}"
    border: "1px solid {colors.border-glass}"
    boxShadow: "0 24px 48px -12px rgba(15, 34, 58, 0.25)"
  window-sidebar:
    backgroundColor: "{colors.surface-glass}"
    backdropBlur: "20px"
    borderRight: "1px solid rgba(0, 0, 0, 0.06)"
  sidebar-item-active:
    backgroundColor: "rgba(0, 122, 255, 0.12)"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
  widget-card:
    rounded: "{rounded.widget}"
    backgroundColor: "{colors.surface-glass}"
    backdropBlur: "20px"
    border: "1px solid {colors.border-glass}"
    padding: "{spacing.lg}"
  spotlight-modal:
    width: "600px"
    rounded: "{rounded.window}"
    backgroundColor: "{colors.surface-glass}"
    backdropBlur: "40px"
    border: "1px solid {colors.border-glass}"
    boxShadow: "0 32px 64px -16px rgba(0, 0, 0, 0.35)"
  control-center-popover:
    width: "320px"
    rounded: "{rounded.window}"
    backgroundColor: "{colors.surface-glass}"
    backdropBlur: "40px"
    border: "1px solid {colors.border-glass}"
    boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.25)"
  gemini-container:
    rounded: "{rounded.window}"
    backgroundColor: "{colors.surface-solid}"
    textColor: "{colors.text-primary}"
  terminal-container:
    rounded: "{rounded.window}"
    backgroundColor: "{colors.app-terminal-bg}"
    textColor: "{colors.text-dark-primary}"
    backdropBlur: "20px"
---

## Overview
macOS Golden Gate Design System dirancang untuk menghadirkan pengalaman antarmuka desktop native modern Apple langsung di dalam browser web. Sistem ini menggabungkan prinsip material Liquid Glass dan Aqua modern dengan performa tinggi berbasis web primitives. Fondasi visual berpusat pada hierarki material bertingkat (*multi-layer elevation*), pembiasan cahaya frosted glass via `backdrop-filter`, keterbacaan teks maksimal yang memenuhi standar aksesibilitas WCAG, serta responsivitas kontrol window 60 FPS.

## Colors & Surface Architecture
1. **Glassmorphic System Chrome**:
   - Bagian penampang sistem navigasi utama (Menubar, Dock, Quick Widgets, Sidebar, Spotlight, dan Control Center) menggunakan material frosted glass dengan tingkat transmisi cahaya dinamis 65%–70%.
   - Menubar dan Sidebar jendela menerapkan blur sedang (`backdrop-blur-xl` / 20px).
   - Dock, Spotlight modal, dan Launchpad menerapkan blur pekat (`backdrop-blur-2xl` / 40px) untuk memastikan teks dan ikon tetap kontras terhadap background desktop dinamis.
2. **Solid Canvas for Readability**:
   - Panel konten utama aplikasi produktivitas (Finder file grid, editor dokumen Notes, tab browser Safari, dan chat thread Gemini) menggunakan kanvas `#FFFFFF` padat (atau `#1E1E1E` pada dark mode) untuk membebaskan mata pengguna dari distraksi tekstur wallpaper di belakangnya.
   - Jendela Terminal zsh mengadopsi palet retro-modern gelap berbasis `rgba(15, 23, 42, 0.90)` dengan teks kontras tinggi `#F8FAFC`.
3. **Specular Rim Borders**:
   - Seluruh tepi jendela melayang, popover Control Center, dan pill Dock dibingkai oleh hairline border putih semi-transparan `1px solid rgba(255, 255, 255, 0.40)` (mode terang) atau `1px solid rgba(255, 255, 255, 0.12)` (mode gelap) untuk meniru pantulan cahaya fisik pada kaca arsitektural.
4. **Soft Black and Neutrals**:
   - Sesuai prinsip *soft black/white*, teks utama tidak menggunakan `#000000` murni, melainkan slate gelap `#0F172A` (~14:1 contrast ratio) guna mencegah vibrasi optik pada monitor Retina.
   - Teks sekunder mengandalkan slate blue-gray `#64748B` yang terbukti lolos uji WCAG AA (rasio kontras > 5:1).

## Typography Hierarchy
- **System Display**: Digunakan untuk lock screen clock, angka widget temperatur/tanggal, dan header kalkulator (`SF Pro Display`, tracking `-0.03em`, weight 700).
- **Window Titlebars & Section Headers**: Menggunakan font ukuran 13px weight 600 untuk menjaga kepadatan informasi khas sistem operasi desktop.
- **Body & Controls**: Menggunakan font ukuran 13px weight 400–500 dengan line-height proporsional 1.5.
- **Developer Tools**: Digunakan secara ketat pada Terminal zsh dan blok sintaks kode markdown Gemini Desktop (`SF Mono`, Menlo, monospace, line-height 1.6).
- **Tabular Numerals**: Diwajibkan pada jam Menubar, widget detik, dan angka kalkulator untuk mencegah pergeseran layout horizontal (*layout jitter*).

## Spacing & Proximity System
- **Grid Skala Base 4px / 8px**: Semua jarak padding, margin, dan gap antar-elemen dihitung dari kelipatan token 4, 8, 12, 16, 24, 32.
- **Formula Nested Radius**:
  Radius kontainer terluar dan elemen di dalamnya harus selalu konsentris dengan rumus:
  `r_inner = max(0, r_outer - padding)`.
  Contoh: Window Finder dengan radius 16px dan padding interior 8px membungkus active highlight bar beradius 8px.
- **Proximity Asimetris pada Header**: Jarak ruang di atas judul jendela dan kategori sidebar selalu dirancang lebih besar daripada jarak ruang ke konten di bawahnya untuk menegaskan relasi pengelompokan Gestalt.

## Elevation & Depth Levels
1. **Level 0 (Base Canvas)**: Wallpaper desktop fluid ribbons dinamis (Gold, Blue, Purple, Green, Night).
2. **Level 1 (Desktop Surface)**: Desktop icons vertikal dan quick widgets (Weather, Calendar) dengan radius 20px.
3. **Level 2 (Inactive Windows)**: Jendela background yang tidak aktif (`box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.15)`).
4. **Level 3 (Active Focused Window)**: Jendela terdepan dengan z-index tertinggi (`box-shadow: 0 24px 48px -12px rgba(15, 34, 58, 0.25)`).
5. **Level 4 (System Shell Chrome)**: Top Menubar fixed (`h-28px`) dan centered floating Dock (`h-58px`).
6. **Level 5 (Modals & System Overlays)**: Spotlight Search bar modal, popover Control Center, dropdown contextual menu, dan Launchpad grid.
7. **Level 6 (Lock Screen)**: Layar proteksi penuh yang mem-block seluruh interaksi desktop sebelum otentikasi.

## Components Specification
- **Traffic Lights**:
  - Diameter 12px dengan jarak gap 8px.
  - Posisi: Merah `#FF5F56` (Close), Kuning `#FFBD2E` (Minimize), Hijau `#27C93F` (Maximize/Restore).
  - Pada state hover grup, simbol micro glyph (×, −, +) muncul serentak di tengah bulatan.
- **Dock Engine**:
  - Kontainer pill radius 9999px dengan height 58px dan gap horizontal 8px antar-icon.
  - Magnification berbasis kurva Gaussian yang membesar mulus hingga 1.35× saat kursor mendekat.
  - Running indicator dot berdiameter 4px ditempatkan di bawah ikon aplikasi yang aktif di latar belakang.
- **Window Management System (WMS)**:
  - Header titlebar draggable dengan batas pembatas viewport (*clamping boundaries*).
  - Handle resize 8-penjuru tak terlihat (N, S, E, W, NE, NW, SE, SW) dengan batas minimal jendela 320×220px.
  - Ghost-box visual snapping ketika jendela digeser ke tepi viewport kiri, kanan, atau atas.
- **Gemini Desktop Application**:
  - Sidebar riwayat obrolan dengan tombol *New Chat*.
  - Pemilih model AI (Gemini 2.5 Flash, Gemini 2.5 Pro, Gemini Ultra) berupa segmented pill selector.
  - Blok kode Markdown terformat rapi dengan tombol aksi *Copy Code* instan dan font `SF Mono`.
- **Spotlight Search Modal**:
  - Terletak presisi di tengah layar (lebar 600px).
  - Menggabungkan kolom input real-time, kalkulator parser instan, dan daftar navigasi keyboard.

## Rules to Never Break
- Dilarang menggunakan warna solid flat tanpa filter blur kaca untuk elemen sistem Menubar, Dock, dan Popover Control Center.
- Dilarang menggunakan warna hitam pekat `#000000` untuk teks antarmuka guna menjaga kenyamanan membaca.
- Urutan traffic lights tidak boleh ditukar: Merah (kiri), Kuning (tengah), Hijau (kanan).
- Seluruh interaksi dragging, hovering dock, dan resizing window harus mempertahankan performa animasi stabil pada 60 FPS menggunakan CSS hardware transforms (`transform: translate3d`) tanpa menyebabkan layout thrashing.
- Nilai token dan status sistem (tema, preferensi Dock, virtual filesystem, catatan, dan riwayat chat) wajib terikat secara konsisten dengan penyimpanan persisten `localStorage`.
