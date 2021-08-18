FROM node:13.11.0-slim

WORKDIR /api-product-user
ADD package.json /app/package.json
RUN npm install
ADD . /api-product-user
CMD ["npm", "run", "start"]