# User Stories - TP Final - Billetera Virtual

## Epic: Autenticación y Registro

### Historia 1: Registro de Usuario
**Como** nuevo usuario,
**quiero** poder crear una cuenta virtual usando mi email y contraseña,
**para** empezar a usar la billetera.

### Historia 2: Inicio de Sesión
**Como** usuario registrado,
**quiero** iniciar sesión con mi email y contraseña,
**para** acceder a mi cuenta virtual.

## Epic: Dashboard y Estado de Cuenta

### Historia 3: Ver Saldo Disponible
**Como** usuario logueado,
**quiero** ver mi saldo disponible,
**para** saber cuánto dinero tengo en mi billetera.

### Historia 4: Ver Historial de Movimientos
**Como** usuario logueado,
**quiero** ver una lista de mis ingresos, gastos y transferencias,
**para** hacer un seguimiento de mis operaciones.

## Epic: Transferencias y Movimientos

### Historia 5: Transferencia P2P
**Como** usuario logueado,
**quiero** enviar dinero a otro usuario mediante su email o ID,
**para** hacer pagos o transferencias personales.

### Historia 6: Recibir Transferencias
**Como** usuario logueado,
**quiero** ver reflejado cuando otro usuario me transfiere dinero,
**para** confirmar que lo he recibido.

## Epic: Integración con Medios Externos (Simulados)

### Historia 7: Cargar Saldo desde Medio Externo
**Como** usuario logueado,
**quiero** simular una carga de saldo desde una tarjeta o cuenta bancaria,
**para** aumentar mi saldo en la billetera.

### Historia 8: Solicitar DEBIN (Simulado)
**Como** usuario logueado,
**quiero** simular una solicitud de DEBIN desde mi cuenta bancaria,
**para** cargar saldo en mi billetera virtual.

## Epic: Navegación y UI Minimalista

### Historia 9: Navegación Simple
**Como** usuario,
**quiero** poder acceder fácilmente desde el menú a las secciones de Saldo, Historial, Transferencia y Carga,
**para** que la experiencia sea ágil y clara.

### Historia 10: Feedback en Operaciones
**Como** usuario,
**quiero** recibir confirmaciones o errores claros luego de realizar una acción (ej: enviar dinero),
**para** saber si fue exitosa o no.

---

> Este set de historias de usuario está pensado para que el front-end pueda implementar un MVP funcional con interfaz simple y concreta, ideal para validar el sistema completo con tests e2e y CI/CD.

