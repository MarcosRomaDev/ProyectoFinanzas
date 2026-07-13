-- Categorías de Gastos
INSERT INTO categories (name, color) VALUES ('Alimentación', '#FF5733');
INSERT INTO categories (name, color) VALUES ('Vivienda', '#3357FF');
INSERT INTO categories (name, color) VALUES ('Transporte', '#FFC300');
INSERT INTO categories (name, color) VALUES ('Suministros', '#33FF57');
INSERT INTO categories (name, color) VALUES ('Ocio', '#C70039');
INSERT INTO categories (name, color) VALUES ('Salud', '#33FFF3');

-- Categorías de Ingresos
INSERT INTO categories (name, color) VALUES ('Nómina', '#2ECC71');
INSERT INTO categories (name, color) VALUES ('Ventas extra', '#27AE60');
INSERT INTO categories (name, color) VALUES ('Otros ingresos', '#1ABC9C');


-- 1. ALIMENTACIÓN (ID 1)
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Compra Carrefour', 85.20, 'GASTO', '2026-05-01', 1);
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Panadería y Fruta', 12.50, 'GASTO', '2026-05-02', 1);
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Cena Telepizza', 24.00, 'GASTO', '2026-04-28', 1);

-- 2. VIVIENDA (ID 2)
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Alquiler Mensual', 900.00, 'GASTO', '2026-05-01', 2);
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Seguro Hogar', 15.00, 'GASTO', '2026-04-15', 2);
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Reparación Grifo', 45.00, 'GASTO', '2026-04-20', 2);

-- 3. TRANSPORTE (ID 3)
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Abono Transporte', 54.00, 'GASTO', '2026-05-01', 3);
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Gasolina Repsol', 60.00, 'GASTO', '2026-04-25', 3);
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Ticket Parking', 4.50, 'GASTO', '2026-05-02', 3);

-- 4. SUMINISTROS (ID 4)
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Disney+', 8.99, 'GASTO', '2026-04-15', 4);
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Spotify Family', 15.99, 'GASTO', '2026-04-20', 4);
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('iCloud Storage', 0.99, 'GASTO', '2026-05-01', 4);

-- 5. OCIO (ID 5)
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Entradas Cine', 18.00, 'GASTO', '2026-04-30', 5);
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Copas con amigos', 35.00, 'GASTO', '2026-05-01', 5);

-- 6. SALUD (ID 6)
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Suscripción Gimnasio', 29.90, 'GASTO', '2026-04-01', 6);

-- 7. NÓMINA (ID 7)
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Nómina Abril', 2200.00, 'INGRESO', '2026-04-30', 7);
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Bonus Productividad', 300.00, 'INGRESO', '2026-04-30', 7);

-- 8. VENTAS EXTRA (ID 8)
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Venta Bicicleta Vieja', 150.00, 'INGRESO', '2026-05-01', 8);
INSERT INTO transactions (description, amount, type, date, category_id) VALUES ('Reembolso Amazon', 45.99, 'INGRESO', '2026-04-28', 8);