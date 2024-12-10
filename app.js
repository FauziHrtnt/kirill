const ctx = document.getElementById("orbitChart").getContext("2d");
let orbitChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: Array.from({ length: 360 }, (_, i) => i),
        datasets: [
            {
                label: "Orbit Bumi",
                data: generateOrbitData(1),
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

function generateOrbitData(semiMajorAxis) {
    const data = [];
    for (let i = 0; i < 360; i++) {
        const radians = (i * Math.PI) / 180;
        const distance = semiMajorAxis * (1 - 0.0167 * Math.cos(radians)); // simulasi orbit elips sederhana
        data.push(distance);
    }
    return data;
}

function updateChart() {
    const object = document.getElementById("objectSelector").value;
    let semiMajorAxis;

    switch (object) {
        case "earth":
            semiMajorAxis = 1; // AU
            break;
        case "mars":
            semiMajorAxis = 1.52; // AU
            break;
        case "moon":
            semiMajorAxis = 0.00257; // AU
            break;
        case "jupiter":
            semiMajorAxis = 5.2; // AU
            break;
        case "venus":
            semiMajorAxis = 0.72; // AU
            break;
        case "saturn":
            semiMajorAxis = 9.58; // AU
            break;
        case "neptune":
            semiMajorAxis = 30.07; // AU
            break;
        default:
            console.warn(Object "${object}" is not recognized. Using default value.);
            semiMajorAxis = 1;
    }

    orbitChart.data.datasets[0].data = generateOrbitData(semiMajorAxis);
    orbitChart.data.datasets[0].label = Orbit ${capitalize(object)};
    orbitChart.update();
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}
