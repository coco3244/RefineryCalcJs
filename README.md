# RefineryCalc

RefineryCalc est un projet visant à créer un interface web permettant de gérer et calculer des raffinages pour le jeu Star Citizen

## Nécessite 
- Php
- Composer
    - extention dotenv : vlucas/phpdotenv

Renommer le fichier ".env template" en ".env", et le remplir.

## dockerfile :
```docker
FROM php:8.1-fpm-alpine

WORKDIR /www

RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-enable pdo_mysql

ENV COMPOSER_ALLOW_SUPERUSER=1

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy composer.json to the container
COPY composer.json /www

# Init and Setup Composer
RUN cd /www && composer install --prefer-dist --no-dev --no-autoloader --no-scripts --working-dir=/www \
    && composer clear-cache \
    && composer dump-autoload --optimize --working-dir=/www

# Install .env with Composer
RUN composer require vlucas/phpdotenv --working-dir=/www

```
