import React from 'react';
import { Box, Button, Flex, Link, Spacer } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts); 
    }
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.2rem"
      bg="gray.900"
      color="white"
    >
      {/* Left side */}
      <Flex justify="space-around" width="20%">
        <Link href="https://github.com/poletto123">
          <Box as={FaLinkedin} boxSize="32px" margin="0 15px" fill="white" />
        </Link>
        <Link href="https://www.Linkedin.com/in/poletto123/">
          <Box as={FaGithub} boxSize="32px" margin="0 15px" fill="white" />
        </Link>
        <Link href="mailto:poletto123@gmail.com">
          <Box as={FaEnvelope} boxSize="32px" margin="0 15px" fill="white" />
        </Link>
      </Flex>

      {/* Right side */}
      <Flex justify="flex-end" width="20%" align="center">
        <Box margin="0 15px">About</Box>
        <Spacer />
        <Box margin="0 15px">Mint</Box>
        <Spacer />
        <Box margin="0 15px">Team</Box>
        <Spacer />
        {/* Connect */}
        {isConnected ? (
          <Box margin="0 15px" fontWeight="bold" color="white">Connected</Box>
        ) : (
        <Button
            backgroundColor="transparent"
            color="white"
            borderRadius="5px"
            cursor="pointer"
            fontFamily="inherit"
            fontWeight="normal"
            fontSize="20px"
            padding="8px 15px"
            margin="0 15px"
            boxShadow="0px 1px 1px rgba(0, 0, 0, 0.1)"
            onClick={connectAccount}
        >
        Connect
        </Button>

        )}
      </Flex>
    </Flex>
  )
}

export default NavBar;
