import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Switch,
  UseDisclosureProps,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Kbd,
  KbdKey,
} from "@nextui-org/react";

type Props = {
  modal: UseDisclosureProps;
};

type KeyCombination = {
  primaryKey: KbdKey | KbdKey[];
  secondaryKey: string;
};

const essentials: {
  Command: string;
  windows: KeyCombination | KeyCombination[];
  macOS: KeyCombination | KeyCombination[];
}[] = [
  {
    Command: "Copy",
    windows: {
      primaryKey: "ctrl",
      secondaryKey: "C",
    },
    macOS: {
      primaryKey: "command",
      secondaryKey: "C",
    },
  },
  {
    Command: "Cut",
    windows: {
      primaryKey: "ctrl",
      secondaryKey: "X",
    },
    macOS: {
      primaryKey: "command",
      secondaryKey: "X",
    },
  },
  {
    Command: "Paste",
    windows: {
      primaryKey: "ctrl",
      secondaryKey: "V",
    },
    macOS: {
      primaryKey: "command",
      secondaryKey: "V",
    },
  },
  {
    Command: "Paste without formatting",
    windows: {
      primaryKey: ["ctrl", "shift"],
      secondaryKey: "V",
    },
    macOS: {
      primaryKey: ["command", "shift"],
      secondaryKey: "V",
    },
  },
  {
    Command: "Undo",
    windows: {
      primaryKey: "ctrl",
      secondaryKey: "Z",
    },
    macOS: {
      primaryKey: "command",
      secondaryKey: "Z",
    },
  },
  {
    Command: "Redo",
    windows: {
      primaryKey: ["ctrl", "shift"],
      secondaryKey: "Z",
    },
    macOS: {
      primaryKey: ["command", "shift"],
      secondaryKey: "Z",
    },
  },
  {
    Command: "Add a line break",
    windows: [
      {
        primaryKey: ["shift", "enter"],
        secondaryKey: "",
      },
      {
        primaryKey: ["ctrl", "enter"],
        secondaryKey: "",
      },
    ],
    macOS: [
      {
        primaryKey: ["shift", "enter"],
        secondaryKey: "",
      },
      {
        primaryKey: ["command", "enter"],
        secondaryKey: "",
      },
    ],
  },
];

export default function EditorHelpModal(props: Props) {
  const { isOpen, onClose } = props.modal;
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size="5xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Help</ModalHeader>
            <ModalBody>
              <section>
                <h2 className="text-2xl">Introduction</h2>
                <p>
                  Our editor is a powerful tool that allows you to write great
                  blogs and stories. It is designed to be easy to use and to
                  help you focus on your writing. It comes with sensible
                  keyboard shortcuts and a clean interface.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">Keyboard Shortcuts</h2>

                <h3 className="text-lg font-medium">Essentials</h3>

                <Table>
                  <TableHeader>
                    <TableColumn>Command</TableColumn>
                    <TableColumn>Windows / Linux</TableColumn>
                    <TableColumn>Mac OS</TableColumn>
                  </TableHeader>

                  <TableBody>
                    {essentials.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.Command}</TableCell>
                        <TableCell>
                          {Array.isArray(item.windows) ? (
                            item.windows.map((i, index) => (
                              <Kbd key={index} keys={i.primaryKey}>
                                {i.secondaryKey}
                              </Kbd>
                            ))
                          ) : (
                            <Kbd keys={item.windows.primaryKey}>
                              {item.windows.secondaryKey}
                            </Kbd>
                          )}
                        </TableCell>
                        <TableCell>
                          {Array.isArray(item.macOS) ? (
                            item.macOS.map((i, index) => (
                              <Kbd key={index} keys={i.primaryKey}>
                                {i.secondaryKey}
                              </Kbd>
                            ))
                          ) : (
                            <Kbd keys={item.macOS.primaryKey}>
                              {item.macOS.secondaryKey}
                            </Kbd>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </section>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Done
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
