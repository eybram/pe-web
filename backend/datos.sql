use [Broken Pocket]

INSERT INTO Cliente (id_cliente, nombre, apellido, cedula, correo, telefono, provincia, fecha_registro) VALUES
('Pd1', 'Ana', 'Castillo', '8-945-1234', 'ana.c@gmail.com', '6789-1122', 'Panamá', '2025-01-12'),
('Pd2', 'Marcos', 'Gutiérrez', '4-567-902', 'marcos.gt@gmail.com', '6001-8877', 'Chiriquí', '2025-02-10'),
('Pd3', 'Luis', 'Moreno', '3-1023-444', 'luism@example.com', '6999-3321', 'Veraguas', '2023-03-05'),
('Pd4', 'Sofía', 'Ríos', '2-788-331', 'sofri@gmail.com', '6123-9876', 'Panamá Oeste', '2024-03-20'),
('Pd5', 'Daniel', 'Vega', '1-332-819', 'daniel.vg@gmail.com', '6555-1234', 'Colón', '2024-04-01'),
('Pd6', 'Karla', 'Hernández', '9-122-432', 'karla.hz@gmail.com', '6990-1212', 'Herrera', '2025-04-10'),
('Pd7', 'Jorge', 'Rivas', '6-332-728', 'jrivas90@gmail.com', '6988-4411', 'Coclé', '2024-05-02'),
('Pd8', 'Rebeca', 'Lasso', '8-112-567', 'reb.lasso@gmail.com', '6221-4789', 'Panamá', '2024-05-22');

INSERT INTO Proveedor (id_proveedor, nombre_proveedor, contacto, telefono, pais, correo) VALUES
('EM1', 'Gaming World Supply', 'Karen Smith', '+1 555-222', 'USA', 'contact@gwsupply.com'),
('EM2', 'PlayMerch LATAM', 'Ricardo Torres', '‪+507 6000-1122‬', 'Panamá', 'ventas@playmerch.com'),
('EM3', 'HaloCollectibles Inc', 'Mark Green', '+1 555-300', 'USA', 'support@halocollect.com'),
('EM4', 'Funko International', 'Jhon Atkins', '+1 555-902', 'USA', 'info@funko.com'),
('EM5', 'GeekMerch Europe', 'Johana Müller', '‪+49 331-882‬', 'Alemania', 'jmuller@geekmerch.de');

INSERT INTO Producto (id_producto, nombre_producto, categoria, franquicia, precio, stock, id_proveedor) VALUES
('PR1', 'Camiseta Zelda Master Sword', 'Camiseta', 'Zelda', 25.00, 50, 'EM1'),
('PR2', 'Figura Funko de Kratos', 'Figura', 'God of War', 35.00, 30, 'EM4'),
('PR3', 'Llavero Pokéball', 'Llavero', 'Pokémon', 10.00, 80, 'EM1'),
('PR4', 'Poster Halo Infinite', 'Poster', 'Halo', 12.00, 40, 'EM3'),
('PR5', 'Figura de Mario Kart', 'Figura', 'Nintendo', 28.00, 25, 'EM1'),
('PR6', 'Camiseta de Starfield', 'Camiseta', 'Bethesda', 22.00, 35, 'EM2'),
('PR7', 'Llavero de Creeper', 'Llavero', 'Minecraft', 8.00, 120, 'EM5'),
('PR8', 'Figura Funko de Pikachu', 'Figura', 'Pokémon', 32.00, 20, 'EM4'),
('PR9', 'Poster de God of War Ragnarök', 'Poster', 'God of War', 15.00, 18, 'EM5'),
('PR10', 'Camiseta de Hollow Knight', 'Camiseta', 'Hollow Knight', 20.00, 60, 'EM2');

