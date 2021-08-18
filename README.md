# API Productos Usuarios

## Configuración 

* Clonar repositorio.
* Correr `./init.sh`.
* Ejecutar `docker-compose exec api-prod-user npm run typeorm migration:run`

### Test
* `npm run test`

## Estructura del proyecto (src)
``` Source files
├── src                    # Source files.
|   ├── /config            # Contiene archivos de configuración (/database.ts, /redis.ts, /cron.ts, ...).
|   ├── /controllers       # Contiene archivos de clases para los controladores.
|   ├── /enums             # Contiene archivos de enums.
|   ├── /daos              # Contiene archivos de lógica de acceso a datos.
|   ├── /handles           # Contiene archivos de clase para los handlers.
|   ├── /helpers           # Contiene funciones genericos para todo el proyecto.
|   ├── /middlewares       # Contiene archivos de clases para los middlewares.
|   ├── /models            # Contiene archivos de clases para los modelos.
|   |   ├──/entities       # Contiene archivos con entidades de bases de datos.
|   |   ├──/requests       # Contiene archivos con los request de cada controlador.
|   |   ├──/response       # Contiene archivos con los response de cada controlador.
|   ├── /modules           # Contiene archivos de clases para los modulos.
|   ├── /migrations        # Contiene archivos de clases para las migraciones.
└── └── /services          # Contiene archivos de clases para los servicios.
```
## Diseño API

![diagram](./doc/der.svg)
