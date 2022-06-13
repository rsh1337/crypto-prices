import { CalendarIcon, StarIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Center,
  CircularProgress,
  Container,
  HStack,
  IconButton,
  Image,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import useSWR, { mutate } from "swr";
import Layout from "../../components/Layout";
import { prisma } from "@prisma/client";

const CoinChart = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/history/${id}`);
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
        <CircularProgress isIndeterminate thickness='4px' />
      </Center>
    );
  }

  var coinsLable = [],
    coinsPrice = [];

  const price = data.data.map((x) => x.priceUsd);
  const date = data.data.map((x) => x.time);
  coinsLable = date;
  coinsPrice = price;

  var timestamps = coinsLable.map(function(d) { return new Date(d) } );

  const dataCoin = {
    labels: timestamps,
    datasets: [
      {
        label: "Prices in last 24Hr",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: coinsPrice,
      },
    ],
  };
  const options = { scales: { x: { display: false } } }
  return(
    <Line options={options} data={dataCoin}/>
  )
};

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
        <CircularProgress isIndeterminate thickness='4px' />
      </Center>
    );
  }

  return (
    <Stack>
      <Head>
        <title>{data.data.name}</title>
      </Head>
      <Box borderWidth="3px" borderRadius="lg" padding={4} mb={10}>
        <Stack spacing={10} direction="row">
          <Box>
            <HStack ml={10}>
              <Image
                boxSize="60px"
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
                    .slice(0, 11)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Box>
              ) : (
                <Box>
                  $
                  {data.data.marketCapUsd
                    .slice(0, 13)
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
                    .slice(0, 11)
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

export default function Coin() {
  return (
    <Layout>
      <Container maxW="container.md">
        <CoinContent />
        <Box borderWidth="3px" borderRadius="lg" padding={4}>
        <CoinChart />
        </Box>
      </Container>
    </Layout>
  );
}
