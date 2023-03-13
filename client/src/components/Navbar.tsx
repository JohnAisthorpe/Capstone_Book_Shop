import {Box, Flex, HStack, Link, IconButton, Icon, Text, useDisclosure, Button, Stack, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { GiBookCover } from 'react-icons/gi';


const Navbar: React.FC = () => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Box bg= {useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems='center' justifyContent='space-between'>
            <IconButton aria-label='menuOpen-Close' size='md' icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>} display={{md:'none'}} onClick={isOpen? onClose:onOpen} />
            <HStack>
                <Link as={ReactLink} to='/'>
                    <Flex alignItems='center'>
                        <Icon as={GiBookCover} h={6} w={6} color="blue.500"/>
                        <Text fontWeight='semibold'>Capstone Books</Text>


                    </Flex>
                </Link>
            </HStack>
        </Flex>


    </Box>
  )
}

export default Navbar
