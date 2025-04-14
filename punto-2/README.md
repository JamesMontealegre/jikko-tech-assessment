## Justificación de la Arquitectura Propuesta
Dada la necesidad de escalar el sistema de una startup de reparto de comida a domicilio, que actualmente opera bajo una arquitectura monolítica con limitaciones en rendimiento, se propone un rediseño completo del backend hacia una arquitectura de microservicios. Esta nueva arquitectura está orientada a resolver los principales retos identificados: escalabilidad, fiabilidad y facilidad de mantenimiento.

### Backend for Frontend (BFF) y GraphQL
Se implementa una capa intermedia conocida como Backend for Frontend (BFF), la cual expone una API mediante el lenguaje de consulta GraphQL. Esta decisión permite que los distintos clientes, como aplicaciones móviles o web, soliciten únicamente los datos que requieren, optimizando el consumo de recursos y mejorando la experiencia de usuario. Asimismo, el BFF actúa como punto de consolidación de lógica de presentación, facilitando futuras extensiones hacia nuevos canales de consumo sin afectar la lógica de negocio del sistema central.

### Microservicios con comunicación eficiente
El backend se divide en microservicios independientes, entre los cuales se destacan los servicios de órdenes, menú y entregas (Supuestos del dominio del dominio del problema). Cada uno de estos servicios se implementa con un esquema de replicación (tres instancias por servicio, supuesto de diseño...), lo cual permite distribuir la carga y garantizar alta disponibilidad. La comunicación entre servicios se establece mediante gRPC de forma asincrónica, una tecnología eficiente que reduce la latencia en las operaciones internas y permite manejar un volumen elevado de solicitudes con menor consumo de recursos en comparación con protocolos basados en REST (gRPC use -> http/2 y protobuf eficiente y rápido entre backend to backend).

### Diseño de Bases de Datos
Cada microservicio gestiona su propia base de datos, asegurando así el principio de autonomía y desacoplamiento entre servicios. Esta estrategia facilita el mantenimiento del sistema y permite que cada servicio evolucione de manera independiente. Adicionalmente, se incluye una base de datos de solo lectura que cumple funciones analíticas y de consulta intensiva, desacoplando así las operaciones de lectura pesada del procesamiento transaccional de los servicios principales.

### Colas de Mensajes
La arquitectura contempla el uso de un sistema de colas de mensajes (RabbitMQ) para garantizar la resiliencia y el procesamiento desacoplado entre servicios. A través de eventos de dominio como la creación de órdenes o consultas relacionadas, se permite que los servicios productores y consumidores operen de forma asíncrona. Esto es fundamental para asegurar que los procesos críticos puedan continuar su ejecución incluso cuando otros servicios dependientes se encuentren temporalmente inactivos o saturados.

### Almacenamiento en Caché
Con el objetivo de optimizar los tiempos de respuesta y reducir la carga sobre las bases de datos, se incorpora un sistema de almacenamiento en caché basado en Redis. Este componente permite almacenar temporalmente información de alta demanda, como catálogos de productos o pedidos activos, mejorando significativamente el rendimiento del sistema en escenarios de alta concurrencia.

### Consideraciones de Infraestructura
Todos los componentes de la arquitectura están diseñados para operar en un entorno gestionado por un proveedor de servicios en la nube. Esto incluye balanceadores de carga y gateways replicados que distribuyen eficientemente el tráfico entrante, así como mecanismos de failover que garantizan la continuidad operativa del sistema ante posibles fallos en los servicios individuales.

### Beneficios de la arquitectura propuesta
* Escalabilidad horizontal: cada servicio puede escalar de forma independiente según su carga.

* Mejora en el rendimiento general: el uso combinado de GraphQL, Redis y gRPC reduce la latencia del sistema.

* Alta disponibilidad y tolerancia a fallos: el uso de colas de mensajes y servicios replicados asegura la continuidad del servicio.

* Desacoplamiento de componentes: se facilita el mantenimiento, la evolución y el despliegue independiente de cada parte del sistema.

* Preparación para el crecimiento: la arquitectura está diseñada para admitir nuevos servicios, funcionalidades y canales de acceso de manera flexible y ordenada.