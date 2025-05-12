## ENTIDADES

    Miembro:

        id_miembro (PK)

        nombre

        edad

        fecha_cumpleaños

        correo

        ocupación 

        bautizado

        ministerio (relación con Ministerio)

    Ministerio:

        id_ministerio (PK)

        nombre

        descripcion

    Pendiente:

        id_pendiente (PK)

        titulo

        descripcion

        fecha_creacion

        estado (Pendiente, En Proceso, Completado)

        responsable (relacion con Usuario)

    MotivoOracion:

        id_motivo (PK)

        descripcion

        fecha_registro

        registrado_por (relación con Miembro)

    Evento:

        id_evento (PK)

        nombre

        fecha

        descripcion

        responsable (Ministario)

    Usuario (Administrador):

        id_usuario (PK)

        nombre_usuario

        contraseña_hash

        ministerio 

## RELACIONES

    Un miembro puede pertenecer a uno o ningún ministerio.

    Un evento tiene un responsable (ministerio).

    Un motivo de oración es registrado por un Usuario.

    Un pendiente tiene un responsable (usuario)

    Un usuario (admin) es quien puede administrar miembros, eventos, pendientes y motivos.


## Diagrama Relacional

![Diagrama](assets/Diagrama%20relacional.png)


## Supabase

![Diagrama2](assets/supabase-schema.png)