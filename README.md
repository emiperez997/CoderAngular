# Primera Entrega - Curso Angular

## Aspectos a incluir

- [ x ] Crear proyecto con Angular CLI
- [ x ] Crear un componente `layout` que incluya un sidenav y toolbar
- [ x ] Componentes Lista de Alumnos (Students)
  - [ x ] Ordenamiento de columnas
  - [ x ] Filtrado de columnas
- [ x ] Componente para ABM de Alumnos (Students)
  - [ x ] Formulario reactivo
- [ x ] Crear servicio de Alumnos y mostrarlos en una tabla de Angular Material
- [ x ] Crear un pipe personalizado para mostrar el nombre junto al apellido de los alumnos
- [ x ] Crear un pipe personalizado para el estado
- [ x ] Crear una directiva personalizada para cabeceras o títulos que tenga la letra con un tamaño de 20px
- [ x ] Crear un pipe para el estado (muestra el texto de acuerdo al estado) y una directiva (muestra un color de acuerdo al estado)
- [ x ] Subir el proyecto a GitHub

# Segunda Entrega

## Aspectos a incluir

- [ x ] Creación de servicios

  - [ x ] Que devuelvan un observable con datos mockeados
  - [ x ] ABM de las entidades

- [ x ] Uso de routing
  - [ x ] Utilizar la navegación del menú lateral
- [ x ] Uso de Angular Material
- [ x ] Modularizar la aplicación en `app`, `core`, `sharedd` y `features`

# Tercera Entrega

## Aspectos a incluir

- [ x ] Lazy loading y rutas child
- [ x ] Guards y Autenticación de usuarios
- [ x ] Peticiones a una API
- [ x ] Testing unitarios
  - [ x ] Al menos un archivo de test que testee un servicio
  - [ x ] Al menos un test que testee un componente

# Entrega Final

## Aspectos a incluir

- [ x ] Aplicar Redux global y por feature
  - [ x ] Crear store para el servicio de auth
  - [ x ] Crear store para cada feature e implementarlos
    - [ x ] Students
    - [ x ] Teachers
    - [ x ] Inscriptions
    - [ x ] Courses
- [ x ] Crear vistas de detalle
  - [ x ] Para Alumnos
  - [ x ] Para Profesores
  - [ x ] Para Cursos
- [ ] Aplicar manejo de roles
  - [ x ] Crear la tabla para usuarios (Admin)
  - [ x ] Crear servicios para usuarios (Admin)
  - [ ] Que solo el coordinador pueda hacer un crud en todas las entidadse menos usuarios
  - [ x ] Crear un perfil en el home
  - [ x ] En la barra de navegación, mostrar el nombre del usuario

# Instrucciones

1. Clonar el repositorio

```bash
git clone https://github.com/emiperez997/CoderAngular.git
```

2. Instalar las dependencias

```bash
pnpm install
```

3. Iniciar el proyecto

```bash
ng serve
```

> [!NOTE]
> El servidor backend puede que tarde en arrancar, pero una vez que inicia, funciona todo bien