INSERT INTO Orden (id_orden, id_cliente, fecha_orden, total, metodo_pago) VALUES
('Ord_1', 'Pd1', '2025-02-01', 60.00, 'Tarjeta'),
('Ord_2', 'Pd2', '2025-02-15', 35.00, 'Efectivo'),
('Ord_3', 'Pd1', '2024-03-01', 75.00, 'Yappy'),
('Ord_4', 'Pd4', '2025-03-18', 10.00, 'Tarjeta'),
('Ord_5', 'Pd3', '2023-03-20', 37.00, 'Tarjeta'),
('Ord_6', 'Pd5', '2025-04-02', 50.00, 'Yappy'),
('Ord_7', 'Pd6', '2024-04-12', 32.00, 'Efectivo'),
('Ord_8', 'Pd7', '2025-04-25', 28.00, 'Tarjeta'),
('Ord_9', 'Pd8', '2024-05-10', 70.00, 'Tarjeta'),
('Ord_10', 'Pd5', '2025-05-22', 40.00, 'Efectivo');

INSERT INTO Detalle_Orden (id_detalle, id_orden, id_producto, cantidad, precio_unitario, subtotal) VALUES
('D1', 'Ord_1', 'PR1', 1, 25.00, 25.00),
('D2', 'Ord_1', 'PR3', 2, 10.00, 20.00),
('D3', 'Ord_1', 'PR7', 2, 8.00, 16.00),
('D4', 'Ord_2', 'PR2', 1, 35.00, 35.00),
('D5', 'Ord_3', 'PR1', 1, 25.00, 25.00),
('D6', 'Ord_3', 'PR2', 1, 35.00, 35.00),
('D7', 'Ord_4', 'PR3', 1, 10.00, 10.00),
('D8', 'Ord_5', 'PR4', 1, 12.00, 12.00),
('D9', 'Ord_5', 'PR3', 2, 10.00, 20.00),
('D10', 'Ord_6', 'PR10', 2, 20.00, 40.00),
('D11', 'Ord_7', 'PR7', 4, 8.00, 32.00),
('D12', 'Ord_8', 'PR5', 1, 28.00, 28.00),
('D13', 'Ord_9', 'PR8', 2, 32.00, 64.00),
('D14', 'Ord_9', 'PR3', 1, 10.00, 10.00),
('D15', 'Ord_10', 'PR6', 1, 22.00, 22.00);

INSERT INTO Inventario_Movimientos (id_mov, id_producto, tipo_movimiento, cantidad, fecha_movimiento, descripcion) VALUES
('MOV1', 'PR1', 'ENTRADA', 50, '2025-01-10', 'Lote inicial'),
('MOV2', 'PR2', 'ENTRADA', 30, '2025-02-01', 'Reabastecimiento'),
('MOV3', 'PR3', 'SALIDA', 4, '2025-02-01', 'Venta ord_1'),
('MOV4', 'PR4', 'ENTRADA', 40, '2024-03-12', 'Reabastecimiento'),
('MOV5', 'PR7', 'ENTRADA', 120, '2025-01-15', 'Compra proveedor'),
('MOV6', 'PR10', 'ENTRADA', 60, '2024-03-20', 'Nuevo lote'),
('MOV7', 'PR8', 'ENTRADA', 20, '2024-03-10', 'Stock limitado'),
('MOV8', 'PR5', 'SALIDA', 1, '2024-04-25', 'Venta ord_8'),
('MOV9', 'PR7', 'SALIDA', 4, '2025-04-12', 'Venta ord_7'),
('MOV10', 'PR8', 'SALIDA', 2, '2024-05-10', 'Venta ord_9');

INSERT INTO Empleado (id_empleado, nombre, apellido, cargo, correo, salario) VALUES
('EMP1', 'Pedro', 'Ruiz', 'Cajero', 'pedror@bp.com', 850.00),
('EMP2', 'Carla', 'Gómez', 'Administradora', 'carlag@bp.com', 1200.00),
('EMP3', 'Julio', 'Sáenz', 'Inventario', 'julio.s@bp.com', 950.00),
('EMP4', 'Esther', 'Moreno', 'Ventas', 'estherm@bp.com', 900.00),
('EMP5', 'Diana', 'López', 'Ventas', 'dianal@bp.com', 900.00);