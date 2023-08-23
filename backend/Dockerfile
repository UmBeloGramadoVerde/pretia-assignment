FROM node:20
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN git clone https://github.com/vishnubob/wait-for-it.git
RUN yarn
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]