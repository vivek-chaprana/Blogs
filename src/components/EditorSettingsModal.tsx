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
              <div className=" flex flex-col gap-2  ">
                <Switch
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-dark-200 ",
                  }}
                  size="md"
                  className="capitalize"
                  isSelected={showTopbar}
                  onValueChange={setShowTopbar}
                >
                  Topbar
                </Switch>
                <Switch
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-dark-200 ",
                  }}
                  size="md"
                  className="capitalize"
                  isSelected={showBubble}
                  onValueChange={setShowBubble}
                >
                  Bubble Menu
                </Switch>
                <Switch
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-dark-200 ",
                  }}
                  size="md"
                  className="capitalize"
                  isSelected={showFloating}
                  onValueChange={setShowFloating}
                >
                  Floating Menu
                </Switch>
                <Switch
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-dark-200 ",
                  }}
                  size="md"
                  className="capitalize"
                  isSelected={showWordCounter}
                  onValueChange={setShowWordCounter}
                >
                  Word Counter
                </Switch>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="bg-dark-200 text-gray-50"
                onPress={onClose}
              >
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
