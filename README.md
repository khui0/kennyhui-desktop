<img src="https://github.com/user-attachments/assets/0d6a5000-5509-4cd6-927e-e0a4bf23edf2" height=128>

# Kenny Hui's Desktop

![GitHub package.json version](https://img.shields.io/github/package-json/v/khui0/kennyhui-desktop?color=%23600cae&)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/khui0/kennyhui-desktop?color=%23600cae&)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fdesktop.kennyhui.dev%2F&color=%23600cae)

### Try it here: [desktop.kennyhui.dev](https://desktop.kennyhui.dev/)

## Development

Install dependencies and run dev server

```bash
npm i
npm run dev
```

### Icons

Place square icons in `src/icons/source` and run

```bash
npm run build:icons
```

Generated icons will be placed in `src/lib/assets/icons`. Icons are automatically generated on `npm i`.

## Building

Project will be built to `/dist`

```bash
npm run build
```
