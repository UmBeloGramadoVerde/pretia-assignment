import Image from "next/image";
import RemoveButton from "../RemoveButton/RemoveButton";
import { getImageLink } from "@/utils";

interface ImageFileDisplayProps {
  image: File | string;
  removeImageFn: () => void;
}

const ImageFileDisplay: React.FC<ImageFileDisplayProps> = ({
  image,
  removeImageFn,
}) => {
  console.log(image);
  console.log(typeof image);
  const imageUrl = typeof image === "string" ? getImageLink(image) : URL.createObjectURL(image);
  console.debug("imageUrl", imageUrl);
  return (
    <div>
      <div className="relative flex w-fit">
        <Image alt="preview image" src={imageUrl} width={256} height={256} />
        <div className="absolute right-2 top-2">
          <RemoveButton removeFn={removeImageFn} />
        </div>
      </div>
    </div>
  );
};

export default ImageFileDisplay;
