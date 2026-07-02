const Jimp = require("jimp");
const path = require("path");

async function removeWhite(filename) {
  try {
    const imgPath = path.join(__dirname, "src/assets", filename);
    const image = await Jimp.read(imgPath);
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // if color is near white, make it transparent
      if (red > 230 && green > 230 && blue > 230) {
        this.bitmap.data[idx + 3] = 0; // alpha to 0
      }
    });
    
    await image.writeAsync(imgPath);
    console.log("Processed " + filename);
  } catch (err) {
    console.error("Error processing " + filename, err);
  }
}

async function run() {
  await removeWhite("ChatGPT Image Jun 26, 2026, 02_46_14 PM.png");
  await removeWhite("ChatGPT Image Jun 26, 2026, 02_19_54 PM.png");
}
run();
