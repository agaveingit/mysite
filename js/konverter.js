class Konverter {
    constructor() {
        this.SATUAN = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan'];
        this.BELASAN = ["sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas",
            "enam belas", "tujuh belas", "delapan belas", "sembilan belas"
        ];
        this.ANGKA_LEVEL_TINGGI = [
            [1000000000000, "triliun"],
            [1000000000, "miliar"],
            [1000000, "juta"],
            [1000, "ribu"],
        ];
    }

    puluhan(angka) {
        if (angka >= 0 && angka < 10) {
            return `${this.SATUAN[angka]}`;
        }
        if (angka >= 10 && angka < 20) {
            return `${this.BELASAN[angka - 10]}`;
        }
        const puluh = Math.floor(angka / 10);
        const sisa = angka % 10;
        if (sisa === 0) {
            return `${this.SATUAN[puluh]} puluh`;
        }
        return `${this.SATUAN[puluh]} puluh ${this.SATUAN[sisa]}`;
    }

    ratusan(angka) {
        if (angka < 100) {
            return this.puluhan(angka);
        }

        const ratus = Math.floor(angka / 100);
        const sisa = angka % 100;

        const awalan = ratus === 1 ? "seratus" : `${this.SATUAN[ratus]} ratus`;

        if (sisa === 0) {
            return awalan;
        }
        return `${awalan} ${this.puluhan(sisa)}`;
    }

    konversi(angka) {
        if (typeof angka !== 'number' || isNaN(angka)) {
            throw new TypeError("Input harus berupa angka.");
        }

        if (angka < 0) {
            return `minus ${this.konversi(-angka)}`;
        }

        if (angka === 0) {
            return "nol";
        }

        if (angka < 1000) {
            return this.ratusan(angka);
        }

        for (const [nilai, nama] of this.ANGKA_LEVEL_TINGGI) {
            if (angka >= nilai) {
                const depan = Math.floor(angka / nilai);
                const sisa = angka % nilai;

                let awalan;
                if (nilai === 1000 && depan === 1) {
                    awalan = "seribu";
                } else {
                    awalan = `${this.konversi(depan)} ${nama}`;
                }

                if (sisa === 0) {
                    return awalan;
                }
                return `${awalan} ${this.konversi(sisa)}`;
            }
        }
        return "";
    }
}

export { Konverter };