const fs = require('fs');
try {
  const buffer = fs.readFileSync('public/models/mclaren.glb');
  const jsonChunkLength = buffer.readUInt32LE(12);
  const jsonChunkType = buffer.readUInt32LE(16);
  if (jsonChunkType === 0x4E4F534A) {
    const jsonStr = buffer.toString('utf8', 20, 20 + jsonChunkLength);
    const gltf = JSON.parse(jsonStr);
    
    console.log('--- Top Materials Info ---');
    ['ext_black_9', 'ext_black', 'ext_black_17', 'ext_black_0'].forEach(name => {
      const mat = gltf.materials.find(m => m.name === name);
      if (mat) {
        const pbr = mat.pbrMetallicRoughness || {};
        console.log(`${name}: color=${JSON.stringify(pbr.baseColorFactor)}, metallic=${pbr.metallicFactor}, roughness=${pbr.roughnessFactor}`);
      }
    });
  }
} catch(e) {
  console.error(e.message);
}
