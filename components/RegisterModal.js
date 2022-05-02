import { Button, Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

function RegisterModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [input, setInput] = useState("");
    const handleInputChange = (e) => setInput(e.target.value);
    const isError = input === "";
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast()
  
    return (
      <>
        <Button onClick={onOpen} variant='ghost'>Register</Button>
  
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
            <ModalHeader>Create Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="example@rares-andrei.me"
                />
                {!isError ? (
                  <FormHelperText>We'll never share your email.</FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={4} isRequired>
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
            </ModalBody>
  
            <ModalFooter>
              <Button 
              colorScheme="green"
              type='submit'
              onClick={() =>
                toast({
                  title: 'Account created.',
                  description: "We've created your account for you.",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
              }>Register</Button>
              <Button ml={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

export default RegisterModal;