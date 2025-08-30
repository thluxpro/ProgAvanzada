

// Ejercicio 1: Crear un objeto literal para un dispositivo de red
// Crea un objeto literal que represente un router con las siguientes propiedades:
// modelo, marca, puertos, velocidad (en Mbps), y soportaWifi.

const router = {
    modelo: 3320,
    marca: "Tp-link",
    puertos: 4,
    velocidad: "1200Mbps",
    soportaWifi: true,
}
console.log("ejercicio 1:")
console.log(router)

// Ejercicio 2: Array de dispositivos de red Crea un array con 5 dispositivos de 
// red (routers, switches, firewalls, etc.) donde cada uno sea un objeto literal
//  con propiedades como tipo, marca, modelo y precio.

const dispositivosRed = [
{ tipo: "Router", marca: "Cisco", modelo: "1941", precio: 1200 },
{ tipo: "Switch", marca: "TP-Link", modelo: "TL-SG108", precio: 150 },
{ tipo: "Firewall", marca: "Cisco", modelo: "ASA 5506-X", precio: 2500 },
{ tipo: "Access Point", marca: "Ubiquiti", modelo: "UniFi AP AC Pro", precio: 320 },
{ tipo: "Router", marca: "TP-Link", modelo: "Archer C7", precio: 180 }
];
console.log("ejercicio 2:")
console.log(dispositivosRed)

// Ejercicio 3: Dado un array de dispositivos de red, utiliza el método filter() para obtener 
// solo los dispositivos de una marca específica.

const filtro_tplink = dispositivosRed.filter(dispositivo => dispositivo.marca == ("TP-Link"))

console.log("ejercicio 3:")
console.log(filtro_tplink)

// Ejercicio 4: Mapear direcciones IP. Dado un array de servidores con direcciones IP, 
// utiliza el método map() para crear un nuevo array que contenga solo las direcciones IP.

const servidores = [
{ nombre: "Servidor Web", ip: "192.168.1.10", sistema: "Linux" },
{ nombre: "Servidor de Base de Datos", ip: "192.168.1.11", sistema: "Windows" },
{ nombre: "Servidor de Correo", ip: "192.168.1.12", sistema: "Linux" },
{ nombre: "Servidor DNS", ip: "192.168.1.13", sistema: "Linux" },
{ nombre: "Servidor de Archivos", ip: "192.168.1.14", sistema: "Windows" }
];

const mapeoloco = servidores.map(servidor => servidor.ip)

console.log("ejercicio 4:")
console.log(mapeoloco)

// Ejercicio 5: Filtrar y ordenar paquetes de datos. Dado un array de paquetes de datos, filtra 
// aquellos que tengan un tamaño mayor a 1000 bytes y ordénalos de mayor a menor según su prioridad.

const paquetesDatos = [
{ id: 1, origen: "192.168.1.5", destino: "192.168.1.10", tamaño: 1200, prioridad: 3 },
{ id: 2, origen: "192.168.1.7", destino: "192.168.1.12", tamaño: 800, prioridad: 1 },
{ id: 3, origen: "192.168.1.3", destino: "192.168.1.11", tamaño: 1500, prioridad: 5 },
{ id: 4, origen: "192.168.1.8", destino: "192.168.1.14", tamaño: 950, prioridad: 2 },
{ id: 5, origen: "192.168.1.2", destino: "192.168.1.13", tamaño: 2000, prioridad: 4 }
];

const Mayora1000b = paquetesDatos.filter(paq => paq.tamaño >= 1000)
const ordenarasc = Mayora1000b.sort(paq => paq.prioridad)

console.log("ejercicio 5:")
console.log(Mayora1000b)

// Ejercicio 6: Calcular estadísticas de red. Dado un objeto con estadísticas de tráfico 
// de red por hora, calcula el total de datos transferidos y la hora con mayor tráfico.
const traficoRed = {
"08:00": 1250, 
"09:00": 1870,
"10:00": 2100,
"11:00": 1950,
"12:00": 1600,
"13:00": 1300,
"14:00": 1700,
"15:00": 2200,
"16:00": 1800,
"17:00": 1500
};

