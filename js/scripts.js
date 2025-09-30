import { Konverter } from './konverter.js';

document.addEventListener('DOMContentLoaded', () => {
    const k = new Konverter();
    const inputAngka = document.getElementById('inputAngka');
    const tombolKonversi = document.getElementById('tombolKonversi');
    const hasilTeks = document.getElementById('hasilKonversi'); // Ambil elemen span

    tombolKonversi.addEventListener('click', (event) => {
        event.preventDefault();
        const masukan = inputAngka.value.trim();

        hasilTeks.textContent = '';
        hasilTeks.className = '';

        if (masukan === '') {
            hasilTeks.textContent = "Masukkan angka terlebih dahulu.";
            hasilTeks.className = 'error-text';
            return;
        }

        try {
            const angka = parseInt(masukan, 10);
            if (isNaN(angka)) {
                hasilTeks.textContent = "Input tidak valid. Harap masukkan angka bulat.";
                hasilTeks.className = 'error-text';
                return;
            }
            const hasil = k.konversi(angka);
            hasilTeks.textContent = `Hasil: ${hasil}`;
            hasilTeks.className = 'text';
        } catch (e) {
            hasilTeks.textContent = `Error: ${e.message}`;
            hasilTeks.className = 'error-text';
        }
    });
});

