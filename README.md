# Integrador Backend - Ecommerce de Tortas

### Alumno: Carlos Crovara

### Camada NUCBA: 2317

### Demo App deployada en Render: https://nucba-integrador-backend-ecommerce.onrender.com

## Instrucciones de instalación

```
git clone https://github.com/carloscrovara/NUCBA-Integrador-Backend-Ecommerce.git

npm install

crear archivo .env con las variables de entorno (conexión a bases de datos y valores de access y refresh secret tokens)

npx prisma generate

npm run dev

en Postman importar la colección de requests que se encuentra en la carpeta postman del proyecto
```

## Funcionalidades principales
-> Registro y login de usuarios. 

### Rol Administrador
-> Crear, editar y eliminar productos.

-> Crear, editar y eliminar categorías.

-> Modificar el status de las órdenes generadas por los usuarios.

-> Consultar las órdenes de todos los usuarios o una orden en particular.

-> Consultar las órdenes de los usuarios en un período específico.

### Rol Cliente
-> Crear y eliminar órdenes. 

-> Agregar, modificar y eliminar productos de una orden.

-> Consultar las órdenes realizadas o una orden en particular.

-> Consultar las órdenes efectuadas en un período específico.

### Todos los roles (Administrador y Cliente)
-> Consultar todos los productos o un producto en particular.

-> Consultar todas las categorías de los productos o una categoría específica. 