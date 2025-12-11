use [Broken Pocket]

CREATE TABLE Cliente (
    id_cliente NVARCHAR(20) NOT NULL,
    nombre NVARCHAR(50) NOT NULL,
    apellido NVARCHAR(50) NOT NULL,
    cedula NVARCHAR(20) NOT NULL UNIQUE,
    correo NVARCHAR(100) NOT NULL UNIQUE,
    telefono NVARCHAR(20),
    provincia NVARCHAR(50) NOT NULL,
    fecha_registro DATE NOT NULL DEFAULT(GETDATE()),
    contraseña NVARCHAR(100) NOT NULL,
    CONSTRAINT PK_Cliente PRIMARY KEY (id_cliente),
    CONSTRAINT CHK_Cliente_Cedula CHECK (LEN(cedula) >= 5),
    CONSTRAINT CHK_Cliente_Correo CHECK (correo LIKE '%@%'),
    CONSTRAINT CHK_Cliente_Contra CHECK (LEN(contraseña)>=6)
);

CREATE TABLE Proveedor (
    id_proveedor NVARCHAR(20) NOT NULL,
    nombre_proveedor NVARCHAR(100) NOT NULL,
    contacto NVARCHAR(50) NOT NULL,
    telefono NVARCHAR(30),
    pais NVARCHAR(50) NOT NULL,
    correo NVARCHAR(100) NOT NULL UNIQUE,

    CONSTRAINT PK_Proveedor PRIMARY KEY (id_proveedor),
    CONSTRAINT CHK_Proveedor_Correo CHECK (correo LIKE '%@%')
);

CREATE TABLE Producto (
    id_producto NVARCHAR(20) NOT NULL,
    nombre_producto NVARCHAR(100) NOT NULL,
    categoria NVARCHAR(50) NOT NULL,
    franquicia NVARCHAR(50),
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    id_proveedor NVARCHAR(20) NOT NULL,

    CONSTRAINT PK_Producto PRIMARY KEY (id_producto),

    CONSTRAINT FK_Producto_Proveedor FOREIGN KEY (id_proveedor)
        REFERENCES Proveedor(id_proveedor)
        ON UPDATE CASCADE 
        ON DELETE NO ACTION,

    CONSTRAINT CHK_Producto_Precio CHECK (precio >= 0),
    CONSTRAINT CHK_Producto_Stock CHECK (stock >= 0)
);

CREATE TABLE Orden (
    id_orden NVARCHAR(20) NOT NULL,
    id_cliente NVARCHAR(20) NOT NULL,
    fecha_orden DATE NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    metodo_pago NVARCHAR(20) NOT NULL,

    CONSTRAINT PK_Orden PRIMARY KEY (id_orden),

    CONSTRAINT FK_Orden_Cliente FOREIGN KEY (id_cliente)
        REFERENCES Cliente(id_cliente)
        ON UPDATE CASCADE 
        ON DELETE NO ACTION,

    CONSTRAINT CHK_Orden_Total CHECK (total >= 0),
    CONSTRAINT CHK_MetodoPago CHECK (metodo_pago IN ('Tarjeta','Efectivo','Yappy'))
);


CREATE TABLE Detalle_Orden (
    id_detalle NVARCHAR(20) NOT NULL,
    id_orden NVARCHAR(20) NOT NULL,
    id_producto NVARCHAR(20) NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal AS (cantidad * precio_unitario) PERSISTED,  -- Campo calculado

    CONSTRAINT PK_DetalleOrden PRIMARY KEY (id_detalle),

    CONSTRAINT FK_DetalleOrden_Orden FOREIGN KEY (id_orden)
        REFERENCES Orden(id_orden)
        ON UPDATE CASCADE 
        ON DELETE CASCADE,

    CONSTRAINT FK_DetalleOrden_Producto FOREIGN KEY (id_producto)
        REFERENCES Producto(id_producto)
        ON UPDATE CASCADE 
        ON DELETE NO ACTION,

    CONSTRAINT CHK_Cantidad CHECK (cantidad > 0),
    CONSTRAINT CHK_PrecioUnit CHECK (precio_unitario >= 0)
);


CREATE TABLE Inventario_Movimientos (
    id_mov NVARCHAR(20) NOT NULL,
    id_producto NVARCHAR(20) NOT NULL,
    tipo_movimiento NVARCHAR(20) NOT NULL,
    cantidad INT NOT NULL,
    fecha_movimiento DATE NOT NULL,
    descripcion NVARCHAR(200),

    CONSTRAINT PK_Inventario PRIMARY KEY (id_mov),

    CONSTRAINT FK_Inventario_Producto FOREIGN KEY (id_producto)
        REFERENCES Producto(id_producto)
        ON UPDATE CASCADE 
        ON DELETE NO ACTION,

    CONSTRAINT CHK_Movimiento_Tipo CHECK (tipo_movimiento IN ('ENTRADA','SALIDA')),
    CONSTRAINT CHK_Movimiento_Cantidad CHECK (cantidad > 0)
);


CREATE TABLE Empleado (
    id_empleado NVARCHAR(20) NOT NULL,
    nombre NVARCHAR(50) NOT NULL,
    apellido NVARCHAR(50) NOT NULL,
    cargo NVARCHAR(50) NOT NULL,
    correo NVARCHAR(100) NOT NULL UNIQUE,
    salario DECIMAL(10,2) NOT NULL,

    CONSTRAINT PK_Empleado PRIMARY KEY (id_empleado),
    CONSTRAINT CHK_Salario CHECK (salario>0)
);

SELECT * FROM dbo.Cliente;
SELECT * FROM dbo.Proveedor;
SELECT * FROM dbo.Producto;
SELECT * FROM dbo.Orden;
SELECT * FROM dbo.Detalle_Orden;
SELECT * FROM dbo.Inventario_Movimientos;
SELECT * FROM dbo.Empleado;