# Stage 1: Build Angular Application + Prisma Client
FROM node:22-alpine AS build

RUN apk add --no-cache openssl bind-tools

WORKDIR /app
COPY package*.json ./

RUN npm install --force

COPY . .

# generate prisma client with schema available
RUN npx prisma generate

# build Angular SSR bundle
RUN npm run build


# Stage 2: Runtime (Node SSR)
FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
RUN npm install --production --force

# copy dist (SSR build)
COPY --from=build /app/dist ./dist

# copy prisma directory so schema exists in runtime
COPY --from=build /app/prisma ./prisma

# copy prisma engines + client
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/node_modules/@prisma /app/node_modules/@prisma

EXPOSE 4000
CMD ["npm", "run", "serve:ssr:cathub"]
