package com.marcos.finanzas_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // Le dice a Spring que esta clase contiene configuración del sistema
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permitimos CORS en todas las rutas de nuestra API
        registry.addMapping("/**")
                // Aquí indicamos quién tiene permiso para llamar a la API
                // El 5500 es el puerto típico del "Live Server" de VS Code
                .allowedOrigins("http://127.0.0.1:5500", "http://localhost:5500", "https://marcosromadev.github.io")
                // Métodos permitidos
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // Permitimos cualquier cabecera (necesario para JSON)
                .allowedHeaders("*");
    }
}
