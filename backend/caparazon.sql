use [Broken Pocket]

CREATE TABLE Cliente (
    id_cliente NVARCHAR(20) PRIMARY KEY,
    nombre NVARCHAR(50),
    apellido NVARCHAR(50),
    cedula NVARCHAR(20),
    correo NVARCHAR(100),
    telefono NVARCHAR(20),
    provincia NVARCHAR(50),
    fecha_registro DATE
);

CREATE TABLE Proveedor (
    id_proveedor NVARCHAR(20) PRIMARY KEY,
    nombre_proveedor NVARCHAR(100),
    contacto NVARCHAR(50),
    telefono NVARCHAR(30),
    pais NVARCHAR(50),
    correo NVARCHAR(100)
);

CREATE TABLE Producto (
    id_producto NVARCHAR(20) PRIMARY KEY,
    nombre_producto NVARCHAR(100),
    categoria NVARCHAR(50),
    franquicia NVARCHAR(50),
    precio DECIMAL(10,2),
    stock INT,
    id_proveedor NVARCHAR(20),
    CONSTRAINT FK_Producto_Proveedor
        FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor)
);

CREATE TABLE Orden (
    id_orden NVARCHAR(20) PRIMARY KEY,
    id_cliente NVARCHAR(20),
    fecha_orden DATE,
    total DECIMAL(10,2),
    metodo_pago NVARCHAR(20),
    CONSTRAINT FK_Orden_Cliente
        FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

CREATE TABLE Detalle_Orden (
    id_detalle NVARCHAR(20) PRIMARY KEY,
    id_orden NVARCHAR(20),
    id_producto NVARCHAR(20),
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    subtotal DECIMAL(10,2),
    CONSTRAINT FK_DetalleOrden_Orden
        FOREIGN KEY (id_orden) REFERENCES Orden(id_orden),
    CONSTRAINT FK_DetalleOrden_Producto
        FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

CREATE TABLE Inventario_Movimientos (
    id_mov NVARCHAR(20) PRIMARY KEY,
    id_producto NVARCHAR(20),
    tipo_movimiento NVARCHAR(20),
    cantidad INT,
    fecha_movimiento DATE,
    descripcion NVARCHAR(200),
    CONSTRAINT FK_Inventario_Producto
        FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

CREATE TABLE Empleado (
    id_empleado NVARCHAR(20) PRIMARY KEY,
    nombre NVARCHAR(50),
    apellido NVARCHAR(50),
    cargo NVARCHAR(50),
    correo NVARCHAR(100),
    salario DECIMAL(10,2)
);

SELECT * FROM dbo.Cliente;
SELECT * FROM dbo.Proveedor;
SELECT * FROM dbo.Producto;
SELECT * FROM dbo.Orden;
SELECT * FROM dbo.Detalle_Orden;
SELECT * FROM dbo.Inventario_Movimientos;
SELECT * FROM dbo.Empleado;