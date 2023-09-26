# User administration panel

## Repositorio de la aplicación web User administration panel hecha en Laravel y React.

### Comandos

#### Crear proyecto

- laravel new laravel-react-full-stack

#### Subir migraciones a la base de datos

- php artisan migrate

#### Ejecutar servidor de Laravel

- php artisan serve

#### Consultar la lista de rutas

- php artisan route:list

#### Abrir un enlace para comunicarse con la carpeta storage

- php artisan storage:link

#### Crear controlador

- php artisan make:controller Api/AuthController
- php artisan make:controller Api/UserController --model=User --resource --requests --api

#### Crear request

- php artisan make:request LoginRequest
- php artisan make:request SignupRequest

#### Crear resource

- php artisan make:resource UserResource

#### Seeding database

- php artisan db:seed
