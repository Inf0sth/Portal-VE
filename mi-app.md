# Portal VE

Una aplicación web que nos permita automatizar y agilizar algunos procesos en la iglesia a la asisto.

## Sección publica

Aplicación web con el proposito de compartir: 
- Noticias → Archivo estático o CMS ligero.
- Eventos → Puede ser mostrado desde la BD si se desea.
- Informes → PDF o enlaces de descarga.
- Ubicación de la iglesia → Google Maps embebido.

## Seccion privada

Uso de bases de datos para uso de administradores con los objetivos de:
- Llevar un control de miembros
    - Nombres
    - Si estudian o trabajan
    - Edad
    - Fecha de cumpleaños
    - Correo
    - Bautismos
    - Ministerio

- Ver pendientes
- Ver motivos de oración
- Gestionar responsables de los eventos

## Moodboard

![Moodboard](assets/Moodboard.jpg)

## Algoritmia en lenguaje natural

1. Inicio
- Selección de una sección
    - Noticias: Despliege del Newspaper
    - Información: Infomración de contacto y sobre la iglesia
    - Eventos: Despliege de la información de eventos proximos
    - Ubicación: Se muestra la ubicación de la iglesia
    - Ingresar: Redirige a la parte privada del sitio "2"

2. Login: Validación de usuario y contraseña
- Si se logra ingresar se puede:
    - Ver integrantes y su información
    - Ver pendientes
    - Ver motivos de oración
    - Asignar responsables a diferentes eventos
    - Agregar integrantes
    - Eliminar integrantes
    - Salir: Volver a "1"
 - Si no se logra ingresar vuelve a "1"

# Diagrama de flujo

![Diagrama](assets/Diagrama%20de%20flujo.png)

