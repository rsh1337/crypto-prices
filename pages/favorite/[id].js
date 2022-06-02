import { Box, Container } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Layout from "../../components/Layout";

const FavoritePage = () => {
    const { data: session, status } = useSession();
    if (!session){
        return(
            <Box>Please Sign In</Box>
        )
    }
    if (session){
        return(
            <Box>Welcome ({session.user.name})</Box>
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