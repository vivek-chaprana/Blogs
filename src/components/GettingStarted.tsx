"use client";

import completeOnboarding from "@/lib/actions/completeOnboarding";
import { fallbackImageUrl } from "@/lib/constants";
import uploadImage from "@/lib/utils/uploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  name: z
    .string()
    .max(50, "Name must be less than 50 characters")
    .regex(new RegExp("^[a-zA-Z ]+$"), "No special character allowed!")
    .optional(),
  bio: z.string().max(150, "Bio must be less than 150 characters").optional(),
  profileImage: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB."
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
});

type InputType = z.infer<typeof FormSchema>;

export default function GettingStarted({
  shouldOpen,
  image,
  name: authName,
}: {
  shouldOpen?: boolean;
  image?: string | null;
  name?: string | null;
}) {
  const { update } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<null | string>(
    image || null
  );
  const { isOpen, onOpenChange } = useDisclosure();

  const getStarted = async (data: InputType) => {
    setIsLoading(true);
    try {
      const image = data.profileImage?.[0];
      const imageUrl =
        imagePreview &&
        (imagePreview.startsWith("https://") ||
          imagePreview.startsWith("http://"))
          ? imagePreview
          : image
          ? await uploadImage(image)
          : null;

      await completeOnboarding({
        name: data.name,
        bio: data.bio,
        profileImage: imageUrl,
      });

      await update();
      toast.success("Profile updated successfully!");
      onOpenChange();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipOnboarding = async () => {
    try {
      await completeOnboarding({});
      await update();
      toast.success(
        "Onboarding skipped! You can update your profile later from the settings."
      );
      onOpenChange();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    function handleImagePreview() {
      const image = watch()?.profileImage?.[0];
      if (image) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e?.target?.result as string);
        };
        reader.readAsDataURL(image);
      } else {
        setImagePreview(null);
      }
    }
    handleImagePreview();
  }, [watch().profileImage]);

  useEffect(() => {
    setImagePreview(image ?? null);
  }, [image]);

  const resetImage = () => {
    reset({
      profileImage: null,
    });
    setImagePreview(null);
  };

  return (
    <main className="min-h-screen">
      <Modal
        isOpen={shouldOpen && !isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="4xl"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Getting Started</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    defaultValue={authName ?? ""}
                    {...register("name")}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    className="w-1/2"
                    label="Name"
                    placeholder=" "
                    variant="bordered"
                    labelPlacement="outside"
                  />
                  <Textarea
                    {...register("bio")}
                    isInvalid={!!errors.bio}
                    errorMessage={errors.bio?.message}
                    variant="bordered"
                    label="Bio"
                    labelPlacement="outside"
                    placeholder=""
                    className="col-span-12 md:col-span-6 mb-6 md:mb-0 w-2/3"
                  />
                  <label htmlFor="image" className="text-sm -mb-2">
                    Profile picture
                  </label>
                  <div className="flex">
                    {!!imagePreview ? (
                      <ImagePreview
                        url={imagePreview}
                        resetImage={resetImage}
                      />
                    ) : (
                      <label
                        htmlFor="image-upload"
                        className="p-5 bg-offWhite border-gray border-2 rounded-lg flex flex-col justify-center items-center cursor-pointer"
                      >
                        <FaCloudUploadAlt fill="#2b2b2b" className="text-6xl" />
                        <p>Upload an image</p>
                      </label>
                    )}
                    <input
                      {...register("profileImage")}
                      type="file"
                      className="hidden"
                      id="image-upload"
                      accept="image/*"
                    />
                  </div>
                  {!!errors.profileImage && (
                    <p className="text-red-500 text-xs -mt-2 ms-2">
                      {errors.profileImage.message as string}
                    </p>
                  )}
                </form>
              </ModalBody>
              <ModalFooter className="justify-between gap-5">
                <Button
                  // onClick={handleSubmit(async (data: InputType) => {
                  //   await getStarted(data);
                  //   onClose();
                  // })}
                  onClick={handleSubmit(getStarted)}
                  type="submit"
                  className="bg-black text-white"
                  isLoading={isLoading}
                >
                  Finish
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  isDisabled={isLoading}
                  onClick={handleSkipOnboarding}
                >
                  Skip
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}

const ImagePreview = ({
  url,
  resetImage,
}: {
  url: string;
  resetImage: MouseEventHandler;
}) => (
  <div className="p-5 relative group">
    <Image
      width={200}
      height={200}
      alt="NextUI hero Image with delay"
      src={url || fallbackImageUrl}
      className="border border-gray"
    />
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-5 rounded-b-lg  z-10 rounded-t-full h-1/3 w-4/5 opacity-0 group-hover:opacity-85 transition duration-1000 ease-out
shadow-[inset_0px_-70px_29px_20px_rgba(0,0,0,0.25)] "
    ></div>
    <div
      onClick={resetImage}
      className="bg-red-300 text-lg text-red-600 rounded-full p-2 absolute bottom-0 left-1/2 -translate-x-1/2 z-10 translate-y-5 opacity-0 group-hover:-translate-y-10 group-hover:opacity-90 hover:scale-105 cursor-pointer transition-all"
    >
      <FaTrash />
    </div>
  </div>
);
