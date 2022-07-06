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
  Tag,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import SearchBar from "./SearchBar";
import { signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import MenuItems from "./MenuItems";

function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { data: session, status } = useSession();
  const toast = useToast();

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
              <MenuItems/>
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
