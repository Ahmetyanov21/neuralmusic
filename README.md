# NeuralMusic — Focus Studio

Генеративный эмбиент-плеер с Pomodoro-таймером для концентрации.
Звук синтезируется в реальном времени через Web Audio, без аудиофайлов.
Одна кодовая база работает в браузере (PWA), как десктоп-приложение (Electron)
и как Android-приложение (Capacitor).

<!-- Скриншоты: положите изображения в docs/ и раскомментируйте
![Главный экран](docs/screenshot-main.png)
![Режим фокуса](docs/screenshot-zen.png)
-->

## Возможности

- **Генеративный звук.** Пять независимых слоёв с микшером:
  - Drone — пилообразный осциллятор с вибрато и фильтром;
  - Haze — полосовой розовый шум с медленной панорамой;
  - Pulse — мягкий «удар сердца» со случайным темпом;
  - Noise — розовый шум с плавающим фильтром;
  - Music — общая громкость.
- **Пресеты атмосферы:** Deep Focus, Rain, Storm, Minimal.
- **Таймер и секундомер.** Режимы Pomodoro 25/5, Extended 50/10, Deep 90/20
  и свои интервалы, переключение Work ↔ Relax, звуковые сигналы в конце интервала.
- **Zen-режим.** Во время сессии интерфейс скрывается и остаётся только кольцо таймера.
- **Статистика за день и история сессий** с экспортом в JSON. Данные хранятся
  локально (`localStorage`).
- **Точный таймер в фоне.** Время считается от отметок `Date.now()`, а не по числу
  тиков, поэтому оно не «плывёт», когда вкладка или приложение свёрнуты.
- **Фоновое воспроизведение на Android.** Нативный плагин Capacitor запускает
  foreground-сервис, чтобы звук не прерывался при выключенном экране.
- Wake Lock API, чтобы экран не гас во время сессии; PWA с офлайн-кэшем
  через Service Worker; управление пробелом.

## Стек

| Часть | Технологии |
|---|---|
| Приложение | HTML, CSS, JavaScript (без фреймворков), [Tone.js](https://tonejs.github.io/) / Web Audio API |
| Веб | PWA: manifest и Service Worker |
| Десктоп | Electron и electron-builder (установщик NSIS для Windows) |
| Android | Capacitor 8, нативный плагин на Java (foreground-сервис `mediaPlayback`) |

## Структура

```
web/            само приложение (index.html, service worker, manifest, vendor/tone.js)
main.js         точка входа Electron
preload.js      пустой preload (рендерер изолирован от Node.js)
mobile/         обёртка Capacitor и Android-проект
  android/app/src/main/java/.../BackgroundAudioPlugin.java   JS ↔ нативный мост
  android/app/src/main/java/.../BackgroundAudioService.java  foreground-сервис
```

## Запуск

**В браузере.** Запустите любой статический сервер из папки `web/`:

```bash
npx serve web
```

**Десктоп (Electron):**

```bash
npm install
npm start          # запуск
npm run dist       # сборка установщика в dist/
```

**Android:**

```bash
cd mobile
npm install
npx cap sync android
npx cap open android   # открыть в Android Studio и собрать
```

Для release-сборки создайте `mobile/android/keystore.properties`
(`storeFile`, `storePassword`, `keyAlias`, `keyPassword`). Этот файл не хранится
в репозитории.

## English

**NeuralMusic** is a generative ambient player with a Pomodoro timer. Sound is
synthesized live with Tone.js / Web Audio: five mixable layers (drone, haze,
pulse, noise) and atmosphere presets. It also has a timer and stopwatch with a
zen mode and daily stats. One vanilla-JS codebase ships as a PWA, an Electron
desktop app and a Capacitor Android app with a native foreground service for
background playback.

## Автор

Ilnur Akhmetyanov ([@Ahmetyanov21](https://github.com/Ahmetyanov21))

Используется [Tone.js](https://github.com/Tonejs/Tone.js) (MIT License).
