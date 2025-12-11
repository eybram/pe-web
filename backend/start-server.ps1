#!/usr/bin/env pwsh
# Start PHP built-in server for backend with environment variables loaded from .env
$envFile = Join-Path $PSScriptRoot '.env'
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -and $_ -notmatch '^\s*#') {
            $parts = $_ -split '=', 2
            if ($parts.Length -eq 2) {
                $k = $parts[0].Trim(); $v = $parts[1].Trim();
                # Remove surrounding quotes
                if ($v.StartsWith('"') -and $v.EndsWith('"')) { $v = $v.Substring(1, $v.Length - 2) }
                if ($v.StartsWith("'") -and $v.EndsWith("'")) { $v = $v.Substring(1, $v.Length - 2) }
                [System.Environment]::SetEnvironmentVariable($k, $v, 'Process')
            }
        }
    }
}
$host = $env:SERVER_HOST -or '127.0.0.1'
$port = $env:SERVER_PORT -or '8000'
Write-Host "Starting PHP built-in server on http://$host:$port (Backend)"
php -S $host`:$port -t $PSScriptRoot
