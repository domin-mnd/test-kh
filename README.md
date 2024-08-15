![Overengineering 101](public/inanutshell.png)

# Тестовое задание

- 📦 Монорепозиторий с **Turborepo**
- 📱 **Адаптивная вёрстка**
- 👷 **Тесты** и **валидация**
- 🧰 Линтер библиотека
- 📝 OpenAPI **Документация**

# Основной стек

- `apps/web`
  - **Vite** - Сборка
  - **Vue** - Фронтенд
  - **Vue-router** - Роутинг
  - **Pinia** - Состояние
- `apps/api`
  - **Tsup** - Сборка
  - **Express** - Сервер
  - **PostgreSQL** - База данных
  - **Pg** - PostgreSQL клиент
  - **Valibot** - Валидация
  - **Jest** - Тесты
  - **Swagger** - Документация
- `packages/ui`
  - **Vite** - Сборка
  - **Vue** - Компоненты
- `packages/config-eslint`
  - **@vercel/style-guide** - Конфигурация ts
  - **eslint-plugin-vue** - Конфигурация vue

# Установка

Клонирование:

```bash
$ git clone https://github.com/domin-mnd/test-kh
$ cd test-kh
```

После необходимо указать переменные окружения АПИ в файле `apps/api/.env`:

```env
# Строка подключения к базе данных. Connection string for the database.
DATABASE_URL=postgres://user:password@localhost:5432/dbname
PORT=5050
```

Далее нужно указать переменные окружения фронтенда в файле `apps/web/.env.local`:

```env
# Порт для API. API Port.
VITE_API_PORT=5050
```

И уже после можно установить зависимости:

```bash
$ npm i -g pnpm # Пакетный менеджер используется pnpm.
$ pnpm install
```

После установки зависимостей нужно мигрировать базу данных и заполнить её:

```bash
$ pnpm db:migrate
$ pnpm db:seed
```

# Запуск

```bash
$ pnpm build
$ pnpm start
```

Теперь приложение доступно по адресу `http://localhost:8085`, а API по адресу `http://localhost:5050`.
