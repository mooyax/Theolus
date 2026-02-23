#!/usr/bin/env pwsh
# Remove local vi.mock('three', ...) blocks from all test files
# This script removes redundant local mocks that conflict with global setup.js

$testDir = "src\tests"
$testFiles = Get-ChildItem -Path $testDir -Filter "*.test.js" -File

$totalFiles = 0
$modifiedFiles = 0

Write-Host "🔍 スキャン中: $($testFiles.Count) 個のテストファイル..." -ForegroundColor Cyan

foreach ($file in $testFiles) {
    $totalFiles++
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Pattern to match vi.mock('three', ...) blocks
    # Matches: vi.mock('three', or "three", with optional async () => { ... });
    $pattern = "vi\.mock\(['""]three['""][\s\S]*?\}\);(\r?\n)*"
    
    if ($content -match $pattern) {
        Write-Host "  📝 修正: $($file.Name)" -ForegroundColor Yellow
        
        # Remove the mock block
        $newContent = $content -replace $pattern, ""
        
        # Also remove the comment line if it says "// Mock dependencies" or "Mock THREE"
        $newContent = $newContent -replace "\/\/\s*Mock dependencies(\r?\n)*", ""
        $newContent = $newContent -replace "\/\/\s*Mock THREE(\r?\n)*", ""
        
        # Clean up multiple consecutive blank lines (reduce to max 2)
        $newContent = $newContent -replace "(\r?\n){4,}", "`r`n`r`n`r`n"
        
        # Write back
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        $modifiedFiles++
    }
}

Write-Host ""
Write-Host "✅ 完了!" -ForegroundColor Green
Write-Host "   合計: $totalFiles ファイル" -ForegroundColor White
Write-Host "   修正: $modifiedFiles ファイル" -ForegroundColor Green
Write-Host "   変更なし: $($totalFiles - $modifiedFiles) ファイル" -ForegroundColor Gray
