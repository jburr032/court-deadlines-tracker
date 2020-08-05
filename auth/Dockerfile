FROM node:alpine

# Create the /app directory
WORKDIR /app
# Copy package.json in the same directory as the Dockerfile
# To the app directory
COPY package.json .
# Install the dependencies
RUN npm install --only=prod
# Copy over all files and folders
COPY . .

# Start node
CMD ["npm","start"]

# Best practices to not use root user
RUN adduser -D user
USER user
