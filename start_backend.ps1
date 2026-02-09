$ErrorActionPreference = "Stop"

Write-Host "Checking for Maven..."
$mavenUrl = "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip"
$installDir = "$PSScriptRoot\tools"
$mavenDir = "$installDir\apache-maven-3.9.6"
$mavenBin = "$mavenDir\bin\mvn.cmd"

# 1. Check if Maven is already downloaded
if (-not (Test-Path $mavenBin)) {
    Write-Host "Maven not found. Downloading..."
    
    # Create tools directory
    if (-not (Test-Path $installDir)) {
        New-Item -ItemType Directory -Force -Path $installDir | Out-Null
    }

    # Download
    $zipPath = "$installDir\maven.zip"
    Invoke-WebRequest -Uri $mavenUrl -OutFile $zipPath
    
    Write-Host "Extracting Maven..."
    Expand-Archive -Path $zipPath -DestinationPath $installDir -Force
    
    # Cleanup zip
    Remove-Item $zipPath
    
    Write-Host "Maven installed successfully!"
} else {
    Write-Host "Maven found!"
}

# 2. Run the Backend
Write-Host "Starting Spring Boot Application..."
Set-Location "$PSScriptRoot\backend"
& $mavenBin spring-boot:run
