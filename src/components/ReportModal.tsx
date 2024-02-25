"use client";
import sendReport from "@/lib/actions/sendReport";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsFlag } from "react-icons/bs";
import { z } from "zod";

const blogReasons = [
  "Inappropriate Content",
  "Misinformation or Inaccuracy",
  "Copyright Violation",
  "Spam or Unwanted Content",
  "Privacy Violation",
  "Hate Speech or Harassment",
  "Other",
];

const commentReasons = [
  "Inappropriate Content",
  "Personal Attacks or Harassment",
  "Spam or Unrelated Content",
  "Misinformation or Inaccuracy",
  "Violent or Threatening Language",
  "Hate Speech or Discrimination",
  "Other",
];

export default function ReportModal(
  props: ButtonProps & { id: string; reported: "blog" | "comment" }
) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const reasons = props.reported === "blog" ? blogReasons : commentReasons;
  const [selected, setSelected] = useState<string>(reasons[0]);

  const FormSchema = z.object({
    other: z
      .string()
      .optional()
      .refine(
        (val) => (selected === reasons[reasons.length - 1] ? !!val : true),
        { message: "Please specify the reason" }
      ),
  });

  type FormValues = z.infer<typeof FormSchema>;

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<FormValues>({ resolver: zodResolver(FormSchema) });
  const [isLoading, setIsLoading] = useState(false);

  const handleReport = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await sendReport(props.reported, props.id, {
        reason: selected,
        other: data.other,
      });
      toast.success("Blog reported successfully!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      reset();
      onClose();
    }
  };

  return (
    <span className="flex items-center gap-1">
      <Button onPress={onOpen} variant="light" size="sm" isIconOnly {...props}>
        <BsFlag className="text-lg" />
      </Button>
      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        hideCloseButton={isLoading}
        isKeyboardDismissDisabled={isLoading}
        isDismissable={!isLoading}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold capitalize">
                Report {props.reported}
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-3">
                  <RadioGroup
                    label="Select a suitable reason : "
                    value={selected}
                    onValueChange={setSelected}
                  >
                    {reasons.map((reason, index) => (
                      <Radio key={index} value={reason}>
                        {reason}
                      </Radio>
                    ))}
                  </RadioGroup>
                  {selected === "Other" && (
                    <Textarea
                      {...register("other")}
                      isInvalid={!!errors.other}
                      errorMessage={errors.other?.message}
                      label="Other reason"
                      placeholder="Please specify the reason"
                    />
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => !isLoading && onClose()}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-dark-200 text-white"
                  isLoading={isLoading}
                  onClick={handleSubmit(handleReport)}
                >
                  Report
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </span>
  );
}
