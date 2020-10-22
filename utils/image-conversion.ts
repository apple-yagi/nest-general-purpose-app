import * as fs from 'fs';

export function toBase64(imagePath) {
  // Read the file into memory
  const imageFile = fs.readFileSync(imagePath);

  // Convert the image data to a Buffer and base64 encode it.
  return Buffer.from(imageFile).toString('base64');
}
