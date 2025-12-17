# RIP Frontend

React + Vite + TypeScript фронтенд для системы расчёта CAVI.

## Быстрый старт

```bash
npm install
npm run dev
```

## Настройка HTTPS для PWA (по методичке)

PWA требует HTTPS для работы Service Worker. Для локальной разработки нужно создать сертификаты.

### Шаг 1: Установить mkcert

```bash
npm install -g mkcert
```

### Шаг 2: Создать Authority и сертификат

```bash
cd rip_frontend
mkcert create-ca
mkcert create-cert
```

Создадутся файлы:
- `ca.crt`, `ca.key` — Authority (корневой сертификат)
- `cert.crt`, `cert.key` — сертификат для сервера

**Важно:** Не выкладывайте `.key` файлы в git!

### Шаг 3: Добавить в .gitignore

```
*.key
ca.crt
cert.crt
```

### Шаг 4: Запустить dev сервер

```bash
npm run dev
```

Сервер запустится на https://localhost:3000 и будет доступен по IP в локальной сети.

### Шаг 5: Проверить на телефоне

1. Узнать IP компьютера: `ip addr | grep "inet " | grep -v 127.0.0.1`
2. Телефон и компьютер в одной WiFi сети
3. Открыть https://192.168.x.x:3000 на телефоне
4. Принять предупреждение о сертификате
5. Установить PWA через меню браузера

## GitHub Pages

### Сборка и деплой

```bash
GITHUB_PAGES=true npm run build
npm run deploy
```

### Важно про GH Pages

При развертывании на GitHub Pages:
- AJAX запросы идут по HTTP
- Приложение доступно по HTTPS
- Работает только с `localhost` в AJAX запросах

## Переменные окружения

| Переменная | Описание | По умолчанию |
|------------|----------|--------------|
| VITE_API_BASE_URL | URL бекенда | http://localhost:8080 |
| VITE_DEFAULT_USERNAME | Логин по умолчанию | user1 |
| VITE_DEFAULT_PASSWORD | Пароль по умолчанию | password123 |
| GITHUB_PAGES | Флаг для сборки GH Pages | - |

## Скрипты

- `npm run dev` — запуск dev сервера
- `npm run build` — сборка для production
- `npm run preview` — превью production билда
- `npm run deploy` — деплой на GH Pages
