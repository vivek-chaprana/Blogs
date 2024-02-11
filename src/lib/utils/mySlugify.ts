import slugify from "slugify";

export default function mySlugify(text: string) {
  return slugify(text, { lower: true, strict: true });
}
