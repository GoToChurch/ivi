Бэкэнд финального проекта
Посмотреть документацию можно по адресу: localhost:3000/api/docs.

Чтобы запустить проект через докер необходимо:
1. Сколнировать проект к себе на компьютер выполнив команду "git clone https://github.com/GoToChurch/ivi.git".
2. Находясь в директории с файлом docker-compose.yml выполнить команду "docker-compose up --build" с включенным докером.

Чтобы запустить проект без докера необходимо:
1. Иметь на компьютере устанволенный node.js.
2. Установить postgresql, желательно установить 15-ю версию и создать в нём базы ivi и ivi_user вручную.
3. Установить rabbitmq, здесь рассказано, как это сделать https://www.youtube.com/playlist?list=PLCpsrvs6hImZShRjUbqewZWgjJgU6SIvU.
4. В файле .env необходимо поменять следующие строки:
     - POSTGRES_HOST=localhost
     - POSTGRES_PASSWORD=свой пароль
     - RABBITMQ_URI=amqp://guest:guest@localhost:5672 или если не подключается, то amqp://guest:guest@127.0.0.1:5672
   Также необходимо убрать строку ".usingServer("http://chrome:4444/wd/hub)" в файле libs/common/src/driver.ts
5. Установить браузер Google Chrome последней версии.
6. Находясь в директории с файлом package.json, выполнить команду "npm install", чтобы установить все зависимости. 
7. Чтобы запустить все микросервисы, необходимо поочередно выполнить следующие команды, находясь в директории с файлом nest-cli:
     - npm run start:dev users_and_auth 
     - npm run start:dev roles 
     - npm run start:dev award 
     - npm run start:dev country 
     - npm run start:dev genre 
     - npm run start:dev person 
     - npm run start:dev film 
     - npm run start:dev review 
     - npm run start:dev api_gateway
   Каждую команду нужно выполнить в отдельном терминале.