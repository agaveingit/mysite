// QR Code Generator
document.addEventListener('DOMContentLoaded', function () {
    const tombolPreview = document.getElementById('tombolPreview');
    const tombolDownload = document.getElementById('tombolDownload');
    const inputData = document.getElementById('inputData');
    const selectFileType = document.querySelector('select[name="file_type"]');
    const hasilContainer = document.getElementById('hasilContainer');
    const pesanError = document.getElementById('pesanError');

    let qrCode = null;

    if (tombolPreview) {
        tombolPreview.addEventListener('click', function () {
            generateQRCode(false);
        });
    }

    if (tombolDownload) {
        tombolDownload.addEventListener('click', function () {
            generateQRCode(true);
        });
    }

    function generateQRCode(download) {
        const data = inputData.value.trim();
        const fileType = selectFileType.value;

        if (!data) {
            showError('Masukkan teks atau URL terlebih dahulu.');
            return;
        }

        // Clear previous QR code and error
        hasilContainer.innerHTML = '';
        pesanError.textContent = '';

        try {
            // Create QR code
            qrCode = new QRCode(hasilContainer, {
                text: data,
                width: 200,
                height: 200,
                colorDark: '#034078',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });

            // If download requested
            if (download) {
                setTimeout(() => {
                    downloadQRCode(fileType);
                }, 500);
            }
        } catch (error) {
            showError('Terjadi kesalahan saat membuat QR code.');
            console.error(error);
        }
    }

    function downloadQRCode(fileType) {
        if (!qrCode) return;

        const canvas = hasilContainer.querySelector('canvas');
        if (!canvas) return;

        if (fileType === 'png') {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } else if (fileType === 'svg') {
            // For SVG, we'd need a more complex implementation
            // For now, we'll show a message
            showError('Fitur download SVG sedang dalam pengembangan.');
        }
    }

    function showError(message) {
        pesanError.textContent = message;
        pesanError.style.color = 'var(--text-error)';
    }

    // Allow Enter key to trigger preview
    if (inputData) {
        inputData.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (tombolPreview) tombolPreview.click();
            }
        });
    }
});