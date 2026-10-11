
import { readLocalJson } from "./storage.js";

const PROGRESS_CHART = document.querySelector("#progress-chart");

let lineChart;

export function fillChart() {
    const TESTS = readLocalJson("tests", []);

    TESTS.sort((a, b) => a.endTime - b.endTime);

    const labels = TESTS.map((test) =>
        new Date(test.endTime).toLocaleDateString("en-GB")
    );

    const yValues = TESTS.map((test) => test.wpm);

    if (lineChart) {
        lineChart.destroy();
    };

    lineChart = new Chart(PROGRESS_CHART, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "WPM",
                data: yValues,
                borderColor: "#2F5D8A",
                backgroundColor: "#2F5D8A",
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: "Words per minute (WPM)"
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: (items) => {
                            const index = items[0].dataIndex;
                            return `Test ${index + 1} — ${labels[index]}`;
                        },
                        label: (context) => `${context.parsed.y} WPM`
                    }
                }
            }
        }
    });
};