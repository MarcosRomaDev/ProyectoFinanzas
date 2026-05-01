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