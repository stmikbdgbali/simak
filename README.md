# SISTEM INFORMASI AKADEMIK DAN KEUANGAN

## Cara update repositori dari parent

1. git remote add upstream https://github.com/stmikbdgbali/simak.git (cukup sekali, selanjutnya tidak dieksekusi lagi)
2. git fetch upstream
3. git rebase upstream/main
4. git push origin main --force
5. git pull

Catatan: kalau `main` tidak jalan ganti pakai `master`
