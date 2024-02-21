import { CLOUDINARY_NAME, UPLOAD_PRESET } from "../constants";

export default async function uploadImage(image: File) {
  if (!CLOUDINARY_NAME || !UPLOAD_PRESET)
    throw new Error("Cloudinary not configured");

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", UPLOAD_PRESET);

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload image");
  }

  const uploadedImageData = await uploadResponse.json();
  return uploadedImageData.secure_url;
}
