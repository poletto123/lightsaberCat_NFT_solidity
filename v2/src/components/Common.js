import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';

const Common = () => {

  return (
    <Flex justify="center" align="center" height="15vh" width="80%" margin="0 auto" marginBottom="0" borderStyle="solid" borderRadius="20px">
        <Box width="99%" padding="0" backgroundColor="#00022C" >
            <Text fontSize="30px">Lightsaber Cat NFT</Text>
            <Text fontSize="20px">Living in his castle, he contemplates on the smallness of humans, and uses the Force to protect his cat realm</Text>
        </Box>
    </Flex>
  )
}

export default Common;
