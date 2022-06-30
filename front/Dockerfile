FROM nginx
RUN mkdir /app
WORKDIR /app
ADD ./build ./build
RUN rm /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]