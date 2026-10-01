$papPreviewDirectory = 'C:\Users\licht\Documents\Codex\2026-10-01\er\work\emberstone-chatbot\papsmp-website\dist'
$papPython = 'C:\Users\licht\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
if (-not (Test-Path -LiteralPath "$papPreviewDirectory\index.html")) { throw 'Die gebaute PAP-Vorschau wurde nicht gefunden.' }
$papConnection = [System.Net.Sockets.TcpClient]::new()
try { $papConnection.Connect('127.0.0.1',19083); $papAlreadyRunning = $true }
catch { $papAlreadyRunning = $false }
finally { $papConnection.Dispose() }
if (-not $papAlreadyRunning) {
  if (-not (Test-Path -LiteralPath $papPython)) { throw 'Die vorhandene Python-Laufzeit wurde nicht gefunden.' }
  Start-Process -FilePath $papPython -WorkingDirectory $papPreviewDirectory -ArgumentList @('-m','http.server','19083','--bind','127.0.0.1') -WindowStyle Hidden
}
Start-Process 'http://127.0.0.1:19083/?v=21'
