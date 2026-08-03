param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectRoot
)

$cleanProjectRoot = ($ProjectRoot -replace '^[\s''"]+|[\s''"]+$', '').Trim()
try {
    $root = [IO.Path]::GetFullPath($cleanProjectRoot).TrimEnd('\')
} catch {
    $root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..')).TrimEnd('\')
}
$markers = @('server.ts', 'worker.ts', 'vite', 'concurrently')

Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
    Where-Object {
        $process = $_
        if (-not $process.CommandLine) { return $false }
        $hasMarker = $markers | Where-Object { $process.CommandLine.Contains($_) }
        $process.Name -match '^(node|cmd|powershell)(\.exe)?$' -and
        $process.CommandLine -and
        $process.CommandLine.Contains($root) -and
        $hasMarker
    } |
    ForEach-Object {
        Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
    }

Start-Sleep -Milliseconds 800
