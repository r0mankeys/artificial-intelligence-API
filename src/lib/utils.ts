import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { BoundingBox } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateFacePosition(box: BoundingBox, image: HTMLImageElement) {
  const width = image.width;
  const height = image.height;
  const { left_col, top_row, right_col, bottom_row } = box.BoudingBox;
  return {
      left: left_col * width,
      top: top_row * height,
      right: width - (right_col * width),
      bottom: height - (bottom_row * height)
  }
}
