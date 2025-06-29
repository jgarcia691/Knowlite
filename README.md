# Knowlite

## Idea
Knowlite es una aplicación web que permite a los usuarios subir archivos de audio en formato MP3, transcribirlos automáticamente usando inteligencia artificial y guardar, consultar o eliminar las transcripciones generadas. Además, ofrece la funcionalidad de generar resúmenes automáticos de las transcripciones mediante IA.

## Tecnologías usadas
- **React** (Vite) — Frontend moderno y rápido
- **JavaScript** — Lenguaje principal del frontend
- **Vite** — Bundler y servidor de desarrollo
- **Assembly AI** - API utilizada para la generacion de transcripciones impulsadas por IA
- **Context y Hooks** — Manejo de estado global y lógica reutilizable
- **Fetch API** — Comunicación con el backend
- **jsPDF** — Descarga de transcripciones en PDF
- **Vercel** — Hosting del backend y despliegue

## Estructura del proyecto
```
Knowlite/
├── public/                  # Archivos estáticos y favicon
├── src/                     # Código fuente principal
│   ├── api/                 # Lógica de comunicación con APIs externas
│   │   └── knowLiteApi.js   # Contiene la integración con la API de AssemblyAI para transcripción de audio
│   ├── components/          # Componentes reutilizables y páginas
│   │   ├── auth/            # Páginas de autenticación y perfil de usuario
│   │   ├── common/          # Componentes comunes (modales, navbar, footer)
│   │   ├── landing/         # Secciones de la página de inicio
│   │   ├── upload/          # Componentes relacionados con la subida y gestión de archivos
│   ├── context/             # Contextos globales (autenticación)
│   ├── hooks/               # Custom hooks reutilizables
│   ├── App.jsx              # Componente raíz de la app
│   ├── App.css              # Estilos globales
│   └── main.jsx             # Punto de entrada de React
├── package.json             # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
└── README.md                # Documentación del proyecto
```

## Instrucciones para ejecutar
1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repo>
   cd Knowlite
   ```
2. **Instala las dependencias:**
   ```bash
   npm install
   ```
3. **Ejecuta la aplicación en desarrollo:**
   ```bash
   npm run dev
   ```
4. **Abre en tu navegador:**
   Visita [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal)

## Funcionalidades destacadas
- Subida de archivos de audio MP3 y transcripción automática por IA
- Edición y guardado de transcripciones con nombre personalizado
- Listado de archivos guardados por usuario
- Visualización de detalles y descarga de transcripción en PDF
- Eliminación de archivos guardados
- Generación de resumen automático de la transcripción mediante IA
- Interfaz responsive y moderna
- Gestión de usuarios: registro, login, perfil y logout

## Despliegue
Puedes probar la aplicación en producción aquí: [https://knowlite.vercel.app](https://knowlite.vercel.app)
