import { useRef, useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Material property presets for each finish type
const FINISH_PRESETS = {
  gloss: { roughness: 0.08, metalness: 0.1, clearcoat: 0.6, clearcoatRoughness: 0.05 },
  metallic: { roughness: 0.25, metalness: 0.85, clearcoat: 0.4, clearcoatRoughness: 0.1 },
  matte: { roughness: 0.9, metalness: 0.0, clearcoat: 0.0, clearcoatRoughness: 1.0 },
}

// PPF adds a protective glossy layer
const PPF_OVERRIDES = {
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
  reflectivity: 0.95,
}

// Window tint material applied when PPF is enabled
const WINDOW_TINT = {
  color: new THREE.Color('#0a0c10'),
  roughness: 0.05,
  metalness: 0.1,
  transparent: true,
  opacity: 0.25,
  envMapIntensity: 1.2,
}

// Matches glass / window meshes
const GLASS_BY_NAME = /glass|window|windshield|windscreen/i

// Hard exclusions by name: never color these (non-glass)
const EXCLUDE_BY_NAME = /tire|tyre|tread|rim|light|lamp|mirror|interior|seat|dash|steering|brake|caliper|disc|pad|axle|engine|mechanical|hardware|license|floor|mat|badge|emblem|gasket|wiper|cage/i

// Positive body name keywords — if matched, this mesh IS body paint
const BODY_BY_NAME = /body|paint|carpaint|panel|hood|door|roof|bonnet|fender|bumper|trunk|lid|shell|exterior|pillar|quarter|spoiler|skirt|sill/i

/**
 * Determine if a mesh is a paint body mesh using a 3-tier logic:
 * 1. Name exclusions (tires, glass, etc) → never paint
 * 2. Name inclusions (body, hood, etc) → always paint
 * 3. Roughness heuristic: smooth materials (roughness < 0.35) are paint, rough ones (≥0.35) are rubber/plastic
 */
function isBodyMesh(obj) {
  const name = ((obj.name || '') + ' ' + (obj.material?.name || '')).toLowerCase()

  // Hard exclude by name (includes glass)
  if (GLASS_BY_NAME.test(name)) return false
  if (EXCLUDE_BY_NAME.test(name)) return false

  // Positive include by name
  if (BODY_BY_NAME.test(name)) return true

  // Roughness heuristic — shiny = paint, rough = tire/rubber/plastic
  const roughness = obj.material?.roughness ?? 1.0
  return roughness < 0.35
}

function isGlassMesh(obj) {
  const name = ((obj.name || '') + ' ' + (obj.material?.name || '')).toLowerCase()
  return GLASS_BY_NAME.test(name)
}

export default function CarModel({ modelUrl, carColor, finish, ppfEnabled, onLoaded }) {
  const groupRef = useRef()
  const bodyMaterials = useRef([])
  const glassMeshes = useRef([])   // { mesh, originalMat, tintMat }

  const { scene } = useGLTF(modelUrl)

  // Clone scene so we can safely modify materials per-instance
  const carScene = useMemo(() => scene.clone(true), [scene])

  // Build body and glass material lists on mount / when model changes
  useEffect(() => {
    const bodyMeshes = []
    const glassObjs = []

    carScene.traverse((obj) => {
      if (!obj.isMesh) return
      obj.castShadow = true
      obj.receiveShadow = true

      if (isGlassMesh(obj)) {
        glassObjs.push(obj)
      } else if (isBodyMesh(obj)) {
        bodyMeshes.push(obj)
      }
    })

    // Build body materials
    const materials = []
    bodyMeshes.forEach((obj) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(carColor),
        ...FINISH_PRESETS[finish],
        envMapIntensity: 1.5,
      })
      obj.material = mat
      materials.push(mat)
    })

    // Absolute fallback if heuristic found nothing — paint the whole car
    if (materials.length === 0) {
      carScene.traverse((obj) => {
        if (!obj.isMesh) return
        const mat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(carColor),
          ...FINISH_PRESETS[finish],
          envMapIntensity: 1.5,
        })
        obj.material = mat
        obj.castShadow = true
        materials.push(mat)
      })
    }

    bodyMaterials.current = materials

    // Build glass tint entries
    glassMeshes.current = glassObjs.map((obj) => {
      const tintMat = new THREE.MeshPhysicalMaterial({ ...WINDOW_TINT })
      return { mesh: obj, originalMat: obj.material, tintMat }
    })

    onLoaded?.()
  }, [carScene])

  // Reactively update color / finish / PPF on body
  useEffect(() => {
    const color = new THREE.Color(carColor)
    const finishProps = FINISH_PRESETS[finish] || FINISH_PRESETS.gloss
    bodyMaterials.current.forEach((mat) => {
      mat.color.set(color)
      Object.assign(mat, finishProps)
      if (ppfEnabled) Object.assign(mat, PPF_OVERRIDES)
      mat.needsUpdate = true
    })
  }, [carColor, finish, ppfEnabled])

  // Reactively apply / remove window tint
  useEffect(() => {
    glassMeshes.current.forEach(({ mesh, originalMat, tintMat }) => {
      mesh.material = ppfEnabled ? tintMat : originalMat
    })
  }, [ppfEnabled])

  return (
    <group ref={groupRef}>
      <primitive
        object={carScene}
        scale={1.0}
        position={[0, -0.05, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
    </group>
  )
}
