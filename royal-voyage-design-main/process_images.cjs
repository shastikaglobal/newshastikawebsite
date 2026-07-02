const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");

function colorMatch(bgColor, nColor, tolerance) {
  // Standard tolerance for the pure white/beige background
  if (Math.abs(bgColor.r - nColor.r) <= tolerance &&
      Math.abs(bgColor.g - nColor.g) <= tolerance &&
      Math.abs(bgColor.b - nColor.b) <= tolerance) {
      return true;
  }
  
  const maxColor = Math.max(nColor.r, nColor.g, nColor.b);
  const minColor = Math.min(nColor.r, nColor.g, nColor.b);
  const diff = maxColor - minColor;
  
  // Advanced shadow and anti-aliasing detection:
  // Floor shadows in these AI images are usually desaturated (grayish or brownish).
  // If the color is relatively desaturated (diff < 70) AND it is lighter than the dark outlines (maxColor > 50),
  // we treat it as background/shadow and safely dissolve it.
  if (diff < 75 && maxColor > 50) {
      return true;
  }
  
  return false;
}

async function processImage(inputName, outputName) {
  try {
    const inputPath = path.join(__dirname, "src/assets", inputName);
    const outputPath = path.join(__dirname, "src/assets", outputName);
    
    if (!fs.existsSync(inputPath)) {
      console.log("File not found: " + inputPath);
      return;
    }
    
    const image = await Jimp.read(inputPath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    const bgIdx = 0;
    const bgColor = {
      r: image.bitmap.data[bgIdx],
      g: image.bitmap.data[bgIdx + 1],
      b: image.bitmap.data[bgIdx + 2],
    };

    const visited = new Uint8Array(width * height);
    const qX = new Int16Array(width * height);
    const qY = new Int16Array(width * height);
    
    let head = 0;
    let tail = 0;

    const corners = [
      {x: 0, y: 0},
      {x: width - 1, y: 0},
      {x: 0, y: height - 1},
      {x: width - 1, y: height - 1}
    ];

    for (let c of corners) {
      const pos = c.y * width + c.x;
      if (!visited[pos]) {
        visited[pos] = 1;
        qX[tail] = c.x;
        qY[tail] = c.y;
        tail++;
      }
    }

    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];

    while (head < tail) {
      const x = qX[head];
      const y = qY[head];
      head++;
      
      const idx = (y * width + x) * 4;
      image.bitmap.data[idx + 3] = 0; // set transparent

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nPos = ny * width + nx;
          if (!visited[nPos]) {
            const nIdx = nPos * 4;
            const nColor = {
              r: image.bitmap.data[nIdx],
              g: image.bitmap.data[nIdx + 1],
              b: image.bitmap.data[nIdx + 2]
            };
            
            // Base tolerance of 45 handles the solid background
            if (colorMatch(bgColor, nColor, 45)) {
              visited[nPos] = 1;
              qX[tail] = nx;
              qY[tail] = ny;
              tail++;
            }
          }
        }
      }
    }
    
    await image.writeAsync(outputPath);
    console.log("Successfully created transparent image with shadow removal: " + outputName);
  } catch (err) {
    console.error("Error processing " + inputName, err);
  }
}

async function run() {
  await processImage("download (2).jpg", "kawaii_tomato_transparent.png");
  await processImage("A pumpkin with a smile on it's face and a smile on it_ _ Premium AI-generated image.jpg", "kawaii_pumpkin_transparent.png");
  await processImage("Cute Coconut Claire Sticker.jpg", "kawaii_coconut_brown_transparent.png");
  await processImage("Download Cute coconut cartoon icon illustration for free.jpg", "kawaii_coconut_green_transparent.png");
  await processImage("download (1).jpg", "kawaii_cucumber_transparent.png");
  await processImage("download.jpg", "kawaii_banana_transparent.png");
}
run();
