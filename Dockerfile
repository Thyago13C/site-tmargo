FROM nginx:alpine

COPY dist/ /usr/share/nginx/html/
COPY sitemap.xml /usr/share/nginx/html/sitemap.xml

EXPOSE 80
