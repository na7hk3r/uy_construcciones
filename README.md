# UY Construcciones

Landing page moderna y estática para UY Construcciones, empresa constructora uruguaya con más de 20 años de experiencia en obra civil, construcción llave en mano e infraestructura.

## Stack

- HTML semántico
- Tailwind CSS (Play CDN) con configuración de diseño personalizada
- Google Fonts (Manrope, Space Grotesk)
- Material Symbols (íconos)
- JavaScript vanilla (menú móvil, navegación activa, botón volver arriba, formulario de contacto)

## Deploy

Sitio estático publicado en GitHub Pages con CNAME `www.uyconstrucciones.com.uy`.

## Estructura

```
index.html          — página completa (CDN + configuración inline + script inline)
assets/images/      — fotografías reales de obra y favicon
```

## Formulario de contacto

El formulario no envía datos a un servidor: arma un mensaje prefijado con los datos cargados y lo abre en WhatsApp (`wa.me/598094172582`) en una pestaña nueva, mostrando una confirmación en la página.

## Datos de contacto

Los datos reales de contacto y redes sociales viven en la sección CONTACTO de `index.html`: teléfono 094 172 582, correos `construccionesuy1@gmail.com` e `info@uyconstrucciones.com.uy`, Instagram @Uy_construcciones2024 y Facebook UY Construcciones.