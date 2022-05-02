import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Heading,
  Button,
  Container,
  useDisclosure,
  HStack,
  Stack,
  Spacer,
  VStack,
  Grid,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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

function SearchBar() {
  const router = useRouter();
  const { terms } = router.query;
  const [text, setText] = useState("");

  useEffect(() => {
    setText(terms || "");
  }, [terms]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (text !== terms) {
      router.push(`/search/?terms=${text}`, undefined, { shallow: true });
    }
  };

  return (
    <InputGroup as="form" onSubmit={handleSearch}>
      <Input
        variant="outline"
        focusBorderColor="Lime"
        placeholder="Search"
        _placeholder={{ color: "inherit", opacity: 1 }}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a coin"
          icon={<SearchIcon />}
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
  );
}

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref>
    <Button as="a" variant="link" {...props}>
      {children}
    </Button>
  </Link>
);

function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Container maxW="container.md">
        <Stack as="nav" direction={["column", , "row"]} wrap="wrap" py="1rem">
          <HStack justify="space-between">
            <MenuItem href="/" mr={8}>
              <Heading size="lg">Crypto</Heading>
            </MenuItem>

            <Box display={["block", , "none"]} onClick={onToggle}>
              <Button variant="outline">
                <HamburgerIcon />
              </Button>
            </Box>
          </HStack>

          <Box display={[isOpen ? "block" : "none", , "block"]}>
            <HStack>
              <Box>
                <LoginModal />
              </Box>
              <Box>
                <RegisterModal />
              </Box>
            <MenuItem href="/">
               <Box size="sm" ml={2}>Favorite</Box>
             </MenuItem>
            </HStack>
          </Box>
          <Spacer />
          <Box display={[isOpen ? "block" : "none", , "block"]}>
            <SearchBar />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Grid minH="100vh">
        <VStack align="stretch" w="full" spacing={8}>
          <Header />
          <Box as="main" h="full">
            {children}
          </Box>
        </VStack>
      </Grid>
    </>
  );
}
