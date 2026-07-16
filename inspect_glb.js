const fs = require('fs');
try {
  const buffer = fs.readFileSync('public/models/mclaren.glb');
  const jsonChunkLength = buffer.readUInt32LE(12);
  const jsonChunkType = buffer.readUInt32LE(16);
  if (jsonChunkType === 0x4E4F534A) { // 'JSON'
    const jsonStr = buffer.toString('utf8', 20, 20 + jsonChunkLength);
    const gltf = JSON.parse(jsonStr);
    console.log('--- Materials ---');
    console.log(gltf.materials?.map(m => m.name).join(', '));
    console.log('--- Meshes ---');
    console.log(gltf.meshes?.map(m => m.name).join(', '));
  } else {
    console.log('Not a valid GLB JSON chunk');
  }
} catch(e) {
  console.error(e.message);
}
