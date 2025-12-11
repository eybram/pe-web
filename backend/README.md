# Backend API (PHP)

This project includes simple PHP endpoints under `backend/api/` which depend on `backend/db.php` to connect to your SQL server.

Development steps:

1. Set environment variables for DB connection (example, PowerShell). You can either export environment variables directly, or copy `.env.example` to `.env` and edit it with your credentials.

```powershell
$env:DB_DRIVER = "sqlsrv"
$env:DB_HOST = "localhost"
$env:DB_PORT = "1433"
$env:DB_NAME = "BrokenPocket"
$env:DB_USER = "sa"
$env:DB_PASS = "YourPassword"
```

2. Start a simple PHP server (from the `backend` folder):

```powershell
cd backend
php -S localhost:8000
```

This will serve endpoints under `http://localhost:8000/api/*` (e.g. `http://localhost:8000/api/productos.php`).

Notes:
- The PHP scripts allow all origins (CORS wildcard) for local development; in production use a stricter CORS policy.
- `db.php` supports SQL Server (`sqlsrv`) and MySQL (`mysql`) drivers.
- `create_orden.php` expects JSON:
  Additional helpers:
  - `start-server.ps1`: Start the PHP dev server (Windows PowerShell), loads `.env` automatically for convenience.
  - `start-server.sh`: Start the PHP dev server (Unix-like shells), loads `.env` automatically.
  - `test-connection.php`: A small endpoint that verifies `db.php` can connect to your DB and returns a basic status.

  Example `.env` (copy `.env.example` to `.env`):

  ```
  # SQL Server example
  DB_DRIVER=sqlsrv
  DB_HOST=localhost
  DB_PORT=1433
  DB_NAME=BrokenPocket
  DB_USER=sa
  DB_PASS=YourPassword

  # Or MySQL example
  # DB_DRIVER=mysql
  # DB_HOST=127.0.0.1
  # DB_PORT=3306
  # DB_NAME=broken_pocket
  # DB_USER=root
  # DB_PASS=yourpassword
  ```

  Start and test:

  PowerShell:
  ```powershell
  cd backend
  ./start-server.ps1
  # then in a browser, visit http://localhost:8000/test-connection.php
  ```

  Bash:
  ```bash
  cd backend
  ./start-server.sh
  # then in a browser or with curl: curl http://127.0.0.1:8000/test-connection.php
  ```
  {
    "id_cliente": "CLI-001",
    "items": [{"id_producto": "PROD-1","cantidad":1,"precio_unitario":20.0}],
    "metodo_pago": "tarjeta"
  }

Login endpoint:
- `POST /api/login.php` expects JSON `{ "q": "email|cedula|id" }` and returns `{ id_cliente, nombre, apellido, correo }` if a matching client is found. This is a minimal login helper for local dev; it does not verify password.
