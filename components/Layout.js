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
  Menu,
  MenuButton,
  Image,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import SearchBar from "./SearchBar";
import { signOut, useSession } from "next-auth/react";
import NextLink from "next/link";

function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return (
      <Box>
        <Container maxW="container.md">
          <Stack as="nav" direction={["column", , "row"]} wrap="wrap" py="1rem">
            <HStack justify="space-between">
              <NextLink href={`/`}>
                <Button variant="ghost">
                  <Heading size="lg">Crypto</Heading>
                </Button>
              </NextLink>

              <Box display={["block", , "none"]} onClick={onToggle}>
                <Button variant="outline">
                  <HamburgerIcon />
                </Button>
              </Box>
            </HStack>

            <Box display={[isOpen ? "block" : "none", , "block"]}>
              <SearchBar />
            </Box>
            <Spacer />
            <Box display={[isOpen ? "block" : "none", , "block"]}>
              <HStack>
                <Box>
                  <LoginModal />
                </Box>
              </HStack>
            </Box>
          </Stack>
        </Container>
      </Box>
    );
  }
  if (status === "authenticated") {
    return (
      <Box>
        <Container maxW="container.md">
          <Stack as="nav" direction={["column", , "row"]} wrap="wrap" py="1rem">
            <HStack justify="space-between">
              <NextLink href={`/`}>
                <Button variant="ghost">
                  <Heading size="lg">Crypto</Heading>
                </Button>
              </NextLink>

              <Box display={["block", , "none"]} onClick={onToggle}>
                <Button variant="outline">
                  <HamburgerIcon />
                </Button>
              </Box>
            </HStack>

            <Box display={[isOpen ? "block" : "none", , "block"]}>
              <SearchBar />
            </Box>
            <Spacer />
            <Box display={[isOpen ? "block" : "none", , "block"]}>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <HStack>
                    <Image
                      boxSize="2rem"
                      borderRadius="full"
                      src={session.user.image}
                      alt={session.user.name}
                      mr="5px"
                    />
                    <Box>{session.user.name}</Box>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <NextLink href={`/favorite/${session.userId}`}>
                    <MenuItem>
                      <Box>Favorite</Box>
                    </MenuItem>
                  </NextLink>
                  <MenuItem onClick={() => signOut()}>
                    <Box>Sign out</Box>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Stack>
        </Container>
      </Box>
    );
  }
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