console.log("ejercicio 6:")
// Total transferido (MB)
const totalMB = Object.values(traficoRed).reduce((acc, mb) => acc + mb, 0);

// Hora con mayor tráfico
const [horaMax, mbMax] = Object.entries(traficoRed).reduce(
  (best, curr) => (curr[1] > best[1] ? curr : best)
);

console.log("Total MB transferidos:", totalMB);
console.log("Hora con mayor tráfico:", horaMax, `(${mbMax} MB)`);

// Ejercicio 7: Analizar conexiones de red. Dado un array de conexiones de red, 
// agrupa las conexiones por protocolo y cuenta cuántas hay de cada tipo.
const conexiones = [
  { id: 1, origen: "192.168.1.5", destino: "192.168.1.10", protocolo: "HTTP" },
  { id: 2, origen: "192.168.1.7", destino: "192.168.1.12", protocolo: "FTP" },
  { id: 3, origen: "192.168.1.3", destino: "192.168.1.11", protocolo: "SSH" },
  { id: 4, origen: "192.168.1.8", destino: "192.168.1.14", protocolo: "HTTP" },
  { id: 5, origen: "192.168.1.2", destino: "192.168.1.13", protocolo: "HTTPS" },
  { id: 6, origen: "192.168.1.6", destino: "192.168.1.10", protocolo: "FTP" },
  { id: 7, origen: "192.168.1.9", destino: "192.168.1.15", protocolo: "SSH" },
  { id: 8, origen: "192.168.1.4", destino: "192.168.1.11", protocolo: "HTTP" }
];

const conexionesPorProtocolo = conexiones.reduce((acc, { protocolo }) => {
  acc[protocolo] = (acc[protocolo] || 0) + 1;
  return acc;
}, {});

console.log("ejercicio 7:")
console.log(conexionesPorProtocolo)

// Ejercicio 8: Filtrar y transformar alertas de seguridad
// Dado un array de alertas de seguridad de red, filtra las que sean de nivel "alto" y
// transfórmalas en mensajes para el administrador.

const dispositivos = [
  { id: 1, nombre: "PC-Desarrollo", ip: "192.168.1.5", tipo: "Estación de trabajo" },
  { id: 2, nombre: "PC-Marketing",  ip: "192.168.1.7", tipo: "Estación de trabajo" },
  { id: 3, nombre: "Servidor-Web",  ip: "192.168.1.10", tipo: "Servidor" },
  { id: 4, nombre: "Servidor-BD",   ip: "192.168.1.11", tipo: "Servidor" }
];

const conexionesActivas = [
  { origen: "192.168.1.5", destino: "192.168.1.10", protocolo: "HTTP",  bytes: 8500 },
  { origen: "192.168.1.7", destino: "192.168.1.11", protocolo: "MySQL", bytes: 12000 },
  { origen: "192.168.1.5", destino: "192.168.1.11", protocolo: "MySQL", bytes: 9200 }
];

// Índice por IP para lookup O(1)
const idxPorIp = dispositivos.reduce((acc, d) => (acc[d.ip] = d, acc), {});

const informeActividad = conexionesActivas.map(con => {
  const origen = idxPorIp[con.origen] || { nombre: "Desconocido", tipo: "N/A" };
  const destino = idxPorIp[con.destino] || { nombre: "Desconocido", tipo: "N/A" };
  return {
    origenIP: con.origen,
    origenNombre: origen.nombre,
    origenTipo: origen.tipo,
    destinoIP: con.destino,
    destinoNombre: destino.nombre,
    destinoTipo: destino.tipo,
    protocolo: con.protocolo,
    bytes: con.bytes
  };
});

console.log("ejercicio 8:")
console.log("Informe de actividad de red:", informeActividad);

