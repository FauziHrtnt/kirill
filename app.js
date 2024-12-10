// Inisialisasi Chart.js
const ctx = document.getElementById("orbitChart").getContext("2d");
let orbitChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: Array.from({ length: 360 }, (_, i) => i), // Sudut dari 0 hingga 360 derajat
        datasets: [
            {
                label: "Orbit Bumi",
                data: generateOrbitData(1), // Data awal untuk orbit Bumi
                borderColor: "blue",
                fill: false,
                tension: 0.1,
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Sudut Orbit (derajat)",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Jarak dari Pusat (AU)",
                },
            },
        },
    },
});

// Fungsi untuk menghasilkan data orbit elips
function generateOrbitData(semiMajorAxis) {
    const data = [];
    for (let i = 0; i < 360; i++) {
        const radians = (i * Math.PI) / 180;
        const distance = semiMajorAxis * (1 - 0.0167 * Math.cos(radians)); // Persamaan elips
        data.push(distance);
    }
    return data;
}

// Fungsi untuk memperbarui chart berdasarkan planet yang dipilih
function updateChart() {
    const object = document.getElementById("objectSelector").value;
    let semiMajorAxis;

    // Menentukan sumbu semi-mayor berdasarkan pilihan pengguna
    switch (object) {
        case "earth":
            semiMajorAxis = 1;
            break;
        case "mars":
            semiMajorAxis = 1.52;
            break;
        case "moon":
            semiMajorAxis = 0.00257;
            break;
        case "jupiter":
            semiMajorAxis = 5.2;
            break;
        case "venus":
            semiMajorAxis = 0.72;
            break;
        case "saturn":
            semiMajorAxis = 9.58;
            break;
        case "neptune":
            semiMajorAxis = 30.07;
            break;
        default:
            semiMajorAxis = 1;
    }

    // Perbarui data dan label chart
    orbitChart.data.datasets[0].data = generateOrbitData(semiMajorAxis);
    orbitChart.data.datasets[0].label = `Orbit ${capitalize(object)}`;
    orbitChart.update();
}

// Fungsi untuk kapitalisasi huruf pertama string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
