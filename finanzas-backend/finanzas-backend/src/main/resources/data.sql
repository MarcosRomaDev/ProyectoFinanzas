INSERT INTO categories (name, color) VALUES ('Sueldo', '#00FF00');
INSERT INTO categories (name, color) VALUES ('Alquiler', '#FF0000');

INSERT INTO transactions (description, amount, type, date, category_id) 
VALUES ('Nómina Marzo', 2000.00, 'INGRESO', '2026-03-01', 1);

INSERT INTO transactions (description, amount, type, date, category_id) 
VALUES ('Pago Alquiler', 800.00, 'GASTO', '2026-03-05', 2);