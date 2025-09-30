document.addEventListener('DOMContentLoaded', () => {
    const inputData = document.getElementById('inputData');
    const tombolPreview = document.getElementById('tombolPreview');
    const tombolDownload = document.getElementById('tombolDownload');
    const hasilContainer = document.getElementById('hasilContainer');
    const pesanError = document.getElementById('pesanError');
    let qrCodeInstance = null;

    function generateQR() {
        const data = inputData.value.trim();
        hasilContainer.innerHTML = '';
        pesanError.textContent = '';
        pesanError.className = '';

        if (data === '') {
            pesanError.textContent = 'Error: Input tidak boleh kosong.';
            pesanError.className = 'error-text';
            return;
        }

        try {
            // Buat instance QRCode baru
            qrCodeInstance = new QRCode(hasilContainer, {
                text: data,
                width: 256,
                height: 256,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        } catch (e) {
            if (e.message && e.message.toLowerCase().includes('overflow')) {
                pesanError.textContent = 'Error: Data terlalu panjang untuk dienkode. Coba perpendek teks atau link Anda.';
            } else {
                pesanError.textContent = `Error: Terjadi masalah saat membuat QR code. (${e.message})`;
            }
            pesanError.className = 'error-text';
        }
    }

    tombolPreview.addEventListener('click', (event) => {
        event.preventDefault();
        generateQR();
    });

    tombolDownload.addEventListener('click', (event) => {
        event.preventDefault();

        // 1. Cari elemen gambar QR code yang sudah dibuat
        const qrImage = hasilContainer.querySelector('img');

        // 2. Pastikan QR code sudah ada sebelum mencoba mengunduh
        if (!qrImage) {
            alert('Silakan buat QR code terlebih dahulu dengan menekan tombol "Preview QR".');
            return;
        }

        // 3. Buat elemen link sementara untuk memicu download
        const downloadLink = document.createElement('a');
        downloadLink.href = qrImage.src; // Ambil data gambar dari atribut src
        downloadLink.download = 'qrcode.png'; // Tentukan nama file yang akan diunduh

        // 4. Tambahkan link ke dokumen, klik, lalu hapus kembali
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
});