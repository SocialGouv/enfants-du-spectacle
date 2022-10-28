import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";
import LayoutHome from "src/components/Layout";

const Page: React.FC = () => {
  const canvasEl = useRef(null);

  const colors = {
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const dossiersIn = [5, 7, 39, 98, 91, 86, 60];

    const labels = [
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Septembre",
      "Octobre",
      "Novembre",
    ];
    const data = {
      datasets: [
        {
          backgroundColor: gradient,
          borderColor: colors.purple.default,
          borderWidth: 2,
          data: dossiersIn,
          fill: true,
          label: "Nombre de dossiers traités sur la plateforme",
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3,
        },
      ],
      labels: labels,
    };
    const config = {
      data: data,
      type: "line",
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <LayoutHome windowTitle="Statistiques">
      <div className="App">
        <span>Statistiques Enfants du spectacle</span>
        <canvas id="myChart" ref={canvasEl} height="100" />
      </div>
    </LayoutHome>
  );
};

export default Page;
