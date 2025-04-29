FROM node:23-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy code and Prisma files
COPY . .

# Set your environment (adjust for production if needed)
ENV DATABASE_URL=postgresql://postgres:secretpassword@host.docker.internal:5432/mydb

# Expose port
EXPOSE 3000

# Run at container start:
# 1. Generate Prisma client
# 2. Build the app
# 3. Start the server
CMD ["sh", "-c", "npx prisma generate && npm run build && npm start"]
