#!/bin/bash

set -e
set -u

psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "ivi" <<-EOSQL
    CREATE DATABASE ivi_user
EOSQL
