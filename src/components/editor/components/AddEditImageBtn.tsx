import {
  Button,
  ButtonProps,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Editor } from "@tiptap/react";
import { useCallback, useState } from "react";
import { RiImageAddLine, RiImageEditLine } from "react-icons/ri";
import { z } from "zod";

interface Props extends ButtonProps {
  editor: Editor;
}

export default function AddEditImageBtn({ editor, ...rest }: Props) {
  const [isInvalid, setIsInvalid] = useState(false);

  const urlInputSchema = z.string().url().min(1);

  const addImage = useCallback(
    (imageUrl: string) => {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    },
    [editor]
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const imageUrl = new FormData(e.target as HTMLFormElement).get("image-url");

    try {
      urlInputSchema.parse(imageUrl as string);
    } catch {
      setIsInvalid(true);
      return;
    }

    if (imageUrl) addImage(imageUrl as string);
  }

  return (
    <Popover placement="bottom" size="lg">
      <PopoverTrigger
        title={editor.isActive("image") ? "Edit Image" : "Add Image"}
      >
        <Button isIconOnly variant="light" className="text-xl" {...rest}>
          {editor.isActive("image") ? <RiImageEditLine /> : <RiImageAddLine />}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form className="p-2 flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input name="image-url" type="url" label="Image url" />

          {isInvalid && (
            <span className="text-red-500 text-sm">
              Please enter a valid URL!
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
