FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY sitemap.xml /usr/share/nginx/html/sitemap.xml
EXPOSE 80
