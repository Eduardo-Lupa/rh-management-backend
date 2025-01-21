#!/bin/bash

# Executa o docker-compose down para parar e remover os containers, redes e volumes
# npx prisma migrate reset

# Derruba os containers e remove volumes nomeados
docker-compose down -v

# Remove o volume explicitamente
docker volume rm rh-management-backend_postgres_data

# reinicia os containers para rodar de novo as tabelas
./docker_up.sh
