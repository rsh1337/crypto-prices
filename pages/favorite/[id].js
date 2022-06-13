import { Box, Container } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";

const FavoritePage = ({favorites}) => {

    const { data: session, status } = useSession();
    if (!session){
        return(
            <Box>Please Sign In</Box>
        )
    }
    if (session){
        return(
            <Box>
              <Box>
                Welcome {session.user.name}, sorry, this feature is not yet ready
              </Box>
            </Box>
        )
    }
};

export default function Favorite() {
  return (
    <Layout>
      <Container maxW="container.md">
        <FavoritePage />
      </Container>
    </Layout>
  );
}