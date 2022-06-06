import { Box, Container } from "@chakra-ui/react";
import { prisma, PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { fetcher } from "../../utils/api";

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
                Welcome ({session.user.name})
              </Box>
              <ul>
              {favorites.map(favorite => (
	     <li key={favorite.id}>{favorite.name}</li>
	    ))}
              </ul>
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

export const getServerSideProps = async ({ req }) => {
  	  const favorites = await prisma.Favorites.findMany({
  	    where: {
  	      userId: { id: userId },
  	    },
  	  })
  	  return { props: { favorites } }
  	}