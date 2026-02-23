import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { publicClient } from "./client";

const builder = createImageUrlBuilder(publicClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
