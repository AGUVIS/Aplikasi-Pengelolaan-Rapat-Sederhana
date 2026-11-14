# Aset yang perlu diekspor dari Figma

File: https://www.figma.com/design/eTE754rX7SAfuGka2eBa1b/Untitled

Pilih layer-nya di Figma, buka panel Export, lalu simpan dengan nama persis seperti di bawah.
Sebelum aset dipasang, halaman tetap berfungsi penuh; hanya gambar/ikonnya yang kosong.

## Halaman login (frame 1:1286) -> `assets/`

| File                | Layer di Figma                                         | Format |
|---------------------|--------------------------------------------------------|--------|
| `ilustrasi.png`     | Rectangle di panel kiri (ilustrasi kalender + 2 orang)  | PNG    |
| `logo.svg`          | Logo putih di pojok kiri atas panel                    | SVG    |
| `eye.svg`           | `akar-icons:eye`                                       | SVG    |

## Dashboard (frame 1:1380) -> `assets/dashboard/`

| File                | Layer di Figma                         |
|---------------------|----------------------------------------|
| `logo.svg`          | `Logo` (versi berwarna di sidebar)     |
| `house.svg`         | `house` (breadcrumb)                   |
| `search.svg`        | `bitcoin-icons:search-filled`          |
| `bell.svg`          | `bxs:bell`                             |
| `arrow-down.svg`    | `dashicons:arrow-down-alt2`            |
| `plus.svg`          | `akar-icons:plus`                      |
| `nav-dashboard.svg` | `ic:baseline-space-dashboard`          |
| `nav-calendar.svg`  | `bi:calendar2-check-fill`              |
| `nav-mail.svg`      | `famicons:mail-sharp`                  |
| `nav-people.svg`    | `bi:people-fill`                       |
| `nav-settings.svg`  | `ant-design:setting-filled`            |
| `clock-white.svg`   | `ri:time-line` (di kartu rapat)        |
| `location.svg`      | `akar-icons:location`                  |
| `ellipsis.svg`      | `ellipsis` (kartu Tindak lanjut)       |
| `clock-amber.svg`   | `clock-3` (deadline "Hari ini")        |
| `clock-gray.svg`    | `clock-4` (deadline lewat)             |

## Akun demo

- Email: `ridho@rapatku.id`
- Password: `rapatku123`

Ubah/tambah akun di array `USERS` pada `auth.js`.
