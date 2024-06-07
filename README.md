# NUTROPIA 
## [Abre la app!](https://nutropia.netlify.app)

![App Logo](https://nutropia.netlify.app/assets/logopeque-DDSpl9Xh.png)

## Description
The APP for your nutrition consultation. Manage medical appointments, messages and patient lists quickly and easily.

#### [Client](https://github.com/MDasier/client-nutropia)
#### [Server](https://github.com/MDasier/server-nutropia)

## Technologies & Libraries used

HTML, CSS, Javascript, React, Axios, React Context, Bootstrap, React-Calendar, Cloudinary, Nodemailer, MondoDB, Express, Node, Mongoose...

## Backlog Functionalities

Future tech-funcionability: Implement 'Socket.io' for instant messages.

# Server Structure

## Models

User model

```javascript
  {
    email: {
      type: String,
      required: [true, 'Campo Email es obligatorio.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Campo Password es obligatorio.']
    },
    username: {
      type: String,
      required: [true, 'Campo Username es obligatorio.'],
      unique: true
    },
    role: {
      type: String,
      enum: ['paciente','nutri','admin','invitado'],
      lowercase: true,
      default: "invitado"
    },
    nutricionista:{
      type: Schema.Types.ObjectId, 
      ref:"User"
    },
    imageUrl: {
      type: String
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
```

Alimento model

```javascript
 {
    nombre: {
      type: String
    },
    categoria: {
      type: String,
      enum: ['lacteos','hortaliza-verdura','fruta-zumo','cereales-derivados','alimentos-proteicos','alimentos-grasos','azucares-dulces'],
      lowercase: true
    },
    medida: {
      type: String
    },
    energiaKCAL: {
      type: String
    },
    HC: {
      type: String
    },
    grasas: {
      type: String
    },
    proteinas: {
      type: String
    }


  }
```
Messages model

```javascript
 {
    emisor: {
      type: Schema.Types.ObjectId, 
      ref:"User"
    },
    receptor: {
      type: Schema.Types.ObjectId, 
      ref:"User"
    },
    texto: {
      type: String
    },
    leido: {
      type: Boolean,
      default:false
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
```

Citas model

```javascript
  {
    estado: {
      type: String,
      enum: ['pendiente','realizada'],
      default:"pendiente"
    },
    fecha: {
      type: Date
    },
    nutricionista: {
      type: Schema.Types.ObjectId, 
      ref:"User"
    },
    paciente: {
      type: Schema.Types.ObjectId,
      ref:"User"
    }
  }
```


Diet model (test)

```javascript
const menuDiarioSchema = new Schema({
  desayuno: { type: String },
  almuerzo: { type: String },
  comida: { type: String },
  merienda: { type: String },
  cena: { type: String }
})

const menuSemanalSchema = new Schema({
  lunes: { type: Schema.Types.Map,
    of: menuDiarioSchema
  },
  martes: { type: Schema.Types.Map,
    of: menuDiarioSchema
  },
  miercoles: { type: Schema.Types.Map,
    of: menuDiarioSchema
  },
  jueves: { type: Schema.Types.Map,
    of: menuDiarioSchema
  },
  viernes: { type: Schema.Types.Map,
    of: menuDiarioSchema
  },
  sabado: { type: Schema.Types.Map,
    of: menuDiarioSchema
  },
  domingo: { type: Schema.Types.Map,
    of: menuDiarioSchema
  }
})

const dietaSchema = new Schema(
  {
    tipo: {
      type: [String],
      enum: ['low-carb','lactose-free']
    },
    menuSemana1: {
      type: Schema.Types.Map,
      of: menuSemanalSchema
    },
    menuSemana2: {
      type: Schema.Types.Map,
      of: menuSemanalSchema
    },
    recomendacion: {
      type: String
    },
    nutricionista: {
      type: Schema.Types.ObjectId, 
      ref:"User"
    },
    planNutricional: {
      type: Schema.Types.ObjectId,
      ref:"Plan"
    }
  }
```

## API Endpoints (backend routes)

## AUTH ROUTES
### // POST "/api/auth/signup" => REQ {username, email, password}
### // POST "/api/auth/login" => REQ {email, password}
### // GET "/api/auth/verify" =>
### // GET "/api/auth/pacientes" (In the future: "/api/pacientes")=> 

## USER ROUTES
### //GET "/api/usuarios/:role" => All the users
### //PATCH "/api/usuarios/:userId/:newRole" => Edit the 'role' of a user

## FOOD ROUTES
### //GET "/api/alimentos" => All foods
### //GET "/api/alimentos/:nombre" => One food by name

## DATES ROUTES
### //GET "/api/citas/:role"=> 
### //GET "/api/citas/:role/:fecha"=> 
### //POST "/api/citas/nueva-cita"=> Crear cita
### //PATCH "/api/citas/cita-realizada"=> Crear cita

## MESSAGES ROUTES
### //GET "/api/mensajes/enviados" =>
### //GET "/api/mensajes/recibidos" =>
### //GET "/api/mensajes/nuevos" =>
### //POST "/api/mensajes/nuevo-mensaje" =>
### //POST "/api/mensajes/mensaje-leido" =>

## PASSWORD RESTET ROUTES
### POST "/api/password/forget-password" =>
### POST "/api/password/reset-password/:token" =>

## PERFIL ROUTES
### // GET "/api/perfil/:userId" => Get data from user-profile
### // PATCH "/api/perfil/:userId" => Edit username
### // PATCH "/api/perfil/foto-perfil" => Edit profile-image

## UPLOAD ROUTES(Cloudinary)
### POST "/api/upload" => To upload images to cloudinary folder


## Links
### Project

[Repository Link Client]([www.your-github-url-here.com](https://github.com/MDasier/client-nutropia))

[Repository Link Server]([www.your-github-url-here.com](https://github.com/MDasier/server-nutropia))

[Deploy Link]([www.your-deploy-url-here.com](https://nutropia.netlify.app))
