import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  useToast,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";

function MenuItems() {
  const toast = useToast();
  const { data: session } = useSession();
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <HStack>
          <Image
            boxSize="2rem"
            borderRadius="full"
            src={session.user.image}
            mr="5px"
          />
          <Box>{session.user.name}</Box>
        </HStack>
      </MenuButton>
      <MenuList>
        {/* <NextLink href={`/favorite/${session.userId}`}> */}
        <MenuItem>
          <Box
            onClick={() =>
              toast({
                title: "In Progress",
                description: "Sorry, this feature is not yet ready.",
                status: "error",
                duration: 9000,
                isClosable: true,
              })
            }
          >
            Favorite <Tag>beta</Tag>
          </Box>
        </MenuItem>
        {/* </NextLink> */}
        <MenuItem
          onClick={() =>
            toast({
              title: "Signed Out",
              description: "You have successfully signed out!",
              status: "success",
              duration: 9000,
              isClosable: true,
            })
          }
        >
          <Box onClick={() => signOut({redirect: false, callbackUrl: "http://localhost:3000/foo"})}>Sign out</Box>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default MenuItems;
