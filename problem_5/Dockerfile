FROM node:20-alpine3.18


ENV MONGODB_URI=mongodb+srv://admin:admin@be-e.mqsw1lk.mongodb.net/db-test2?retryWrites=true&w=majority&appName=BE-E

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
