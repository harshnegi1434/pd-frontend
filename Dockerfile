# Use the official Node.js LTS (Long Term Support) image
FROM node:lts-alpine

# Set working directory inside the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js project
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Set environment variables for production (adjust if needed)
ENV NODE_ENV=production

# Start the Next.js application
CMD ["npm", "start"]
