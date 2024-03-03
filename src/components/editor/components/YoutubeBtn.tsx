import {
  Button,
  ButtonProps,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { RiYoutubeLine } from "react-icons/ri";
import { z } from "zod";

interface Props extends ButtonProps {
  editor: Editor;
}

export default function YoutubeBtn({ editor, ...rest }: Props) {
  const [isInvalid, setIsInvalid] = useState(false);

  const urlInputSchema = z
    .string()
    .url()
    .min(1)
    .refine((url) => {
      const youtubeUrlRegex =
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
      return youtubeUrlRegex.test(url);
    }, "Invalid YouTube URL format");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const youtubeUrl = formData.get("video-url");
    const width = formData.get("width")
      ? parseInt(formData.get("width") as string, 10)
      : 640;
    const height = formData.get("height")
      ? parseInt(formData.get("height") as string, 10)
      : 360;

    try {
      urlInputSchema.parse(youtubeUrl as string);
      editor.commands.setYoutubeVideo({
        src: youtubeUrl as string,
        width,
        height,
      });
    } catch (e) {
      setIsInvalid(true);
      return;
    }
  }

  return (
    <Popover placement="bottom" size="lg">
      <PopoverTrigger title="Add Youtube Video">
        <Button isIconOnly variant="light" className="text-xl" {...rest}>
          <RiYoutubeLine />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form className="p-2 flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input name="video-url" type="url" label="Video url" isRequired />
          <Input name="width" type="number" label="Width" />
          <Input name="height" type="number" label="Height" />

          {isInvalid && (
            <span className="text-red-500 text-sm">
              Please enter a valid youtube URL!
            </span>
          )}
          <Button type="submit" className="bg-dark-200 text-white">
            Add
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
