"use client";

import completeOnboarding from "@/lib/actions/completeOnboarding";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import getImageUrl from "@/lib/utils/getImageUrl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { z } from "zod";
import ImagePreview from "./ImagePreview";

const FormSchema = z.object({
  name: z
    .string()
    .max(50, "Name must be less than 50 characters")
    .regex(new RegExp("^[a-zA-Z ]+$"), "No special character allowed!")
    .optional(),
  bio: z.string().max(150, "Bio must be less than 150 characters").optional(),
  profileImage: z
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
      const imageUrl = await getImageUrl(imagePreview, image);

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
                        width={200}
                        height={200}
                        src={imagePreview}
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
