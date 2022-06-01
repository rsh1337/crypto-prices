import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Image,
  Link,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../components/Layout";
import NextLink from 'next/link'

function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);
  const IMAGES_API = "https://assets.coincap.io/assets/icons/";

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching coins for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }

  if (!data.data.length) {
    return <Text>No results</Text>;
  }

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Coin</Th>
            <Th>Rank</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>
        {data.data.map(
          ({
            id,
            symbol,
            name,
            priceUsd,
            changePercent24Hr,
            rank
          }) => (
            <Tbody key={id}>
              <Tr>
                <Td>
                <NextLink href={`/coins/${id}`}>
                  <Button variant='ghost' size='lg'>
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={IMAGES_API + `${symbol.toLowerCase()}@2x.png`}
                    alt={name}
                  />
                  <Box mt={2}>{name}</Box>
                  </Button>
                  </NextLink>
                </Td>
                <Td>
                  <Box>{rank}</Box>
                </Td>
                <Td isNumeric>
                  <Box>${priceUsd.slice(0, 7)}</Box>
                </Td>
              </Tr>
            </Tbody>
          )
        )}
      </Table>
    </TableContainer>
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container maxW="container.md">
        <VStack spacing={4} align="stretch">
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}
