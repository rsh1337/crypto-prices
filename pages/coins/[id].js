import { StarIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Center,
  CircularProgress,
  Container,
  HStack,
  Image,
  Stack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";

const CoinContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/coins/${id}`);
  const IMAGES_API = "https://assets.coincap.io/assets/icons/";

  if (error) {
    return (
      <Text color="red">
        Error fetching coin with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  return (
    <Stack>
      <Head>
        <title>{data.data.name}</title>
      </Head>
      <Box borderWidth="3px" borderRadius="lg" padding={4}>
        <Stack spacing={10} direction="row">
          <Box>
            <HStack ml={10}>
              <Image
                alt={data.data.name}
                src={IMAGES_API + `${data.data.symbol.toLowerCase()}@2x.png`}
              />
              <Box fontSize={20}>
                {data.data.name}({data.data.symbol})
              </Box>
              <Box>
                {data.data.rank > 10 ? (
                  <Box>
                    <Badge variant="subtle" colorScheme="gray">
                      Rank: {data.data.rank}
                    </Badge>
                  </Box>
                ) : (
                  <Box>
                    <Badge variant="solid" colorScheme="green">
                      Rank: {data.data.rank}
                    </Badge>
                  </Box>
                )}
              </Box>
            </HStack>
            <HStack ml={10}>
              <Box fontSize={23} mt={2} ml={2}>
                ${data.data.priceUsd.slice(0, 7)}
              </Box>
              <Box>
                {data.data.changePercent24Hr < 0 ? (
                  <Box color="red.500">
                    <TriangleDownIcon />{" "}
                    {data.data.changePercent24Hr.slice(0, 5)}%
                  </Box>
                ) : (
                  <Box color="green.500">
                    <TriangleUpIcon /> {data.data.changePercent24Hr.slice(0, 5)}
                    %
                  </Box>
                )}
              </Box>
            </HStack>
          </Box>
          <Box>
            <Box fontSize={20}>Market Cap</Box>
            <Box mt={2}>
              {data.data.marketCapUsd < 1000000000 ? (
                <Box>
                  $
                  {data.data.marketCapUsd
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Box>
              ) : (
                <Box>
                  $
                  {data.data.marketCapUsd
                    .slice(0, 12)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Box>
              )}
            </Box>
          </Box>
          <Box>
            <Box fontSize={20}>Volume (24Hr)</Box>
            <Box mt={2}>
              {data.data.volumeUsd24Hr < 1000000000 ? (
                <Box>
                  $
                  {data.data.volumeUsd24Hr
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Box>
              ) : (
                <Box>
                  $
                  {data.data.volumeUsd24Hr
                    .slice(0, 12)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Box>
              )}
            </Box>
          </Box>
        </Stack>
      </Box>
      
    </Stack>
  );
};

export default function Movie() {
  return (
    <Layout>
      <Container maxW="container.md">
        <CoinContent />
      </Container>
    </Layout>
  );
}
