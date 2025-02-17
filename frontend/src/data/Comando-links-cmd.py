Rodar no powershelll
# Lista de URLs das imagens
$urls = @(
  "https://grifepetrova.com/assets/cache_image/products/986/cultura_400x566_272.jpg"


)

# Diretório de destino para as imagens
$destDir = "C:\ImagensVestidos"

# Criar diretório se não existir
if (!(Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir
}

# Baixar cada imagem
$index = 1
foreach ($url in $urls) {
    $fileName = "origem_$index.jpg"
    $filePath = Join-Path -Path $destDir -ChildPath $fileName
    Invoke-WebRequest -Uri $url -OutFile $filePath
    Write-Host "Baixado: $fileName"
    $index++
}

Write-Host "Todas as imagens foram baixadas para $destDir"
