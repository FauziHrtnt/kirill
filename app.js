document.addEventListener("DOMContentLoaded", () => {
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
});
