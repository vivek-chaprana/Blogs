// Reading Time = Total Word Count / 238 + (Number of Images * 0.083)

import { TIME_PER_IMAGE, WORDS_PER_MINUTE } from "@/lib/constants";

export default function getReadingTime(wordCount: number, imageCount = 0) {
  const minutes = Math.ceil(
    wordCount / WORDS_PER_MINUTE + imageCount * TIME_PER_IMAGE
  );

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return {
    hours,
    minutes: remainingMinutes,
  };
}
