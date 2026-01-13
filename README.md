# DumbPhone MVP — Drag reorder + i18n (EN/JA)

Features:
- Black minimal launcher card UI
- Add New Shortcut modal (popular apps list + search)
- Tap shortcut (normal mode) opens app via URL scheme
- Edit mode: remove + **long-press ≡ (RIGHT) and drag to reorder**
- Localized UI (EN/JA):
  - If device language is Japanese -> default Japanese
  - Otherwise -> English

## IMPORTANT (Dev build required)
Drag reorder uses Reanimated + Worklets, so **Expo Go is not supported**.

## Install
```bash
npm install
# recommended to align native versions with Expo SDK:
npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler expo-localization
```

## Build & Run (iOS)
```bash
rm -rf ios android
npx expo prebuild -p ios --clean
npx expo run:ios
```

If you ever see a Worklets version mismatch, delete the app from the simulator/device and rebuild.
