FROM node:23-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy code and Prisma files
COPY . .

# Set your environment (adjust for production if needed)
# ENV DATABASE_URL=postgresql://postgres:secretpassword@host.docker.internal:5432/mydb

# RUN npx prisma migrate dev
RUN npx prisma generate
RUN npm run build

# Expose port
EXPOSE 3000

CMD ["npm", "run", "docker:start"]
