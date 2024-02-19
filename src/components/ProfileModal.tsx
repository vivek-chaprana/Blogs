"use client";
import updateUserInfo from "@/lib/actions/updateUserInfo";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  fallbackImageUrl,
} from "@/lib/constants";
import getImageUrl from "@/lib/utils/getImageUrl";
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
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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

type InputType = z.infer<typeof FormSchema>;
export default function ProfileModal({ profile }: { profile: User }) {
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
    profile.image
  );
  const [coverImagePreview, setCoverImagePreview] = useState<null | string>(
    profile.coverImage
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const profileImageWatcher = watch()?.profileImage;
  const coverImageWatcher = watch()?.coverImage;

  useEffect(() => {
    function handleImagePreview() {
      const image = profileImageWatcher?.[0];
      if (image) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e?.target?.result as string);
        };
        reader.readAsDataURL(image);
      }
    }
    handleImagePreview();
  }, [profileImageWatcher]);

  useEffect(() => {
    function handleImagePreview() {
      const image = coverImageWatcher?.[0];
      if (image) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCoverImagePreview(e?.target?.result as string);
        };
        reader.readAsDataURL(image);
      }
    }
    handleImagePreview();
  }, [coverImageWatcher]);

  if (!profile) return null;

  const resetImage = () => {
    reset({
      profileImage: null,
    });
    setImagePreview(null);
  };

  const resetCoverImage = () => {
    reset({
      coverImage: null,
    });
    setCoverImagePreview(null);
  };

  const handleProfileInfoUpdate = async (data: InputType) => {
    setIsLoading(true);

    try {
      const profileImage = data.profileImage?.[0];
      const profileImageUrl = await getImageUrl(imagePreview, profileImage);

      const coverImage = data.coverImage?.[0];
      const coverImageUrl = await getImageUrl(coverImagePreview, coverImage);

      await updateUserInfo({
        name: data.name,
        bio: data.bio,
        profileImage: profileImageUrl,
        coverImage: coverImageUrl,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      await update();
      setIsLoading(false);
      reset();
      onOpenChange();
      router.refresh();
    }
  };

  return (
    <>
      <div
        className="w-[700px] justify-between px-5 py-2 my-5 rounded-xl flex cursor-pointer hover:bg-gray-100 transition-colors duration-150"
        onClick={onOpen}
      >
        <span>
          <h4 className="font-semibold">Profile information</h4>
          <p className="text-sm">Edit your name, photo, bio, etc.</p>
        </span>

        <span className="flex items-center gap-3">
          <p className="min-w-fit ">{profile.name}</p>
          <Image
            src={profile.image ?? fallbackImageUrl}
            alt={profile.name || "@" + profile.username}
            width={40}
            height={40}
          />
        </span>
      </div>
      <Modal
        hideCloseButton={isLoading}
        isKeyboardDismissDisabled={isLoading}
        isDismissable={!isLoading}
        scrollBehavior="inside"
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold">
                Profile information
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <label htmlFor="image" className="text-sm -mb-2 ">
                    Photo
                  </label>
                  <div className="flex">
                    {!!imagePreview ? (
                      <ImagePreview
                        src={imagePreview}
                        width={150}
                        height={150}
                        resetImage={resetImage}
                      />
                    ) : (
                      <label
                        htmlFor="image-upload"
                        className="p-5 bg-offWhite border-gray border-2 rounded-lg flex flex-col justify-center items-center cursor-pointer"
                      >
                        <FaCloudUploadAlt fill="#2b2b2b" className="text-6xl" />
                        <p>Upload profile photo</p>
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
                  <Input
                    disabled={isLoading}
                    defaultValue={profile.name ?? ""}
                    {...register("name")}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    className="w-1/2"
                    label="Name"
                    variant="underlined"
                  />
                  <Textarea
                    disabled={isLoading}
                    {...register("bio")}
                    isInvalid={!!errors.bio}
                    errorMessage={errors.bio?.message}
                    defaultValue={profile.bio ?? ""}
                    className="w-4/5"
                    label="Bio"
                    variant="underlined"
                  />
                  <label htmlFor="image" className="text-sm -mb-2">
                    Cover Photo
                  </label>
                  <div className="flex">
                    {!!coverImagePreview ? (
                      <ImagePreview
                        height={100}
                        width="100%"
                        rounded="none"
                        radius="none"
                        src={coverImagePreview}
                        resetImage={resetCoverImage}
                      />
                    ) : (
                      <label
                        htmlFor="cover-image-upload"
                        className="p-5 w-4/5 bg-offWhite border-gray border-2 rounded-lg flex flex-col justify-center items-center cursor-pointer"
                      >
                        <FaCloudUploadAlt fill="#2b2b2b" className="text-6xl" />
                        <p>Upload cover photo</p>
                      </label>
                    )}
                    <input
                      {...register("coverImage")}
                      type="file"
                      className="hidden"
                      id="cover-image-upload"
                      accept="image/*"
                    />
                  </div>
                  {!!errors.coverImage && (
                    <p className="text-red-500 text-xs -mt-2 ms-2">
                      {errors.coverImage.message as string}
                    </p>
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => !isLoading && onClose()}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  color="primary"
                  onClick={handleSubmit(handleProfileInfoUpdate)}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
