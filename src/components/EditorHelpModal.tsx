import {
  Button,
  Kbd,
  KbdKey,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  UseDisclosureProps,
} from "@nextui-org/react";
import Link from "next/link";

type Props = {
  modal: UseDisclosureProps;
};

type KeyCombination = {
  primaryKey: KbdKey | KbdKey[];
  secondaryKey: string;
};

type KeyboardShortcut = {
  Command: string;
  windows: KeyCombination | KeyCombination[];
  macOS: KeyCombination | KeyCombination[];
};

const essentials: KeyboardShortcut[] = [
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

const textFormatting: KeyboardShortcut[] = [
  {
    Command: "Bold",
    windows: {
      primaryKey: "ctrl",
      secondaryKey: "B",
    },
    macOS: {
      primaryKey: "command",
      secondaryKey: "B",
    },
  },
  {
    Command: "Italicize",
    windows: {
      primaryKey: "ctrl",
      secondaryKey: "I",
    },
    macOS: {
      primaryKey: "command",
      secondaryKey: "I",
    },
  },
  {
    Command: "Underline",
    windows: {
      primaryKey: "ctrl",
      secondaryKey: "U",
    },
    macOS: {
      primaryKey: "command",
      secondaryKey: "U",
    },
  },
  {
    Command: "Strikethrough",
    windows: {
      primaryKey: ["ctrl", "shift"],
      secondaryKey: "X",
    },
    macOS: {
      primaryKey: ["command", "shift"],
      secondaryKey: "X",
    },
  },
  {
    Command: "Highlight",
    windows: {
      primaryKey: ["ctrl", "shift"],
      secondaryKey: "H",
    },
    macOS: {
      primaryKey: ["command", "shift"],
      secondaryKey: "H",
    },
  },
  {
    Command: "Code",
    windows: {
      primaryKey: "ctrl",
      secondaryKey: "E",
    },
    macOS: {
      primaryKey: "command",
      secondaryKey: "E",
    },
  },
];

const paragraphFormatting: KeyboardShortcut[] = [
  {
    Command: "Apply normal text style",
    windows: {
      primaryKey: ["ctrl"],
      secondaryKey: " + alt +0",
    },
    macOS: {
      primaryKey: ["command"],
      secondaryKey: " + alt + 0",
    },
  },
  {
    Command: "Apply heading style 1",
    windows: {
      primaryKey: ["ctrl"],
      secondaryKey: " + alt + 1",
    },
    macOS: {
      primaryKey: ["command"],
      secondaryKey: " + alt + 1",
    },
  },
  {
    Command: "Apply heading style 2",
    windows: {
      primaryKey: ["ctrl"],
      secondaryKey: " + alt + 2",
    },
    macOS: {
      primaryKey: ["command"],
      secondaryKey: " + alt + 2",
    },
  },
  {
    Command: "Apply heading style 3",
    windows: {
      primaryKey: ["ctrl"],
      secondaryKey: " + alt + 3",
    },
    macOS: {
      primaryKey: ["command"],
      secondaryKey: " + alt + 3",
    },
  },
  {
    Command: "Apply heading style 4",
    windows: {
      primaryKey: ["ctrl"],
      secondaryKey: " + alt + 4",
    },
    macOS: {
      primaryKey: ["command"],
      secondaryKey: " + alt + 4",
    },
  },
  {
    Command: "Apply heading style 5",
    windows: {
      primaryKey: ["ctrl"],
      secondaryKey: " + alt + 5",
    },
    macOS: {
      primaryKey: ["command"],
      secondaryKey: " + alt + 5",
    },
  },
  {
    Command: "Apply heading style 6",
    windows: {
      primaryKey: ["ctrl"],
      secondaryKey: " + alt + 6",
    },
    macOS: {
      primaryKey: ["command"],
      secondaryKey: " + alt + 6",
    },
  },
  {
    Command: "Ordered list",
    windows: {
      primaryKey: ["ctrl", "shift"],
      secondaryKey: "7",
    },
    macOS: {
      primaryKey: ["command", "shift"],
      secondaryKey: "7",
    },
  },
  {
    Command: "Bullet list",
    windows: {
      primaryKey: ["ctrl", "shift"],
      secondaryKey: "8",
    },
    macOS: {
      primaryKey: ["command", "shift"],
      secondaryKey: "8",
    },
  },
  {
    Command: "Task list",
    windows: {
      primaryKey: ["ctrl", "shift"],
      secondaryKey: "9",
    },
    macOS: {
      primaryKey: ["command", "shift"],
      secondaryKey: "9",
    },
  },
  {
    Command: "Blockquote",
    windows: {
      primaryKey: ["ctrl", "shift"],
      secondaryKey: "B",
    },
    macOS: {
      primaryKey: ["command", "shift"],
      secondaryKey: "B",
    },
  },
  {
    Command: "Left align",
    windows: {
      primaryKey: ["ctrl", "shift"],
      secondaryKey: "L",
    },
    macOS: {
      primaryKey: ["command", "shift"],
      secondaryKey: "L",
    },
  },
  {
    Command: "Center align",
    windows: {
      primaryKey: ["ctrl", "shift"],
      secondaryKey: "E",
    },
    macOS: {
      primaryKey: ["command", "shift"],
      secondaryKey: "E",
    },
  },
  {
    Command: "Right align",
    windows: {
      primaryKey: ["ctrl", "shift"],
      secondaryKey: "R",
    },
    macOS: {
      primaryKey: ["command", "shift"],
      secondaryKey: "R",
    },
  },
  {
    Command: "Justify",
    windows: {
      primaryKey: ["ctrl", "shift"],
      secondaryKey: "J",
    },
    macOS: {
      primaryKey: ["command", "shift"],
      secondaryKey: "J",
    },
  },
  {
    Command: "Code block",
    windows: {
      primaryKey: ["ctrl"],
      secondaryKey: " + alt + C",
    },
    macOS: {
      primaryKey: ["command"],
      secondaryKey: " + alt + C",
    },
  },
  {
    Command: "Subscript",
    windows: {
      primaryKey: "ctrl",
      secondaryKey: ",",
    },
    macOS: {
      primaryKey: "command",
      secondaryKey: ",",
    },
  },
  {
    Command: "Superscript",
    windows: {
      primaryKey: "ctrl",
      secondaryKey: ".",
    },
    macOS: {
      primaryKey: "command",
      secondaryKey: ".",
    },
  },
];

const textSelection: KeyboardShortcut[] = [
  {
    Command: "Select all",
    windows: {
      primaryKey: "ctrl",
      secondaryKey: "A",
    },
    macOS: {
      primaryKey: "command",
      secondaryKey: "A",
    },
  },
  {
    Command: "Extend selection one character to left",
    windows: {
      primaryKey: ["shift", "left"],
      secondaryKey: "",
    },
    macOS: {
      primaryKey: ["shift", "left"],
      secondaryKey: "",
    },
  },
  {
    Command: "Extend selection one character to right",
    windows: {
      primaryKey: ["shift", "right"],
      secondaryKey: "",
    },
    macOS: {
      primaryKey: ["shift", "right"],
      secondaryKey: "",
    },
  },
  {
    Command: "Extend selection one line up",
    windows: {
      primaryKey: ["shift", "up"],
      secondaryKey: "",
    },
    macOS: {
      primaryKey: ["shift", "up"],
      secondaryKey: "",
    },
  },
  {
    Command: "Extend selection one line down",
    windows: {
      primaryKey: ["shift", "down"],
      secondaryKey: "",
    },
    macOS: {
      primaryKey: ["shift", "down"],
      secondaryKey: "",
    },
  },
  {
    Command: "Extend selection to the beginning of the document",
    windows: {
      primaryKey: ["ctrl", "shift", "up"],
      secondaryKey: "",
    },
    macOS: {
      primaryKey: ["command", "shift", "up"],
      secondaryKey: "",
    },
  },
  {
    Command: "Extend selection to the end of the document",
    windows: {
      primaryKey: ["ctrl", "shift", "down"],
      secondaryKey: "",
    },
    macOS: {
      primaryKey: ["command", "shift", "down"],
      secondaryKey: "",
    },
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
            <ModalHeader className="flex flex-col gap-1">Guide</ModalHeader>
            <ModalBody>
              <section>
                <h2 className="text-2xl  font-semibold mb-3">Introduction</h2>
                <p>
                  Our editor is a powerful tool that allows you to write great
                  blogs and stories. It is designed to be easy to use and to
                  help you focus on your writing. It comes with sensible
                  keyboard shortcuts and a clean interface.
                </p>
              </section>

              <section className="py-5">
                <h2 className="text-2xl font-semibold">
                  Menu and Toolbar Overview
                </h2>
                <p className="py-2">
                  Our editor comes with different types of menus and toolbars
                  for east access to different features.
                </p>

                <ul>
                  <li>
                    <strong>Topbar</strong> - The most feature rich toolbar that
                    contains all the features, located at the top of the editor.
                  </li>
                  <li>
                    <strong>Bubble</strong> - A floating toolbar that appears
                    when you select a text, located at the top of the selected
                    text.
                  </li>
                  <li>
                    <strong>Floating</strong> - A floating toolbar that appears
                    when you hover over the editor, appears when you start
                    wrtiting in a new line for faster access to different types
                    of elements.
                  </li>
                </ul>

                <p className="pt-2">
                  You can select the editors by clicking the settings icon, on
                  top of your editor.
                </p>
              </section>

              <section className="flex flex-col gap-5 pt-5 pb-10">
                <h2 className="text-2xl font-semibold">Keyboard Shortcuts</h2>

                <div>
                  <h3 className="text-lg font-medium mb-3">General</h3>
                  Our editor supports all markdown shortcuts. You can check them
                  out at{" "}
                  <Link
                    className="underline underline-offset-1 font-normal"
                    href="https://www.markdownguide.org/cheat-sheet/"
                    target="_blank"
                  >
                    Markdown Guide
                  </Link>{" "}
                  .
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Essentials</h3>
                  <ShortcutsTable shortcutArray={essentials} />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Text Formatting</h3>
                  <ShortcutsTable shortcutArray={textFormatting} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Paragraph Formatting
                  </h3>
                  <ShortcutsTable shortcutArray={paragraphFormatting} />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Text Selection</h3>
                  <ShortcutsTable shortcutArray={textSelection} />
                </div>
              </section>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} className="bg-dark-200 text-gray-50">
                Done
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

function ShortcutsTable({
  shortcutArray,
}: {
  shortcutArray: KeyboardShortcut[];
}) {
  return (
    <Table className="dark text-gray-100">
      <TableHeader>
        <TableColumn>Command</TableColumn>
        <TableColumn>Windows / Linux</TableColumn>
        <TableColumn>Mac OS</TableColumn>
      </TableHeader>
      <TableBody>
        {shortcutArray.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.Command}</TableCell>
            <TableCell>
              <div className="inline-flex gap-2">
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
              </div>
            </TableCell>
            <TableCell>
              <div className="inline-flex gap-2">
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
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
