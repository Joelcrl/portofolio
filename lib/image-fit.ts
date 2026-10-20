// Server only: reads files from public/ while the page is rendered.
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/** How an image fills a 16:9 slot: cropped to fill, or shown whole. */
export type ImageFit = "cover" | "contain";

/**
 * Reads a public/ image's size at build time. Wide images (4:3 or wider) fill
 * the slot with a small crop. Portrait and square ones are shown whole so
 * faces and screenshots are not cut off. Missing or unreadable files cover.
 */
export function imageFit(src: string | null): ImageFit {
  if (!src) return "cover";
  try {
    const { width, height } = imageSize(
      fs.readFileSync(path.join(process.cwd(), "public", src)),
    );
    return width / height >= 4 / 3 ? "cover" : "contain";
  } catch {
    return "cover";
  }
}
