FROM jekyll/jekyll:4.0

RUN apk --no-cache del imagemagick-dev \
    && apk --no-cache add imagemagick6-dev