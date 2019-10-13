# Metodología para utilizar react en una aplicación existente

El objetivo de este proyecto es dar las bases de como agregar una aplicación react (creada en este proyecto)
a una aplicación existente del tipo MVC. Especificamente con el ejemplo de  Asp MVC.

En resumen hay que hacer 3 cambios de forma inicial y para cada aplicación 
que tengamos tendremos que hacer 2 cambios.

## Aplicación existente

El proyecto final es el siguiente

![Aplicación](./img/app_final.png?raw=true "La aplicación final es el bootstrap de mvc")

La aplicación es un proyecto MVC, requerimos modificar el layout y el view donde estar la aplicación react.

![Project](./img/proyecto_mvc.png?raw=true "Estructura del proyecto")

## Cambios en la Aplicación React agregada

### Preparación de la Aplicación React

Requerimos usar el mismo CSS de la aplicación MVC destino. Para esto modificamos el archivo public/index.html
para agregar los CSS (debemos eliminar los contenidos que se crean al iniciar react)

![App React - Index](./img/index_react.png?raw=true "Estructura del proyecto")


### Utilización del package de migración 

Lo que necesitamos hacer de forma general es hacer un build de la aplicación npm build y después vamos
a  ejecutar el programa z_dev/migrarApp.

Para configurar la aplicación debemos indicar los paths absolutos de origen y destino, en el 
modulo z_dev/migrarApp

![App React - Index](./img/uso1.png?raw=true "Estructura del proyecto")


El package que debemos usar es   

`npm run build && node z_dev/migrarApp.js`


Esto ya esta incluido en el npm

###  `npm run publicar`

Lo que hace el modulo es copiar todos los archivos css y js que se crean en el build y copiarlos a la carpeta destino

Origen

![App React - Archivos involucrados](./img/uso2.png?raw=true "Archivos de origen") 

Destino

![App React - Archivos Destino](./img/uso3.png?raw=true "Archivos destino")

---

## Cambios Aplicación MVC destino

#### Modificación del Layout

1) Agregar Seccion para css
2) No es propiamente modificacion porque ya esta la sección para js pero en caso de no tenerla agregarla
3) Agregar un directorio para el contenido de la aplicación react (Content/reactapp/t1)
 
![Cambios Layout](./img/mvc_mod_layout.png?raw=true "Estructura del proyecto")

#### Modificación del View

Se requiere implementar el contenido propio de la aplicación, con el contenido css y el contenido js
TEnemos las instrucciones  de que copiar en el archivo de contenido/

![Cambios View](./img/mvc_mod_view.png?raw=true "Estructura del proyecto")
