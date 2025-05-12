FROM node:22.15.0 as build
WORKDIR /app

COPY . .
ENV NODE_ENV=development
# PNPM
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build


FROM node:22.15.0
WORKDIR /app
RUN npm install -g pnpm
COPY --from=build /app/package.json /app/package.json
RUN pnpm install
COPY --from=build /app/dist /app/dist
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/docs /app/docs
RUN pnpm prisma generate
EXPOSE 3000
CMD ["pnpm", "run", "start"]