FROM nginx
RUN mkdir /app
WORKDIR /app
ADD ./build ./build
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]