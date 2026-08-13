FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY favicon.png /usr/share/nginx/html/favicon.png

EXPOSE 80
