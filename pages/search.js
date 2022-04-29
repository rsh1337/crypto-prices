import { Button } from "@chakra-ui/button";
import {
  Container,
  Text,
  VStack,
  Link,
  Badge,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../components/layout";
import Image from "next/image";




function SearchResults({coinsResult}) {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }
  return (
      <Container>
        {data.results.map(({ id, title, release_date, poster_path }) => (
        <Box>

        </Box>
        ))}
      </Container>
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container>
        <VStack spacing={4} align="stretch">
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}