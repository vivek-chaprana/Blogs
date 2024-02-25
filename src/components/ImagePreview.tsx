import { Image, ImageProps, cn } from "@nextui-org/react";
import { MouseEventHandler } from "react";
import { FaTrash } from "react-icons/fa";

interface ImagePreviewProps extends ImageProps {
  resetImage: MouseEventHandler;
  rounded?: string;
}

const ImagePreview = ({
  resetImage,
  rounded,
  alt,
  ...rest
}: ImagePreviewProps) => (
  <div className="p-5 ">
    <div
      className={cn(
        "relative group overflow-hidden flex justify-center",
        rounded ? `rounded-${rounded}` : "rounded-xl"
      )}
    >
      <Image className="border border-gray " {...rest} alt={alt} />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-b-lg  z-10 rounded-t-full h-1/3 w-full opacity-0 group-hover:opacity-85 transition duration-1000 ease-out
      shadow-[inset_0px_-70px_30px_30px_rgba(0,0,0,0.25)] "
      ></div>
      <div
        onClick={resetImage}
        className="bg-red-300 text-lg text-red-600 rounded-full p-2 absolute bottom-0 left-1/2 -translate-x-1/2 z-10 translate-y-5 opacity-0 group-hover:-translate-y-3 group-hover:opacity-90 hover:scale-105 cursor-pointer transition-all"
      >
        <FaTrash />
      </div>
    </div>
  </div>
);

export default ImagePreview;
