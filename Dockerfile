FROM jekyll/jekyll:4.0

# https://ineed.coffee/post/jekyll-docker-image-with-imagemagick6-instead-of-imagemagick7
RUN apk --no-cache del imagemagick-dev \
    && apk --no-cache add imagemagick6-dev