"use client";
import {
  Button,
  Input,
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
import { BsFlag } from "react-icons/bs";

export default function ReportBlogModal() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState<string>();

  return (
    <span className="flex items-center gap-1">
      <Button onPress={onOpen} variant="light" size="sm" isIconOnly>
        <BsFlag className="text-lg" />
      </Button>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold">Report Blog</ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-3">
                  <RadioGroup
                    label="Select a suitable reason : "
                    value={selected}
                    onValueChange={setSelected}
                  >
                    <Radio value="buenos-1">Lorem, ipsum dolor.</Radio>
                    <Radio value="buenos-2">Lorem, ipsum dolor.</Radio>
                    <Radio value="buenos-4">Lorem, ipsum dolor.</Radio>
                    <Radio value="buenos-5">Lorem, ipsum dolor.</Radio>
                    <Radio value="buenos-6">Other</Radio>
                  </RadioGroup>
                  <Textarea label="Report" variant="underlined" />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light">
                  Cancel
                </Button>
                <Button color="warning" className="text-white">
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
