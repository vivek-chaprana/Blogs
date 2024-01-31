import {
  Button,
  ButtonProps,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Editor } from "@tiptap/react";
import { MouseEvent, useState } from "react";
import { RiLink, RiLinkUnlink } from "react-icons/ri";
import { z } from "zod";
import { TooltipButton } from ".";

interface LinkUnlinkBtnProps extends ButtonProps {
  editor: Editor;
}

export default function LinkUnlinkBtn({ editor, variant }: LinkUnlinkBtnProps) {
  const [isLinkPopupOpen, setIsLinkPopupOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [url, setUrl] = useState("");

  const urlInputSchema = z.string().url();

  const handleLinking = () => {
    try {
      urlInputSchema.parse(url);
    } catch {
      setIsInvalid(true);
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setUrl("");
    setIsInvalid(false);
  };

  return !editor.getAttributes("link").href ? (
    <Popover
      isOpen={isLinkPopupOpen}
      onOpenChange={(open) => setIsLinkPopupOpen(open)}
    >
      <PopoverTrigger>
        <Button isIconOnly variant={variant} className="text-xl">
          <RiLink />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form className="m-2 flex flex-col gap-2">
          <Input
            errorMessage={isInvalid && "Please enter a valid URL!"}
            name="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setIsInvalid(false);
            }}
            type="url"
            labelPlacement="outside"
            placeholder="Enter URL"
            className="w-full p-0 "
            variant="bordered"
          />
          <div className="w-full flex justify-between">
            <Button
              className="bg-dark-200 text-gr hover:bg-black hover:text-white"
              onClick={handleLinking}
            >
              Add
            </Button>
            <Button
              color="danger"
              variant="light"
              onClick={() => setIsLinkPopupOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  ) : (
    <TooltipButton
      variant={variant}
      content="unlink"
      icon={<RiLinkUnlink />}
      onClick={() => editor.chain().focus().unsetLink().run()}
    />
  );
}
