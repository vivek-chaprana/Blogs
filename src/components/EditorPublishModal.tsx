import getTopics from "@/lib/actions/getCategories";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { saveBlog } from "@/lib/utils/blogs";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import getImageUrl from "@/lib/utils/getImageUrl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { PostStatus, Topic } from "@prisma/client";
import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { z } from "zod";
import ImagePreview from "./ImagePreview";

const FormSchema = z.object({
  previewDesc: z
    .string()
    .max(150, "Description should be less than 150 characters")
    .optional(),
  topic: z.string().min(1, "Topic is required"),
  tags: z.string().optional(),
  coverImage: z
    .any()
    .optional()
    .refine(
      (files) => (files?.[0] ? files?.[0]?.size <= MAX_FILE_SIZE : true),
      "Max file size is 5MB."
    )
    .refine(
      (files) =>
        files?.[0] ? ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) : true,
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export type EditorPublishModalInputType = z.infer<typeof FormSchema> & {
  status: PostStatus;
};

type EditorPublishModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editor: Editor | null;
  title: string;
};

const EditorPublishModal = (props: EditorPublishModalProps) => {
  const { isOpen, onClose, editor, title } = props;
  const [categories, setCategories] = useState<Topic[]>([]);
  const [categoryValue, setCategoryValue] = useState<string>();
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<{
    for: PostStatus;
    value: boolean;
  }>({
    for: PostStatus.PUBLISHED,
    value: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditorPublishModalInputType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    getTopics().then((categories) => setCategories(categories));
  }, []);

  const resetCoverImage = () => {
    reset({
      coverImage: null,
    });
    setCoverImageUrl("");
  };

  console.log(errors);

  useEffect(() => {
    function handleImagePreview() {
      const image = watch()?.coverImage?.[0];
      if (image) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCoverImageUrl(e?.target?.result as string);
        };
        reader.readAsDataURL(image);
      }
    }
    handleImagePreview();
  }, [watch().coverImage]);

  const handleBlog = async (data: EditorPublishModalInputType) => {
    setIsLoading({
      for: data.status,
      value: true,
    });
    try {
      const coverImageFile = data.coverImage?.[0];
      const coverImage = await getImageUrl(coverImageUrl, coverImageFile);

      if (!editor) throw new Error("Editor not found!");

      if (editor.isEmpty) return toast.error("Blog content is required.");

      const content = editor.getJSON();

      await saveBlog({
        ...data,
        title,
        coverImage,
        content,
      });

      toast.success(
        data.status === PostStatus.PUBLISHED
          ? "Blog published successfully."
          : "Blog saved as draft successfully."
      );
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading({
        for: data.status,
        value: false,
      });
      reset();
      onClose();
    }
  };

  return (
    <Modal
      hideCloseButton={isLoading.value}
      isKeyboardDismissDisabled={isLoading.value}
      isDismissable={!isLoading.value}
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Publishing the story
            </ModalHeader>
            <ModalBody className="px-10 py-5">
              <div className="grid grid-cols-4">
                {/* Cover Image */}
                <div className="col-span-2">
                  <h4 className="font-semibold">Story Preview</h4>
                  <div className="p-5">
                    {!!coverImageUrl ? (
                      <ImagePreview
                        src={coverImageUrl}
                        resetImage={resetCoverImage}
                        className="max-h-[200px]"
                      />
                    ) : (
                      <label
                        htmlFor="image-upload"
                        className="p-5 bg-offWhite border-gray border-2 rounded-lg flex flex-col justify-center items-center cursor-pointer w-3/4"
                      >
                        <FaCloudUploadAlt fill="#2b2b2b" className="text-6xl" />
                        <p className="text-sm text-center">
                          Include a high-quality image in your story to make it
                          more inviting to readers.
                        </p>
                      </label>
                    )}
                    <input
                      {...register("coverImage")}
                      type="file"
                      className="hidden"
                      id="image-upload"
                      accept="image/*"
                    />
                    {!!errors.coverImage && (
                      <p className="text-red-500 text-xs -mt-2 ms-2">
                        {errors.coverImage.message as string}
                      </p>
                    )}
                  </div>
                </div>
                {/* Category */}
                <div className="col-span-2 flex flex-col gap-3">
                  <div>
                    <h4>
                      Publishing to: <strong> Vivek Chaprana</strong>
                    </h4>
                    <p className="text-sm">
                      Add or change topic so readers know what your story is
                      about
                    </p>
                  </div>

                  <div className="py-3">
                    <Autocomplete
                      {...register("topic")}
                      isInvalid={!!errors.topic}
                      errorMessage={errors.topic?.message}
                      defaultItems={categories}
                      label="Topic of blog"
                      labelPlacement="outside"
                      variant="underlined"
                      className="max-w-xs"
                      selectedKey={categoryValue}
                      onSelectionChange={(cat) => {
                        setCategoryValue(cat as string);
                      }}
                    >
                      {(cat) => (
                        <AutocompleteItem key={cat.slug}>
                          {cat.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </div>

                  <div>
                    <Textarea
                      {...register("tags")}
                      errorMessage={errors.tags?.message}
                      isInvalid={!!errors.tags}
                      label="Tags"
                      labelPlacement="outside"
                      variant="underlined"
                      placeholder="Add tags to your story, separated by commas"
                      className="max-w-xs"
                    />
                  </div>
                </div>
                {/* Title & Desc */}
                <div className="col-span-2 flex flex-col gap-3 ">
                  {/* <Input
                    {...register("title")}
                    errorMessage={errors.title?.message}
                    isInvalid={!!errors.title}
                    type="text"
                    className="w-4/5"
                    label="Preview title"
                    labelPlacement="outside"
                    variant="underlined"
                  /> */}
                  <Input
                    {...register("previewDesc")}
                    errorMessage={errors.previewDesc?.message}
                    isInvalid={!!errors.previewDesc}
                    type="text"
                    className="w-4/5"
                    label="Preview description"
                    labelPlacement="outside"
                    variant="underlined"
                  />
                </div>
                <div className="col-span-2 py-5 flex gap-5">
                  <Button
                    color="success"
                    className="text-white w-2/6"
                    onClick={handleSubmit((props) =>
                      handleBlog({
                        ...props,
                        status: PostStatus.PUBLISHED,
                      })
                    )}
                    isLoading={
                      isLoading.value && isLoading.for === PostStatus.PUBLISHED
                    }
                    disabled={isLoading.value}
                  >
                    Publish Now
                  </Button>
                  <Button
                    color="default"
                    variant="light"
                    onClick={handleSubmit((props) =>
                      handleBlog({
                        ...props,
                        status: PostStatus.DRAFT,
                      })
                    )}
                    className="w-2/6"
                    isLoading={
                      isLoading.value && isLoading.for === PostStatus.DRAFT
                    }
                    disabled={isLoading.value}
                  >
                    Save as Draft
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 text-xs text-center mt-5">
                <strong>Note: </strong>
                Changes here will affect how your story appears in public places
                like Medium&apos;s homepage and in subscribers&apos; inboxes —
                not the contents of the story itself.
              </p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditorPublishModal;
