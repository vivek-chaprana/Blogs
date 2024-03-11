"use client";
import { fallbackCoverImageUrl } from "@/lib/constants";
import {
  Button,
  ButtonProps,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import { BsCheck2, BsCopy, BsShare, BsThreeDots } from "react-icons/bs";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const platforms = [
  {
    name: "Facebook",
    icon: FacebookIcon,
    shareButton: FacebookShareButton,
  },
  {
    name: "Email",
    icon: EmailIcon,
    shareButton: EmailShareButton,
  },
  {
    name: "Linkedin",
    icon: LinkedinIcon,
    shareButton: LinkedinShareButton,
  },
  {
    name: "Twitter",
    icon: TwitterIcon,
    shareButton: TwitterShareButton,
  },
  {
    name: "Telegram",
    icon: TelegramIcon,
    shareButton: TelegramShareButton,
  },
  {
    name: "Whatsapp",
    icon: WhatsappIcon,
    shareButton: WhatsappShareButton,
  },
  {
    name: "Reddit",
    icon: RedditIcon,
    shareButton: RedditShareButton,
  },
  {
    name: "Pinterest",
    icon: PinterestIcon,
    shareButton: PinterestShareButton,
  },
  {
    name: "Line",
    icon: LineIcon,
    shareButton: LineShareButton,
  },
];

export default function ShareButton({
  url,
  title,
  media,
  desc,
  tags,
  children,
  ...rest
}: {
  url: string;
  title?: string;
  media?: string;
  desc?: string;
  tags?: string[];
  children?: React.ReactNode;
} & ButtonProps) {
  const [copied, setCopied] = useState(false);

  return (
    <Popover backdrop="blur" placement="bottom">
      <PopoverTrigger>
        <Button variant="light" size="sm" isIconOnly {...rest}>
          {children || <BsShare className="text-lg" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="flex gap-3 justify-center flex-wrap px-2 py-1">
          {platforms.map((platform, index) => (
            <Tooltip content={platform.name} key={index} closeDelay={0}>
              <platform.shareButton
                key={index}
                url={url}
                media={media ?? fallbackCoverImageUrl}
                title={title}
                description={desc}
                hashtags={tags}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden hover:scale-110 active:scale-95 transition-transform duration-75">
                  <platform.icon />
                </div>
              </platform.shareButton>
            </Tooltip>
          ))}
          <Tooltip content="Copy link" closeDelay={0}>
            <div
              className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden hover:scale-110 active:scale-95 transition-transform duration-75 cursor-pointer"
              onClick={() => {
                if (!url) return;
                navigator.clipboard.writeText(url);
                setCopied(true);
              }}
            >
              {copied ? (
                <BsCheck2 className="text-lg text-green-600 font-semibold" />
              ) : (
                <BsCopy className="text-lg" />
              )}
            </div>
          </Tooltip>

          <Tooltip content="Other options" closeDelay={0}>
            <div
              className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden hover:scale-110 active:scale-95 transition-transform duration-75 cursor-pointer"
              onClick={() => {
                navigator &&
                  navigator.share({
                    text: `${title} - ${desc}\n\n`,
                    url,
                  });
              }}
            >
              <BsThreeDots className="text-lg" />
            </div>
          </Tooltip>
        </div>
      </PopoverContent>
    </Popover>
  );
}
