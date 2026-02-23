FROM node:20-alpine AS base
WORKDIR /app

# pnpm uchun
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# ---- deps ----
FROM base AS deps
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# ---- build ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# ---- runner ----
FROM base AS runner
ENV NODE_ENV=production

# minimal run fayllar
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

# Prisma migrate -> start
CMD sh -c "pnpm exec prisma migrate deploy && pnpm run start"
