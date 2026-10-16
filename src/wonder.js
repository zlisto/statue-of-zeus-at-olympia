// The Statue of Zeus at Olympia: everything about this world in one place. World.jsx, layout.js,
// the guide and the chat all read from here; Scene.jsx draws the temple and the statue.
const HUB = 'https://zlisto.github.io/hub_world/'

// the Temple of Zeus: a Doric temple on a three-step platform, entered from the east front (+z here)
export const TEMPLE = { x0: -14, x1: 14, z0: -36, z1: 26, h: 1.5 }
export const CELLA = { x0: -7.5, x1: 7.5, z0: -31, z1: 17, door: 2.8 } // the inner room, door on the east wall

// the outer colonnade: 6 columns across each end, 13 down each side
const xs = [-12.5, -7.5, -2.5, 2.5, 7.5, 12.5]
const zs = Array.from({ length: 13 }, (_, i) => 24.5 - i * (59 / 12))
export const COLUMNS = [
  ...xs.flatMap((x) => [
    [x, zs[0]],
    [x, zs[12]],
  ]),
  ...zs.slice(1, 12).flatMap((z) => [
    [-12.5, z],
    [12.5, z],
  ]),
]
// two rows of smaller columns inside the room
export const INNER = Array.from({ length: 7 }, (_, i) => -27 + i * 6.5).flatMap((z) => [
  [-5.2, z],
  [5.2, z],
])

export default {
  id: 'statue_of_zeus',
  name: 'Statue of Zeus at Olympia',
  place: 'Olympia, Greece · c. 430 BCE',
  blurb: "Climb the steps of the Temple of Zeus and walk inside, where Phidias's colossal Zeus of gold and ivory sits enthroned. Olympibubu the athlete will tell you its story.",

  guideName: 'Olympibubu',
  guideRole: 'Olympic champion',
  guideIcon: '🏅',
  greeting: (v) =>
    `Chaire${v ? `, ${v}` : ''}! Greetings! I'm Olympibubu, and I won my olive wreath at the Games right here in Olympia. Come inside the temple and see the god himself: Phidias's Zeus, so big he nearly touches the roof. Ask me anything.`,
  facts: [
    {
      q: 'Who made the statue, and when?',
      a: `The great Athenian sculptor **Phidias** made it around **435 BCE**, soon after his giant Athena for the Parthenon in Athens.

Archaeologists found his **workshop** at Olympia, built the same size as the temple's inner room so he could assemble the statue there. It held tools, clay molds for the gold robe, and a cup inscribed **"I belong to Pheidias."**`,
    },
    {
      q: 'How big was it?',
      a: `About **12 m (40 ft)** tall, seated, so tall his head nearly reached the ceiling.

The geographer **Strabo** joked that if Zeus stood up, he would **unroof the temple**. The statue here is scaled to match.`,
    },
    {
      q: 'What was it made of?',
      a: `It was **chryselephantine**: gold and ivory over a wooden frame.
- **Ivory** plates for his skin.
- **Gold** for his robe, sandals and hair, the robe worked with animals and lilies.
- In his right hand, a small figure of **Nike**, goddess of victory; in his left, a **scepter** topped with an eagle.
- The **throne** was made of gold, ebony, ivory and precious stones, carved with gods and heroes.
The traveler **Pausanias** described it all in detail around 150 CE.`,
    },
    {
      q: 'Why is there oil on the floor?',
      a: `In front of the statue, the floor was paved with **dark stone** inside a raised marble rim, and kept filled with **olive oil**.

Pausanias says the oil protected the ivory from the damp of Olympia, which sits in a river valley. The shallow pool also reflected light up onto the statue in the dim temple.`,
    },
    {
      q: 'What was the temple?',
      a: `The **Temple of Zeus**, finished around **456 BCE** and designed by **Libon of Elis**, was one of the largest Doric temples in Greece: about 64 m long, with 6 columns across the front and 13 down each side.

It stood in the sanctuary where the **Olympic Games** were held every four years in Zeus's honor, traditionally from **776 BCE**.`,
    },
    {
      q: 'What happened to it?',
      a: `The Games were ended around 393 CE under the Christian emperor Theodosius I, and pagan temples were closed.

**Ancient accounts disagree** about the statue's end. One says it was carried to **Constantinople** and burned in a palace fire around **475 CE**; others suggest it was destroyed at Olympia when the temple burned. Earthquakes in the 6th century toppled the temple's columns, and you can still see them lying where they fell.`,
    },
    {
      q: 'How do we know what it looked like?',
      a: `No copy of the statue survives, so we rely on:
- **Pausanias's** detailed description.
- **Coins** of Elis that show the seated Zeus.
- The molds and tools from **Phidias's workshop**.
Its image of a calm, bearded god on a throne shaped how Zeus, and other enthroned figures, were pictured for centuries after.`,
    },
  ],

  outfit: {
    fur: '#a07a56',
    expression: 'grin',
    shirt: '#f2ede2', // a white chiton
    skirt: '#f2ede2',
    skirtLength: 0.26,
    parts: [['laurel', { a: '#6b7d3a' }], ['himation', { a: '#b84a3a' }]],
  },

  env: { sky: '#a8c8e6', fog: '#cfd9cf', fogNear: 110, fogFar: 420, ground: '#9fae6a', hemiSky: '#fff4e2', hemiGround: '#6f7d4a', sun: [40, 70, 50], sunIntensity: 1.7 },
  speed: { walk: 12, run: 20 },
  bound: 110,
  spawn: { x: 0, z: 46, yaw: 0 },
  portal: { x: -9, z: 52, rot: Math.PI, href: HUB, spawn: 'by_statue_of_zeus' },
  guide: { x: 4, z: 40, rot: Math.atan2(-4, 6) },
  platforms: [
    { ...TEMPLE }, // the temple floor
    // three steps up the east front, as a gentle ramp so you can walk them
    { x0: -14, x1: 14, z0: 26, z1: 28.5, h0: 0, h1: 1.5 },
  ],
  boxes: [
    // the inner room's walls, leaving the east door open
    { x0: CELLA.x0 - 0.5, x1: CELLA.x0, z0: CELLA.z0, z1: CELLA.z1 },
    { x0: CELLA.x1, x1: CELLA.x1 + 0.5, z0: CELLA.z0, z1: CELLA.z1 },
    { x0: CELLA.x0 - 0.5, x1: CELLA.x1 + 0.5, z0: CELLA.z0 - 0.5, z1: CELLA.z0 },
    { x0: CELLA.x0 - 0.5, x1: -CELLA.door, z0: CELLA.z1, z1: CELLA.z1 + 0.5 },
    { x0: CELLA.door, x1: CELLA.x1 + 0.5, z0: CELLA.z1, z1: CELLA.z1 + 0.5 },
    { x0: -4, x1: 4, z0: -31, z1: -19 }, // the statue and its base
  ],
  circles: [...COLUMNS.map(([x, z]) => ({ x, z, r: 1.05 })), ...INNER.map(([x, z]) => ({ x, z, r: 0.6 }))],
  areas: [
    { x: 0, z: -14, r: 9, label: 'before the Statue of Zeus' },
    { x: 0, z: -5, r: 22, label: 'in the Temple of Zeus' },
    { x: 0, z: 10, r: 40, label: 'in the sanctuary of Olympia' },
  ],
  elsewhere: 'at Olympia',
}
