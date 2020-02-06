# ForaSoft evaluation test

- Задание выполнено на React, Node, SocketIO с использованием TypeScript и WebRTC
- Простой state management на React Context и useReducer
- Регистрация на базовом JsonWebToken
- Возможность создавать чат комнаты и обмениваться текстовыми сообщениями в real-time - Возможность копировать join-ссылку, смотреть кто из участников онлайн
- Создатель комнаты может запустить stream своей веб-камеры для подключенных участников комнаты (простой WebRTC без библиотек)
- Для работы с формой и валидации полей используется [React Hook Form](https://react-hook-form.com)

Примечание:

Так как на задание отводилась всего неделя (с технологией WebRTC я работал очень давно и довольно поверхностно), я не успел прописать тесты и некоторых местах отрефакторить код/комментарии (в начале затормозил, пока разбирался с WebRTC), так что если нужно, я могу дополнительно доделать тесты (unit или e2e), отрефакторить что-либо или сделать docker-образ проекта по Вашему запросу.

## Getting started

- Запустите локальный Postgres сервер (порт 5432) и выполните следующие действия

```console
psql$: create database chat_app;

psql$: create user chat_app_owner with encrypted password 'chat_app_owner_password';

psql$: grant all privileges on database chat_app to chat_app_owner;
```

- Склонируйте репозиторий

- Установите зависимости

```console
$ yarn install
```

- Запустите сервер

```console
$ yarn run server
```

- Перейдите по ссылке в терминале
