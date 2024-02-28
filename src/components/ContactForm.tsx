"use client";

import submitContactForm from "@/lib/actions/submitContactForm";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { User } from "next-auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(1, "Subject is required."),
  message: z
    .string()
    .min(25, "Message should be minimum 25 characters.")
    .refine((val) => val.replace(/\s/g, "").length > 25, {
      message: "Message should be minimum 25 characters.",
    }),
});

type FormInputs = z.infer<typeof FormSchema>;

export default function ContactForm({ user }: { user?: User }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: zodResolver(FormSchema) });

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    try {
      await submitContactForm(data);
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <section id="contact-us" className="max-w-4xl mx-auto px-2 py-10 xs:p-10 ">
      <h3 className="text-2xl xs:text-3xl font-serif font-bold my-10">
        Contact Us
      </h3>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="Name"
          {...register("name")}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          defaultValue={user?.name || ""}
          variant="underlined"
          className="w-full bg-white"
          isRequired
        />

        <Input
          type="email"
          label="Email"
          {...register("email")}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          defaultValue={user?.email || ""}
          variant="underlined"
          className="w-full bg-white"
          isRequired
        />

        <Input
          type="text"
          label="Subject"
          {...register("subject")}
          isInvalid={!!errors.subject}
          errorMessage={errors.subject?.message}
          variant="underlined"
          className="w-full bg-white"
          isRequired
        />

        <Textarea
          label="Message"
          {...register("message")}
          isInvalid={!!errors.message}
          errorMessage={errors.message?.message}
          variant="underlined"
          className="w-full bg-white"
          isRequired
        />

        <Button
          isLoading={isLoading}
          type="submit"
          className="text-white bg-dark-200 w-min"
        >
          Submit
        </Button>
      </form>
    </section>
  );
}