// Ejercicio 9: Combinar datos de dispositivos y conexiones. Combina información de dispositivos
// y conexiones para crear un informe detallado de la actividad de red.
const topologiaRed = {
  nodos: [
    { id: "A", tipo: "Router", ubicacion: "Planta 1" },
    { id: "B", tipo: "Switch", ubicacion: "Planta 1" },
    { id: "C", tipo: "Switch", ubicacion: "Planta 2" },
    { id: "D", tipo: "Switch", ubicacion: "Planta 3" },
    { id: "E", tipo: "Router", ubicacion: "Planta 3" }
  ],
  conexiones: [
    { origen: "A", destino: "B", ancho_banda: 1000 },
    { origen: "A", destino: "C", ancho_banda: 1000 },
    { origen: "B", destino: "C", ancho_banda: 100 },
    { origen: "B", destino: "D", ancho_banda: 100 },
    { origen: "C", destino: "D", ancho_banda: 100 },
    { origen: "C", destino: "E", ancho_banda: 1000 },
    { origen: "D", destino: "E", ancho_banda: 1000 }
  ]
};

// Inicializar contador
const conexionesPorNodo = Object.fromEntries(topologiaRed.nodos.map(n => [n.id, 0]));

// Contar conexiones (no dirigido: suma para origen y destino)
topologiaRed.conexiones.forEach(({ origen, destino }) => {
  conexionesPorNodo[origen] = (conexionesPorNodo[origen] || 0) + 1;
  conexionesPorNodo[destino] = (conexionesPorNodo[destino] || 0) + 1;
});

// Ordenar de mayor a menor por cantidad de conexiones
const nodosOrdenados = Object.entries(conexionesPorNodo)
  .sort((a, b) => b[1] - a[1]); // [id, cant]

// Sugerencias simples: si tiene > 2 conexiones, podría requerir más BW o segmentación
const UMBRAL = 2;
const sugerencias = nodosOrdenados
  .filter(([, cant]) => cant > UMBRAL)
  .map(([id, cant]) => {
    const nodo = topologiaRed.nodos.find(n => n.id === id);
    return `Nodo ${id} (${nodo.tipo} en ${nodo.ubicacion}) tiene ${cant} enlaces: considerar aumentar ancho de banda o balancear carga.`;
  });

console.log("ejercicio 9:")
console.log("Conexiones por nodo:", conexionesPorNodo);
console.log("Nodos ordenados:", nodosOrdenados);
console.log("Sugerencias:", sugerencias);

// Ejercicio 10: Analizar y optimizar topología de red. Dado un objeto que representa una 
// topología de red, encuentra los nodos con más conexiones y sugiere optimizaciones.
function contarConexiones(topologia) {
  const conteo = Object.fromEntries(topologia.nodos.map(n => [n.id, 0]));
  topologia.conexiones.forEach(({ origen, destino }) => {
    conteo[origen]++; conteo[destino]++;
  });
  return conteo;
}

function ordenarPorConexiones(conteo) {
  return Object.entries(conteo).sort((a, b) => b[1] - a[1]);
}

function sugerirOptimizaciones(topologia, conteo, umbral = 2) {
  const orden = ordenarPorConexiones(conteo);
  return orden
    .filter(([, cant]) => cant > umbral)
    .map(([id, cant]) => {
      const nodo = topologia.nodos.find(n => n.id === id);
      // Ejemplos de acciones según tipo
      const accionBase = (nodo.tipo === "Router")
        ? "revisar routing y ampliar enlaces troncales"
        : "evaluar uplinks, LAG/port-channel o redistribuir conexiones";
      return `Nodo ${id} (${nodo.tipo}) con ${cant} conexiones: ${accionBase}.`;
    });
}

// Uso:
const conteo = contarConexiones(topologiaRed);
const ranking = ordenarPorConexiones(conteo);
const acciones = sugerirOptimizaciones(topologiaRed, conteo, 2);

console.log("ejercicio 10:")
console.log("Ranking:", ranking);
console.log("Optimizaciones:", acciones);