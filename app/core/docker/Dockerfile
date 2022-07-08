FROM ruby:2.7.2-slim

ARG SECRET_KEY_BASE
ARG BUNDLE_GITHUB__COM

ENV RAILS_ROOT /var/www/app
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo
ENV RAILS_MAX_THREADS 16
ENV PORT 3000
ENV RAILS_ENV production

# mimemagicが依存しているshared-mime-infoを追加する必要があるが、現状imagemagick経由でインストールしているので問題なし
# もしimagemagickを消す場合はshared-mime-infoを追加する必要がある
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev fonts-noto-cjk default-libmysqlclient-dev default-mysql-client curl imagemagick git
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

COPY Gemfile* /tmp/
WORKDIR /tmp

RUN bundle install --without=development:test --jobs=4 --retry=3

RUN mkdir -p $RAILS_ROOT
WORKDIR $RAILS_ROOT
COPY . $RAILS_ROOT

RUN bundle exec rails assets:precompile

COPY docker/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE $PORT
CMD ["bin/rails", "server"]
