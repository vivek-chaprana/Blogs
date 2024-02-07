import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
} from "@nextui-org/react";

type EditorSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  showTopbar: boolean;
  setShowTopbar: (value: boolean) => void;
  showBubble: boolean;
  setShowBubble: (value: boolean) => void;
  showFloating: boolean;
  setShowFloating: (value: boolean) => void;
  showWordCounter: boolean;
  setShowWordCounter: (value: boolean) => void;
};

const EditorSettingsModal = (props: EditorSettingsModalProps) => {
  const {
    isOpen,
    onClose,
    showTopbar,
    setShowTopbar,
    showBubble,
    setShowBubble,
    showFloating,
    setShowFloating,
    showWordCounter,
    setShowWordCounter,
  } = props;
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editor settings
            </ModalHeader>
            <ModalBody>
              <div className=" flex flex-col gap-2 ">
                <Switch
                  size="sm"
                  className="capitalize"
                  isSelected={showTopbar}
                  onValueChange={setShowTopbar}
                >
                  Topbar
                </Switch>
                <Switch
                  size="sm"
                  className="capitalize"
                  isSelected={showBubble}
                  onValueChange={setShowBubble}
                >
                  Bubble Menu
                </Switch>
                <Switch
                  size="sm"
                  className="capitalize"
                  isSelected={showFloating}
                  onValueChange={setShowFloating}
                >
                  Floating Menu
                </Switch>
                <Switch
                  size="sm"
                  className="capitalize"
                  isSelected={showWordCounter}
                  onValueChange={setShowWordCounter}
                >
                  Word Counter
                </Switch>
              </div>
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
};

export default EditorSettingsModal;
