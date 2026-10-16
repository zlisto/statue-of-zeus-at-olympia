import { useMemo } from 'react'
import * as THREE from 'three'
import { Box, Columns, Cypress, GEO, GOLD, Hills, Instanced, Pediment, Roof, Steps, mat } from './kit.jsx'
import { CELLA, COLUMNS, INNER, TEMPLE } from './wonder.js'

// The sanctuary of Olympia: the Doric Temple of Zeus on its stepped platform, and inside it
// Phidias's seated Zeus of gold and ivory on a throne of gold and ebony, Nike in his right hand,
// an eagle-topped scepter in his left, with the dark pool of olive oil before him.

const FLOOR = TEMPLE.h
const STUCCO = '#ece4d2'
const IVORY = '#f1e4c8'
const GOLD_C = '#d9aa3a'
const EBONY = '#2a1d16'
// the robe's fall over the shins: wider at the hem than at the knees
const ROBE = new THREE.CylinderGeometry(1.5, 1.9, 1, 24, 1, false, -Math.PI / 2, Math.PI)

// a cylinder from point a to point b, for arms
function Limb({ a, b, r, m }) {
  const { pos, quat, len } = useMemo(() => {
    const va = new THREE.Vector3(...a)
    const vb = new THREE.Vector3(...b)
    const dir = vb.clone().sub(va)
    const len = dir.length()
    return {
      pos: va.add(vb).multiplyScalar(0.5),
      quat: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize()),
      len,
    }
  }, [a, b])
  return (
    <>
      <mesh geometry={GEO.cyl} material={m} position={pos} quaternion={quat} scale={[r, len, r]} />
      <mesh geometry={GEO.sph} material={m} position={b} scale={r} />
    </>
  )
}

