#!/bin/bash

# Executa o docker-compose down para parar e remover os containers, redes e volumes
npx prisma migrate reset
