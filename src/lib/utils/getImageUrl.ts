import uploadImage from "./uploadImage";

export default async function getImageUrl(
  imagePreview: string | null,
  image: File
): Promise<string | null> {
  return imagePreview &&
    (imagePreview.startsWith("https://") || imagePreview.startsWith("http://"))
    ? imagePreview
    : image
    ? await uploadImage(image)
    : null;
}
