# Order API

API RESTful para gestionar productos y calcular pedidos. Incluye lógica de descuentos, cargos de envío por estrato (Colombia), documentación Swagger, pruebas unitarias y uso de SQLite como base de datos embebida.

### Características

- Crear productos a partir de una lista

- Consultar productos registrados

- Calcular el costo total de un pedido

- Aplica descuentos

- Cargos de envío por estrato (1 a 5)

- Documentación Swagger (/api-docs)

- Pruebas unitarias e integración con Jest y Supertest

- Base de datos SQLite (opcionalmente en memoria para test)

### Tecnologías

- TypeScript

- Express

- TypeORM

- SQLite

- Jest

- Supertest

- Swagger

### Ejecución

1. git clone https://github.com/JamesMontealegre/order-api.git
2. cd order-api
3. npm install
4. Ejecución:

- **Desarrollo:** npm run start
- **Pruebas:** npm run test

### Documentación y validaciones

Una vez corriendo, accede a: http://localhost:3000/api-docs

### Ejemplos de peticiones con la API

    Crear productos:

    POST /api/products
    Content-Type: application/json

    [
    { "name": "Zapatos", "price": 10000, "quantity": 2 },
    { "name": "Camisa", "price": 25000, "quantity": 1 }
    ]



    Calcular pedido:

    POST /api/orders
    Content-Type: application/json

    {
    "estrato": 3,
    "products": [
        { "name": "Zapatos", "price": 10000, "quantity": 2 }
    ]
    }


# Autor

**James Montealegre**
_Ingeniero Telemático_ - _MSc Software Engineer_
_Universidad de los Andes, Bogotá - Colombia_
[LinkedIn](https://www.linkedin.com/in/james-montealegre-gutierrez/)