function Zeus() {
  const Y = FLOOR + 1.2 // top of the statue's base
  const ivory = mat(IVORY, { roughness: 0.45 })
  const gold = mat(GOLD_C, GOLD)
  const ebony = mat(EBONY, { roughness: 0.5 })
  return (
    <group position={[0, 0, 0]}>
      {/* the base, dark stone with a gold band */}
      <Box p={[0, FLOOR + 0.6, -25]} s={[8, 1.2, 12]} c="#3a3a42" />
      <Box p={[0, FLOOR + 1.1, -25]} s={[8.1, 0.15, 12.1]} c={GOLD_C} o={GOLD} />
      {/* throne: seat, high back, armrests, legs */}
      <Box p={[0, Y + 4.6, -25]} s={[6.4, 0.8, 5]} m={ebony} />
      <Box p={[0, Y + 8.5, -27.8]} s={[6.6, 8, 0.8]} m={ebony} />
      <Box p={[0, Y + 12.4, -27.8]} s={[6.8, 0.4, 1]} m={gold} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <Box p={[s * 3.2, Y + 6.2, -25]} s={[0.6, 0.5, 5]} m={gold} />
          <Box p={[s * 3.2, Y + 5.4, -22.7]} s={[0.5, 1.6, 0.5]} m={gold} />
          <Box p={[s * 2.9, Y + 2.1, -22.9]} s={[0.6, 4.2, 0.6]} m={ebony} />
          <Box p={[s * 2.9, Y + 2.1, -27.2]} s={[0.6, 4.2, 0.6]} m={ebony} />
          <mesh geometry={GEO.sph} material={gold} position={[s * 3.2, Y + 12.8, -27.8]} scale={0.45} />
        </group>
      ))}
      {/* footstool and gold sandals */}
      <Box p={[0, Y + 0.3, -20.6]} s={[5, 0.6, 2.2]} m={gold} />
      {[-1, 1].map((s) => (
        <Box key={s} p={[s * 1.1, Y + 0.8, -20.6]} s={[0.9, 0.4, 1.6]} m={gold} />
      ))}
      {/* the gold robe over his lap, falling in folds over his knees to his feet */}
      <Box p={[0, Y + 5.5, -23.6]} s={[4.2, 1.4, 4.4]} m={gold} />
      {[-1, 1].map((s) => (
        <mesh key={s} geometry={GEO.sph} material={gold} position={[s * 1.1, Y + 5.4, -21.5]} scale={[0.95, 0.8, 0.8]} />
      ))}
      <mesh geometry={ROBE} material={gold} position={[0, Y + 3, -22.0]} scale={[1, 4.6, 1]} />
      {[-1.4, -0.45, 0.45, 1.4].map((x) => (
        <mesh key={x} geometry={GEO.cyl} material={mat('#c8952e', GOLD)} position={[x * 0.8, Y + 3, -20.25]} scale={[0.12, 4.4, 0.12]} />
      ))}
      {/* bare ivory chest, the robe drawn over the left shoulder */}
      <mesh geometry={GEO.cyl} material={ivory} position={[0, Y + 7.7, -25.4]} scale={[1.55, 3.4, 1.15]} />
      <Box p={[0.8, Y + 7.6, -24.3]} r={[0, 0, -0.55]} s={[0.9, 4.2, 0.4]} m={gold} />
      {/* head: ivory face, gold hair and beard, an olive wreath */}
      <mesh geometry={GEO.cyl} material={ivory} position={[0, Y + 9.7, -25.4]} scale={[0.45, 0.8, 0.45]} />
      <mesh geometry={GEO.sph} material={ivory} position={[0, Y + 10.75, -25.3]} scale={[1.05, 1.22, 1.1]} />
      <mesh geometry={GEO.sph} material={gold} position={[0, Y + 11.2, -25.5]} scale={[1.12, 0.92, 1.1]} />
      <mesh geometry={GEO.sph} material={gold} position={[0, Y + 9.9, -24.5]} scale={[0.8, 0.95, 0.55]} />
      <mesh geometry={GEO.cyl} material={mat('#6b7d3a', GOLD)} position={[0, Y + 11.45, -25.35]} scale={[1.12, 0.18, 1.15]} />
      {/* right arm forward, Nike standing on his palm; left arm raised, holding the scepter */}
      <Limb a={[-1.6, Y + 8.8, -25.4]} b={[-2.0, Y + 6.9, -24.4]} r={0.5} m={ivory} />
      <Limb a={[-2.0, Y + 6.9, -24.4]} b={[-2.0, Y + 6.9, -22.0]} r={0.42} m={ivory} />
      <group position={[-2.0, Y + 7.3, -21.9]}>
        <mesh geometry={GEO.cone} material={gold} position={[0, 0.6, 0]} scale={[0.35, 1.2, 0.35]} />
        <mesh geometry={GEO.sph} material={ivory} position={[0, 1.35, 0]} scale={0.2} />
        {[-1, 1].map((s) => (
          <Box key={s} p={[s * 0.35, 1.1, -0.15]} r={[0, 0, s * 0.5]} s={[0.5, 0.9, 0.05]} m={gold} />
        ))}
      </group>
      <Limb a={[1.6, Y + 8.8, -25.4]} b={[2.5, Y + 7.9, -24.6]} r={0.5} m={ivory} />
      <Limb a={[2.5, Y + 7.9, -24.6]} b={[2.55, Y + 9.5, -23.9]} r={0.42} m={ivory} />
      <mesh geometry={GEO.cyl} material={gold} position={[2.65, Y + 6.3, -23.8]} scale={[0.12, 11.4, 0.12]} />
      <group position={[2.65, Y + 12.3, -23.8]}>
        <mesh geometry={GEO.sph} material={gold} scale={[0.35, 0.45, 0.35]} />
        {[-1, 1].map((s) => (
          <Box key={s} p={[s * 0.5, 0.15, 0]} r={[0, 0, s * 0.45]} s={[0.8, 0.12, 0.35]} m={gold} />
        ))}
      </group>
      {/* the shallow pool of olive oil before him: dark stone inside a raised marble rim */}
      <Box p={[0, FLOOR + 0.04, -15.5]} s={[7.4, 0.08, 7]} c="#f3eee2" />
      <Box p={[0, FLOOR + 0.1, -15.5]} s={[6.8, 0.06, 6.4]} c="#16161a" o={{ roughness: 0.05, metalness: 0.4 }} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR + 0.14, -15.5]}>
        <planeGeometry args={[6.8, 6.4]} />
        <meshStandardMaterial color="#c9a23a" transparent opacity={0.18} roughness={0.02} metalness={0.6} />
      </mesh>
      <pointLight position={[0, FLOOR + 9, -14]} color="#ffe2b0" intensity={60} distance={30} decay={1.6} />
      <pointLight position={[0, FLOOR + 4, -5]} color="#ffd9a0" intensity={30} distance={25} decay={1.6} />
    </group>
  )
}

