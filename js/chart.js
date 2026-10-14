import { readLocalJson } from "./storage.js";

const PROGRESS_CHART = document.querySelector("#progress-chart");

let lineChart;

function getChartData() {
    const ALL_TESTS = readLocalJson("tests", []);
    const SORTED = [...ALL_TESTS].sort((a, b) => a.endTime - b.endTime);
    const VISIBLE = SORTED.slice(-30);
    const OFFSET = SORTED.length - VISIBLE.length;

    const labels = VISIBLE.map((test) =>
        new Date(test.endTime).toLocaleDateString("en-GB")
    );

    const yValues = VISIBLE.map((test) => test.wpm);

    return { OFFSET, labels, yValues };
}

export function fillChart() {
    const { OFFSET, labels, yValues } = getChartData();

    const STYLES = getComputedStyle(document.body);
    const ACCENT = STYLES.getPropertyValue("--accent-color").trim();
    const MUTED = STYLES.getPropertyValue("--muted-color").trim();
    const BORDER = STYLES.getPropertyValue("--border-color").trim();

    if (lineChart) {
        lineChart.destroy();
    }

    lineChart = new Chart(PROGRESS_CHART, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "WPM",
                data: yValues,
                borderColor: ACCENT,
                backgroundColor: ACCENT,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "nearest", intersect: false },
            scales: {
                x: {
                    ticks: { display: false },
                    grid: { display: false },
                    title: { display: false }
                },
                y: {
                    beginAtZero: false,
                    ticks: { color: MUTED, maxTicksLimit: 6 },
                    grid: { color: BORDER },
                    title: {
                        display: true,
                        text: "Words per minute (WPM)",
                        color: MUTED
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: (items) => {
                            const index = items[0].dataIndex;
                            return `Test ${OFFSET + index + 1} — ${labels[index]}`;
                        },
                        label: (context) => `${context.parsed.y} WPM`
                    }
                }
            }
        }
    });
}