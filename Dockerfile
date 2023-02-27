#Install dependencies for development
FROM node:18-alpine AS dev

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY . .

#Creating a build
FROM node:18-alpine AS create-build

WORKDIR /usr/src/app

COPY --from=dev /usr/src/app ./

RUN npm run build

USER node

#Running the application
FROM node:18-alpine AS run-app

WORKDIR /usr/src/app

COPY --from=dev /usr/src/app/node_modules ./node_modules
COPY --from=create-build /usr/src/app/dist ./dist
COPY package.json ./

CMD ["npm", "run", "start:prod"]


# FROM node:18-alpine

# # Create app directory
# WORKDIR /usr/src/app

# #Copy over package.json and package-lock.json
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm ci --omit=dev

# # Copy over source code
# COPY . .

# #Expose port
# EXPOSE 3000
# EXPOSE 4000
# EXPOSE 8080

# # Build the app
# RUN npm run build

# # Run the app
# USER node
# CMD ["npm", "run", "start:prod"]

