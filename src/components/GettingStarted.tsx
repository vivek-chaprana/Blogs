"use client";

import completeOnboarding from "@/lib/actions/completeOnboarding";
import getTopics from "@/lib/actions/getCategories";
import getSomePeopleToFollow from "@/lib/actions/getSomePeopleToFollow";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  fallbackImageUrl,
} from "@/lib/constants";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import getImageUrl from "@/lib/utils/getImageUrl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Chip,
  Divider,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import { Topic, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { z } from "zod";
import ImagePreview from "./ImagePreview";
import FollowButton from "./sub-components/FollowButton";

export const ONBOARDING_STEPS = [
  {
    title: "Profile information",
    fields: ["name", "bio", "profileImage"],
  },
  {
    title: "Select topics",
    fields: ["topics"],
  },
  {
    title: "Follow people",
    fields: ["followPeople"],
  },
];

const FormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters")
    .regex(new RegExp("^[a-zA-Z ]+$"), "No special character allowed!"),
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
  topics: z
    .array(z.string())
    .min(3, "Please select at least 3 topics to continue"),
});

type InputType = z.infer<typeof FormSchema>;

type FieldName = keyof InputType;

export default function GettingStarted({
  shouldOpen,
  image,
  name: authName,
  userId,
}: {
  shouldOpen?: boolean;
  image?: string | null;
  name?: string | null;
  userId: string;
}) {
  const { data, update } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<null | string>(
    image || null
  );
  const { isOpen, onOpenChange } = useDisclosure();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const profileImageWatcher = watch()?.profileImage;

  const prevStep = () => {
    currentStep > 0 && setCurrentStep(currentStep - 1);
  };

  const nextStep = async () => {
    const fields = ONBOARDING_STEPS[currentStep].fields;

    if (fields.includes("topics")) {
      setValue("topics", selectedTopics);
    }

    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep === ONBOARDING_STEPS.length - 1) {
      handleSubmit(getStarted)();
    }

    currentStep < ONBOARDING_STEPS.length - 1 &&
      setCurrentStep(currentStep + 1);
  };

  const getStarted = async (data: InputType) => {
    setIsLoading(true);
    try {
      const image = data.profileImage?.[0];
      const imageUrl = await getImageUrl(imagePreview, image);

      await completeOnboarding({
        name: data.name,
        bio: data.bio,
        profileImage: imageUrl,
        topics: data.topics,
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

  useEffect(() => {
    function handleImagePreview() {
      const image = profileImageWatcher?.[0];
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
  }, [profileImageWatcher]);

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
        hideCloseButton
        scrollBehavior="inside"
        isOpen={shouldOpen && !isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="4xl"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                <div className="flex justify-center gap-10 w-full p-5">
                  {ONBOARDING_STEPS.map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col w-1/3 rounded-lg transition-colors duration-200"
                    >
                      <span
                        className={cn(
                          "rounded-full h-1 w-full bg-green-400 scale-x-0 transition-transform duration-300 ease-in-out origin-left transform",
                          currentStep >= index ? "scale-x-100" : ""
                        )}
                      ></span>

                      <h2
                        className={cn(
                          "text-sm font-semibold ",
                          currentStep >= index ? "text-green-500" : ""
                        )}
                      >
                        Step {++index}
                      </h2>
                      <h3 className="text-sm font-normal">{step.title}</h3>
                    </div>
                  ))}
                </div>
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  {currentStep === 0 && (
                    <>
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
                            <FaCloudUploadAlt
                              fill="#2b2b2b"
                              className="text-6xl"
                            />
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
                    </>
                  )}

                  {currentStep === 1 && (
                    <Step2
                      selectedTopics={selectedTopics}
                      setSelectedTopics={setSelectedTopics}
                      errors={errors}
                    />
                  )}

                  {currentStep === 2 && (
                    <Step3 userId={userId} selectedTopics={selectedTopics} />
                  )}
                </form>
              </ModalBody>
              <ModalFooter className="justify-between gap-5">
                <Button
                  color="danger"
                  variant="light"
                  isDisabled={isLoading}
                  onClick={prevStep}
                  className={currentStep === 0 ? "invisible" : ""}
                >
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  type="submit"
                  className="bg-black text-white"
                  isLoading={isLoading}
                >
                  {currentStep === ONBOARDING_STEPS.length - 1
                    ? "Finish"
                    : "Next"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}

const Step2 = ({
  selectedTopics,
  setSelectedTopics,
  errors,
}: {
  selectedTopics: string[];
  setSelectedTopics: React.Dispatch<SetStateAction<string[]>>;
  errors: FieldErrors<InputType>;
}) => {
  const [allTopics, setAllTopics] = useState<Topic[]>([]);

  useEffect(() => {
    async function fetchAllTopics() {
      try {
        const allTopics = await getTopics();
        setAllTopics(allTopics);
      } catch (e) {
        toast.error(getErrorMessage(e));
      }
    }

    fetchAllTopics();
  }, []);

  function addTopic(slug: string) {
    setSelectedTopics((prev) => [...prev, slug]);
  }

  function removeTopic(topicId: string) {
    setSelectedTopics((prev) => prev.filter((topic) => topic !== topicId));
  }

  return (
    <>
      <h2 className="text-base font-semibold">
        Select some topics you are interested in :{" "}
      </h2>
      <div className="flex flex-wrap gap-3">
        {!!selectedTopics.length && (
          <div className=" flex flex-wrap gap-3 ">
            {selectedTopics.map((topicId) => {
              const topic = allTopics.find((t) => t.id === topicId);
              return (
                <Chip
                  key={topicId}
                  onClose={() => removeTopic(topicId)}
                  className="bg-black text-white "
                >
                  {topic?.name}
                </Chip>
              );
            })}
          </div>
        )}

        {!!selectedTopics.length && <Divider />}
        {!!allTopics?.length &&
          allTopics.map(
            (topic) =>
              !selectedTopics.includes(topic.id) && (
                <Chip
                  key={topic.id}
                  variant="flat"
                  onClick={() => addTopic(topic.id)}
                  className="cursor-pointer "
                >
                  {topic.name}
                </Chip>
              )
          )}
      </div>

      {errors.topics && selectedTopics.length < 3 && (
        <p className="text-red-600 text-sm">
          {selectedTopics.length === 0
            ? "Please select at least 3 topics to continue."
            : `Please select ${
                3 - selectedTopics.length
              } more topics to continue.`}
        </p>
      )}
    </>
  );
};

const Step3 = ({
  selectedTopics,
  userId,
}: {
  selectedTopics?: string[];
  userId: string;
}) => {
  const [somePeopleToFollow, setSomePeopleToFollow] = useState<User[]>([]);

  useEffect(() => {
    async function fetchSomePeopleToFollow() {
      try {
        const somePeopleToFollow = await getSomePeopleToFollow(
          selectedTopics || []
        );
        setSomePeopleToFollow(somePeopleToFollow);
      } catch (e) {
        toast.error(getErrorMessage(e));
      }
    }

    fetchSomePeopleToFollow();
  }, [selectedTopics]);

  return (
    <>
      <h2 className="text-base font-semibold">Follow some people :</h2>
      <div className="flex flex-col gap-4 w-3/4 mx-auto">
        {somePeopleToFollow.map((person) => (
          <div key={person.id} className="flex justify-between">
            <div className="flex gap-3">
              <Image
                src={person.image || fallbackImageUrl}
                alt={person.name || "@" + person.username}
                width={50}
                height={50}
                radius="full"
              />

              <div className="flex flex-col ">
                <h4 className="font-semibold m-0 p-0">
                  {person.name || "@" + person.username}
                </h4>
                {!!person.name && (
                  <p className="font-light text-sm">@{person.username}</p>
                )}
                {person.bio && (
                  <p className="text-xs">
                    {person.bio?.substring(0, 75) +
                      (person.bio.length > 75 && " ...")}
                  </p>
                )}
              </div>
            </div>

            <FollowButton
              followerId={userId}
              followingId={person.id}
              variant="bordered"
              radius="full"
              size="sm"
              className="border-dark-200"
            />
          </div>
        ))}
      </div>
    </>
  );
};
