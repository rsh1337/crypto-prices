import { Button, Checkbox, FormControl, FormLabel, HStack, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

function LoginModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [input, setInput] = useState("");
    const handleInputChange = (e) => setInput(e.target.value);
    const isError = input === "";
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast()
  
    return (
      <>
        <Button onClick={onOpen} variant='ghost'>Login</Button>
  
        <Modal
          motionPreset="slideInBottom"
          closeOnOverlayClick={false}
          blockScrollOnMount={true}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Log in</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" placeholder="Username" />
              </FormControl>
              <FormControl mt={4} mb={4} isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    id="password"
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <HStack>
                  <Checkbox id="rememberMe"></Checkbox>
                  <FormLabel htmlFor="rememberMe">Remember Me</FormLabel>
                </HStack>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button 
              colorScheme="green"
              type='submit'
              onClick={() =>
                toast({
                  title: 'Logged In.',
                  description: "You have successfully logged in.",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
              }>Login</Button>
              <Button ml={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

export default LoginModal;