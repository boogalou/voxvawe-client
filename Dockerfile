FROM node:18
WORKDIR /opt/app
ADD . .
RUN npm install
RUN npm run build
CMD ["node", "./dist/mian.js"]