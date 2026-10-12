
import { readLocalJson } from "./storage.js";

const PROGRESS_CHART = document.querySelector("#progress-chart");

let lineChart;

export function fillChart() {
    const STYLES = getComputedStyle(document.body);                    // changed: read the theme
    const ACCENT = STYLES.getPropertyValue("--accent-color").trim();
    const MUTED = STYLES.getPropertyValue("--muted-color").trim();
    const BORDER = STYLES.getPropertyValue("--border-color").trim();

    const IS_MOBILE = window.matchMedia("(max-width: 600px)").matches;   // changed

    const ALL_TESTS = readLocalJson("tests", []);
    const SORTED = [...ALL_TESTS].sort((a, b) => a.endTime - b.endTime);   // changed: a copy
    const VISIBLE = SORTED.slice(IS_MOBILE ? -10 : -30);                   // changed: latest only
    const OFFSET = SORTED.length - VISIBLE.length;

    const labels = VISIBLE.map((test) =>
        new Date(test.endTime).toLocaleDateString("en-GB")
    );

    const yValues = VISIBLE.map((test) => test.wpm);

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
                borderColor: ACCENT,                   // changed
                backgroundColor: ACCENT,               // changed
                pointRadius: IS_MOBILE ? 3 : 4,        // changed
                pointHoverRadius: 6,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "nearest", intersect: false },   // changed
            scales: {
                x: {
                    ticks: { display: false },
                    grid: { display: false },          // changed
                    title: { display: false }
                },
                y: {
                    beginAtZero: false,
                    ticks: { color: MUTED, maxTicksLimit: 6 },    // changed
                    grid: { color: BORDER },                      // changed
                    title: {
                        display: !IS_MOBILE,                      // changed
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
                            return `Test ${OFFSET + index + 1} — ${labels[index]}`;   // changed
                        },
                        label: (context) => `${context.parsed.y} WPM`
                    }
                }
            }
        }
    });
};