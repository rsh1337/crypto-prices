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
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
          <Box display={["block", , "none"]} onClick={onToggle}>
            <Button variant="outline">
              <HamburgerIcon />
            </Button>
          </Box>

          <Box display={[isOpen ? "block" : "none", , "block"]}>
            <MenuItem href="/" mt={4}>
              <Box size="sm" mr={3}>
                Login
              </Box>
            </MenuItem>
            <MenuItem href="/">
              <Box size="sm" mr={3}>
                Register
              </Box>
            </MenuItem>
            <MenuItem href="/">
              <Box size="sm">Favorite</Box>
            </MenuItem>
          </Box>
          <Spacer />
          {/* <Box display={[isOpen ? "block" : "none", , "block"]}>
            <SearchBar type='text' placeholder='Search' onChange={handleChange}/>
          </Box> */}
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
        <link rel="icon" href="/favicon.ico" />
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
