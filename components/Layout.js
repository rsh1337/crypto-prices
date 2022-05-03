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
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal";
import SearchBar from "./SearchBar";
import { useSession } from "next-auth/react"

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref>
    <Button as="a" variant="link" {...props}>
      {children}
    </Button>
  </Link>
);

function Login() {
  const { data: session, status } = useSession()

  if (status === "unauthenticated") {
    return(
      <MenuItem href="/api/auth/signin">
      <Box size="sm" ml={2}>Login</Box>
    </MenuItem>
    )
  }
  return(
    <MenuItem href="/api/auth/signout">
    <Box size="sm" ml={2}>Signout</Box>
  </MenuItem>
  )
}

function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { data: session, status } = useSession()

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
                <Login />
              </Box>
              {/* <Box>
                <LoginModal />
              </Box> */}
              {/* <Box>
                <RegisterModal />
              </Box> */}
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
