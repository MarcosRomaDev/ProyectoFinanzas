CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(20) -- Útil para el frontend más adelante
);

-- 2. Tabla de Transacciones
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type VARCHAR(10) NOT NULL, -- 'INGRESO' o 'GASTO'
    date DATE NOT NULL,
    category_id BIGINT,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (name, color) VALUES ('Sueldo', '#00FF00');
INSERT INTO categories (name, color) VALUES ('Alquiler', '#FF0000');

INSERT INTO transactions (description, amount, type, date, category_id) 
VALUES ('Nómina Marzo', 2000.00, 'INGRESO', '2026-03-01', 1);

INSERT INTO transactions (description, amount, type, date, category_id) 
VALUES ('Pago Alquiler', 800.00, 'GASTO', '2026-03-05', 2);