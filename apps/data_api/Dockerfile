FROM node:17

ENV NODE_ENV=staging

WORKDIR /usr/src/app

RUN yarn global add concurrently nodemon

COPY ["package.json", "yarn.lock", "tsconfig.json", "./"]
COPY ["./prisma/schema.prisma", "./prisma/"]
RUN yarn
RUN yarn prisma generate
RUN yarn build
COPY . .
EXPOSE 4000
CMD [ "yarn", "start" ]