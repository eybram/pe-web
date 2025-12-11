<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

class Database {
    private $serverName;
    private $connectionOptions;
    private $conn;
    
    public function __construct() {
        // Configuración para SQL Server
        $this->serverName = "windows17";  // O tu instancia
        // Para SQL Server autenticación Windows:
        $this->connectionOptions = array(
            "Database" => "BrokenPocket",
            "Trusted_Connection" => "yes"
        );
        
        // $this->connectionOptions = array(
        //     "Database" => "nombre_base_datos",
        //     "Trusted_Connection" => "yes"
        // );
    }
    
    public function connect() {
        try {
            // Usando sqlsrv (procedural)
            $this->conn = sqlsrv_connect($this->serverName, $this->connectionOptions);
            
            if ($this->conn === false) {
                die(json_encode([
                    'error' => true,
                    'message' => 'Error de conexión: ' . print_r(sqlsrv_errors(), true)
                ]));
            }
            
            return $this->conn;
            
        } catch (Exception $e) {
            die(json_encode([
                'error' => true,
                'message' => 'Excepción: ' . $e->getMessage()
            ]));
        }
    }
    
    // Método alternativo con PDO_SQLSRV
    public function connectPDO() {
        try {
            $server = $this->serverName;
            $database = $this->connectionOptions['Database'];
            
            // Cadena de conexión PDO
            $dsn = "sqlsrv:Server=$server;Database=$database";
            
            $this->conn = new PDO($dsn, 
                $this->connectionOptions['Uid'] ?? null, 
                $this->connectionOptions['PWD'] ?? null
            );
            
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            
            return $this->conn;
            
        } catch (PDOException $e) {
            die(json_encode([
                'error' => true,
                'message' => 'Error PDO: ' . $e->getMessage()
            ]));
        }
    }
    
    public function close() {
        if ($this->conn) {
            sqlsrv_close($this->conn);  // Para sqlsrv
            // O para PDO: $this->conn = null;
        }
    }
    
    // Ejecutar consulta y devolver resultados
    public function executeQuery($sql, $params = []) {
        $stmt = sqlsrv_query($this->conn, $sql, $params);
        
        if ($stmt === false) {
            return [
                'error' => true,
                'message' => print_r(sqlsrv_errors(), true)
            ];
        }
        
        $results = [];
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $results[] = $row;
        }
        
        sqlsrv_free_stmt($stmt);
        
        return $results;
    }
    
    // Ejecutar procedimiento almacenado
    public function executeStoredProcedure($procedureName, $params = []) {
        $sql = "{call $procedureName (" . str_repeat('?,', count($params)-1) . "?)}";
        return $this->executeQuery($sql, $params);
    }
}
?>