function Temple() {
  const cx = (TEMPLE.x0 + TEMPLE.x1) / 2
  const cz = (TEMPLE.z0 + TEMPLE.z1) / 2
  const W = TEMPLE.x1 - TEMPLE.x0
  const D = TEMPLE.z1 - TEMPLE.z0
  const top = FLOOR + 10.4 + 0.3
  const cellaH = 10
  const ent = useMemo(
    () => [
      { p: [cx, top + 1.1, TEMPLE.z1 - 1.5], s: [W - 1, 2.2, 2.2] },
      { p: [cx, top + 1.1, TEMPLE.z0 + 1.5], s: [W - 1, 2.2, 2.2] },
      { p: [TEMPLE.x0 + 1.5, top + 1.1, cz], s: [2.2, 2.2, D - 1] },
      { p: [TEMPLE.x1 - 1.5, top + 1.1, cz], s: [2.2, 2.2, D - 1] },
    ],
    [cx, cz, W, D, top],
  )
  // painted triglyph blocks along the frieze
  const triglyphs = useMemo(() => {
    const out = []
    for (let x = TEMPLE.x0 + 1.5; x <= TEMPLE.x1 - 1.5; x += 2.5) for (const z of [TEMPLE.z1 - 0.38, TEMPLE.z0 + 0.38]) out.push({ p: [x, top + 1.5, z], s: [0.9, 1.1, 0.06] })
    return out
  }, [top])
  const cellaL = CELLA.z1 - CELLA.z0
  const cellaC = (CELLA.z0 + CELLA.z1) / 2
  return (
    <>
      <Steps x={cx} z={cz} w={W + 2.4} d={D + 2.4} n={3} rise={0.5} inset={0.4} color="#ddd3bf" />
      <Columns points={COLUMNS} y0={FLOOR} h={10.4} r={0.95} color={STUCCO} order="doric" />
      <Instanced items={ent} geometry={GEO.box} material={mat(STUCCO)} />
      <Instanced items={triglyphs} geometry={GEO.box} material={mat('#2f4a7a')} />
      <Roof x={cx} y={top + 2.2} z={cz} w={W + 0.6} d={D + 0.6} h={4.4} color="#b8603a" />
      <Pediment y={top + 2.2} z={TEMPLE.z1 - 0.2} w={W} h={4.2} color={STUCCO} />
      <Pediment y={top + 2.2} z={TEMPLE.z0 + 0.2} w={W} h={4.2} color={STUCCO} />
      {/* the gilded figures on the peaks of the roof */}
      {[TEMPLE.z1, TEMPLE.z0].map((z) => (
        <mesh key={z} geometry={GEO.sph} material={mat(GOLD_C, GOLD)} position={[0, top + 6.9, z]} scale={0.6} />
      ))}
      {/* the inner room (cella): walls with the east door, and its inner colonnades */}
      <Box p={[CELLA.x0 - 0.25, FLOOR + cellaH / 2, cellaC]} s={[0.5, cellaH, cellaL]} c={STUCCO} />
      <Box p={[CELLA.x1 + 0.25, FLOOR + cellaH / 2, cellaC]} s={[0.5, cellaH, cellaL]} c={STUCCO} />
      <Box p={[0, FLOOR + cellaH / 2, CELLA.z0 - 0.25]} s={[CELLA.x1 - CELLA.x0 + 1, cellaH, 0.5]} c={STUCCO} />
      {[-1, 1].map((s) => (
        <Box key={s} p={[s * (CELLA.door + (CELLA.x1 + 0.5 - CELLA.door) / 2), FLOOR + cellaH / 2, CELLA.z1 + 0.25]} s={[CELLA.x1 + 0.5 - CELLA.door, cellaH, 0.5]} c={STUCCO} />
      ))}
      <Box p={[0, FLOOR + 8.5, CELLA.z1 + 0.25]} s={[CELLA.door * 2, 3, 0.5]} c={STUCCO} />
      {/* bronze doors, swung open */}
      {[-1, 1].map((s) => (
        <Box key={s} p={[s * (CELLA.door + 0.1), FLOOR + 3.5, CELLA.z1 + 1.6]} r={[0, s * 1.3, 0]} s={[2.6, 7, 0.15]} c="#7a5a2a" o={{ metalness: 0.6, roughness: 0.4 }} />
      ))}
      <Columns points={INNER} y0={FLOOR} h={8.5} r={0.45} color="#e6dccb" order="doric" />
      <Box p={[0, FLOOR + 0.02, cellaC]} s={[CELLA.x1 - CELLA.x0, 0.04, cellaL]} c="#cfc6b4" />
    </>
  )
}

export default function Scene() {
  return (
    <>
      <Hills color="#7f9a5a" r={380} h={40} />
      {/* the Hill of Kronos, rising green north of the sanctuary */}
      <mesh geometry={GEO.sph} material={mat('#6f8f4a')} position={[-30, -10, -150]} scale={[90, 45, 60]} />
      <Temple />
      <Zeus />
      {/* a sacred grove of olives and cypresses around the sanctuary */}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2
        const r = 48 + (i % 3) * 6
        const x = Math.sin(a) * r
        const z = -5 + Math.cos(a) * r
        if (Math.abs(x) < 14 && z > 20) return null // keep the approach to the temple open
        return i % 2 ? <Cypress key={i} x={x} z={z} h={9} /> : <mesh key={i} geometry={GEO.sph} material={mat('#7a8f5a')} position={[x, 2.5, z]} scale={[2.6, 2, 2.6]} />
      })}
      {/* a smaller temple to the northwest, like the Temple of Hera */}
      <group position={[-40, 0, -45]}>
        <Steps w={14} d={30} n={2} rise={0.4} inset={0.4} color="#d8cdb6" />
        <Box p={[0, 4.5, 0]} s={[11, 8, 26]} c="#e2d8c4" />
        <Roof y={8.5} w={12} d={27} h={2.6} color="#a85a36" />
      </group>
    </>
  )
}
