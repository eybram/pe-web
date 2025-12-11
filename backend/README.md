# Backend API (PHP)

This project includes simple PHP endpoints under `backend/api/` which depend on `backend/db.php` to connect to your SQL server.

Development steps:

1. Set environment variables for DB connection (example, PowerShell):

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
  {
    "id_cliente": "CLI-001",
    "items": [{"id_producto": "PROD-1","cantidad":1,"precio_unitario":20.0}],
    "metodo_pago": "tarjeta"
  }
