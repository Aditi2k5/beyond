'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Text } from '@react-three/drei'
import * as THREE from 'three'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface BrainPart {
  name: string;
  color: number;
  position: [number, number, number];
  scale: [number, number, number];
  info: string;
}

const brainParts: BrainPart[] = [
  {
    name: 'Frontal Lobe',
    color: 0x000000,
    position: [0, 2.5, 0.5],
    scale: [0.2, 0.2, 0.2],
    info: 'Controls executive functions, personality, behavior, emotional regulation, planning, problem-solving, and voluntary movement.'
  },
  {
    name: 'Prefrontal Cortex',
    color: 0x000000,
    position: [0, 2.3, 2],
    scale: [0.2, 0.2, 0.2],
    info: 'Handles complex cognitive behaviors, personality expression, decision making, and social behavior.'
  },
  {
    name: 'Temporal Lobe',
    color: 0x000000,
    position: [2.5, 0, 0],
    scale: [0.2, 0.2, 0.2],
    info: 'Processes auditory information, manages memory formation, and helps recognize objects and faces.'
  },
  {
    name: 'Hippocampus',
    color: 0x000000,
    position: [2.2, -0.3, 0.2],
    scale: [0.2, 0.2, 0.2],
    info: 'Critical for learning and memory formation, especially long-term memory.'
  },
  {
    name: 'Parietal Lobe',
    color: 0x000000,
    position: [0, 0.5, -0.8],
    scale: [0.2, 0.2, 0.2],
    info: 'Processes sensory information, spatial awareness, and navigation.'
  },
  {
    name: 'Occipital Lobe',
    color: 0x000000,
    position: [-0.8, 0, -1],
    scale: [0.2, 0.2, 0.2],
    info: 'Visual processing center, interprets what we see.'
  },
  {
    name: 'Cerebellum',
    color: 0x000000,
    position: [-0.3, -1.2, -0.8],
    scale: [0.2, 0.2, 0.2],
    info: 'Coordinates movement, balance, and motor learning.'
  },
  {
    name: 'Brain Stem',
    color: 0x000000,
    position: [0, -1.5, -0.3],
    scale: [0.2, 0.2, 0.2],
    info: 'Controls basic life functions like breathing, heart rate, blood pressure, and consciousness.'
  },
  {
    name: 'Amygdala',
    color: 0x000000,
    position: [1.8, -0.5, 0.3],
    scale: [0.2, 0.2, 0.2],
    info: 'Processes emotions, especially fear and pleasure responses.'
  },
  {
    name: 'Thalamus',
    color: 0x000000,
    position: [0, -0.2, 0],
    scale: [0.2, 0.2, 0.2],
    info: 'Relays sensory and motor signals to the cerebral cortex.'
  },
  {
    name: 'Hypothalamus',
    color: 0x000000,
    position: [0, -0.6, 0.2],
    scale: [0.2, 0.2, 0.2],
    info: 'Regulates hormone production, temperature, hunger, thirst, and sleep cycles.'
  },
  {
    name: 'Corpus Callosum',
    color: 0x000000,
    position: [0, 0.3, 0],
    scale: [0.2, 0.2, 0.2],
    info: 'Connects left and right hemispheres, allowing them to communicate.'
  }
];

interface CameraControllerProps {
  target: BrainPart | null;
}

function CameraController({ target }: CameraControllerProps) {
  const { camera } = useThree()
  
  useEffect(() => {
    if (target) {
      const startPosition = camera.position.clone()
      const endPosition = new THREE.Vector3(
        target.position[0] * 3, 
        target.position[1] * 3, 
        target.position[2] * 3
      )
      
      const duration = 1000
      const startTime = performance.now()
      
      function animate(currentTime: number) {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        const t = 1 - Math.pow(1 - progress, 3)
        camera.position.lerpVectors(startPosition, endPosition, t)
        camera.lookAt(0, 0, 0)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [target, camera])
  
  return null
}

function BrainModel() {
  const { scene } = useGLTF('/model/brain.glb')
  return <primitive object={scene} position={[1, -1, 0]} scale={[1, 1, 1]} />
}

interface SceneProps {
  setHovered: (part: BrainPart | null) => void;
  setSelected: (part: BrainPart) => void;
  cameraTarget: BrainPart | null;
}

function Scene({ setHovered, setSelected, cameraTarget }: SceneProps) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(7, 2, 7)
  }, [camera])

  return (
    <>
      <CameraController target={cameraTarget} />
      <BrainModel />
      {brainParts.map((part, index) => (
        <group key={index} position={part.position}>
          {/* Your group content here */}
        </group>
      ))}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} />
      <OrbitControls enablePan={false} />
    </>
  )
}

export default function InteractiveBrainModel() {
  const [hovered, setHovered] = useState<BrainPart | null>(null)
  const [selected, setSelected] = useState<BrainPart | null>(null)
  const [expandedPart, setExpandedPart] = useState<BrainPart | null>(null)
  const [cameraTarget, setCameraTarget] = useState<BrainPart | null>(null)

  const handlePartClick = (part: BrainPart) => {
    setSelected(part)
    setCameraTarget(part)
    setExpandedPart(expandedPart === part ? null : part)
  }

  return (
    <div className="flex w-full h-[600px] relative">
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Brain Parts</h2>
        {brainParts.map((part, index) => (
          <div key={index} className="mb-2">
            <button
              className={`w-full text-left p-2 rounded flex justify-between items-center ${
                selected === part ? 'bg-blue-200' : 'hover:bg-blue-100'
              }`}
              onClick={() => handlePartClick(part)}
            >
              <span>{part.name}</span>
              {expandedPart === part ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedPart === part && (
              <div className="p-2 bg-white rounded-b-lg shadow-sm">
                <p className="text-gray-700 text-sm">{part.info}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-3/4 relative">
        <Canvas shadows>
          <Scene 
            setHovered={setHovered} 
            setSelected={handlePartClick} 
            cameraTarget={cameraTarget} 
          />
        </Canvas>
        {/* <div className="absolute bottom-4 left-0 right-0 bg-black bg-opacity-75 text-pink-700 p-4 text-center">
          {hovered ? (
            <p>{hovered.name}</p>
          ) : (
            <p>Hover over or click brain regions to learn more</p>
          )}
        </div> */}
      </div>
    </div>
  )
}