import { Box, Container, HStack, Image, VStack } from "@chakra-ui/react";

const CoinList = ({ coinsData }) => {
  return (
    <Container>
      {coinsData.map(({ name, current_price, image }) => (
        <HStack spacing='24px'>
            <Image borderRadius="full" boxSize="50px" src={image} alt={name} />
            <Box>{name}</Box>
            <Box>${current_price}</Box>
        </HStack>
      ))}
    </Container>
  );
};
export default CoinList;
