FROM node:20-alpine

WORKDIR /server

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable && corepack prepare yarn@4.9.2 --activate

COPY package.json yarn.lock .yarnrc.yml turbo.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/storefront/package.json ./apps/storefront/

RUN yarn install

COPY . .

EXPOSE 9000 5173 8000

ENTRYPOINT ["./start.sh"]
