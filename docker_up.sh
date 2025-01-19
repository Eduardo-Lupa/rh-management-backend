#!/bin/bash

# Executa o docker-compose down para parar e remover os containers, redes e volumes
docker-compose down --rmi all

# Executa o docker-compose com as opções de rebuild
docker-compose up --build
