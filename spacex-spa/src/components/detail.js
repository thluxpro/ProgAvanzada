let launches = [];

async function getLaunches() {
  if (launches.length === 0) {
    const res = await fetch("https://api.spacexdata.com/v5/launches");
    launches = await res.json();
  }
  return launches;
}

export async function renderDetail(container, id) {
  const data = await getLaunches();
  const launch = data.find(l => l.id === id);

  // --- Formatear fallas ---
  let fallas = "Ninguna";
  if (launch.failures.length > 0) {
    fallas = launch.failures
      .map(f => {
        return `
          <li>
            ⏱️ Tiempo: ${f.time ?? "-"}s,
            🚀 Altura: ${f.altitude ?? "-"},
            ❌ Motivo: ${f.reason}
          </li>
        `;
      })
      .join("");
    fallas = `<ul>${fallas}</ul>`;
  }

  // --- Renderizado ---
  container.innerHTML = `
    <div class="detail">
      <img src="${launch.links.patch.large || launch.links.patch.small || ''}" 
           alt="${launch.name}" />
      <h2>${launch.name}</h2>
      <p><b>Número de vuelo:</b> ${launch.flight_number}</p>
      <p><b>Fecha:</b> ${new Date(launch.date_utc).toLocaleString()}</p>
      <p><b>Detalles:</b> ${launch.details || "Sin detalles"}</p>
      <p><b>Fallas:</b> ${fallas}</p>
      <button onclick="window.location.hash='#/home'">⬅ Volver</button>
    </div>
  `;
}

