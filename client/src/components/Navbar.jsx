import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Link as ChakraLink,
  IconButton,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useAuthStore } from "../store/authStore";
import ProfileForm from "./ProfileForm";

const MotionBox = motion(Box);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSignUp, setIsSignUp] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const openLoginForm = () => {
    setIsSignUp(false);
    onOpen();
  };

  const openSignUpForm = () => {
    setIsSignUp(true);
    onOpen();
  };

  const switchToSignUp = () => {
    setIsSignUp(true);
  };

  const switchToLogin = () => {
    setIsSignUp(false);
  };

  const toggleSearchBar = () => {
    setIsSearchBarActive(!isSearchBarActive);
  };

  const openProfileForm = () => {
      onOpenProfile();
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (location.pathname === "/verify-email") {
      setIsMobileMenuOpen(false);
    }
  }, [location]);

  return (
    <Flex
      as="nav"
      bg="transparent"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      px={{ base: "2", md: "4" }}
      py={{ base: "2", md: "4" }}
      zIndex="1000"
      align="center"
      justify="space-between"
      color="white"
      backdropFilter="blur(5px)"
    >
      <Text fontSize="xl" fontWeight="bold">
        <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
          E-Recipes Hub
        </ChakraLink>
      </Text>

      <Flex as="ul" 
            flex="1" 
            display={{ base: "none", md: "flex" }} 
            gap="8" justify="center" 
            align="center" 
            listStyleType="none"
      >
        <ChakraLink as={RouterLink} to="/" fontSize="lg" _hover={{ color: "orange.300" }}>
          Home
        </ChakraLink>
        <ChakraLink as={RouterLink} to="/about" fontSize="lg" _hover={{ color: "orange.300" }}>
          About
        </ChakraLink>
        <ChakraLink as={RouterLink} to="/recipes" fontSize="lg" _hover={{ color: "orange.300" }}>
          Recipes
        </ChakraLink>
      </Flex>

      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          icon={isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle menu"
          onClick={toggleMobileMenu}
          bg="transparent"
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
        />
        {isMobileMenuOpen && (
          <Box position="absolute" top="100px" left="50%" transform="translateX(-50%)" bg="gray.800" color="white" p="4" boxShadow="lg" borderRadius="md" zIndex="100" textAlign="center" width={{ base: "100%", md: "auto" }}>
            <ChakraLink as={RouterLink} to="/" display="block" py="2" _hover={{ color: "orange.300" }} onClick={toggleMobileMenu}>
              Home
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/about" display="block" py="2" _hover={{ color: "orange.300" }} onClick={toggleMobileMenu}>
              About
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/recipes" display="block" py="2" _hover={{ color: "orange.300" }} onClick={toggleMobileMenu}>
              Recipes
            </ChakraLink>
          </Box>
        )}
      </Box>

      <Flex align="center" gap="4" position="relative">
        {isAuthenticated ? (
          <>
            {/* Search Bar */}
            <Box position="relative" display="flex" alignItems="center">
              <MotionBox
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                bg={isSearchBarActive ? "white" : "transparent"}
                color={isSearchBarActive ? "black" : "white"}
                borderRadius="full"
                px="2"
                w={isSearchBarActive ? "250px" : "40px"}
                h="40px"
                initial={{ width: "40px" }}
                animate={{
                  width: isSearchBarActive ? "250px" : "40px",
                  backgroundColor: isSearchBarActive ? "#FFFFFF" : "transparent",
                }}
                transition={{ duration: 0.3 }}
              >
                <IconButton
                  icon={<i className="fas fa-search"></i>}
                  onClick={toggleSearchBar}
                  bg="transparent"
                  size="sm"
                  aria-label="Search"
                  color={isSearchBarActive ? "black" : "white"}
                  _hover={{ bg: "transparent" }}
                />
                {isSearchBarActive && (
                  <Input
                    bg="transparent"
                    border="none"
                    placeholder="Search..."
                    flex="1"
                    _focus={{ outline: "none" }}
                    onBlur={toggleSearchBar}
                  />
                )}
              </MotionBox>
            </Box>

            {/* Favorites Link */}
            <ChakraLink as={RouterLink} to="/favorites" fontSize="lg" _hover={{ color: "orange.300" }}>
              <i className="fas fa-heart"></i>
            </ChakraLink>

            {/* Profile Dropdown */}
            <Menu> 
              <MenuButton 
                as={IconButton} 
                icon={<i className="fas fa-user"></i>} 
                variant="outline" 
                color="white" 
                _hover={{ bg: "whiteAlpha.200" }} 
              /> 
              <MenuList bg="gray.800" color="black"> 
                <MenuItem onClick={openProfileForm} _hover={{ bg: "orange.300" }}> 
                  Profile 
                </MenuItem> 
                <MenuItem onClick={handleLogout} _hover={{ bg: "orange.300" }}> 
                  Sign Out 
                </MenuItem> 
              </MenuList> 
            </Menu>

            {/* Profile Modal*/}
            <ProfileForm isOpen={isOpenProfile} onClose={onCloseProfile} />
          </>
        ) : (
          <>
            <Button colorScheme="yellow" onClick={openLoginForm}>Login</Button>
            <Button colorScheme="orange" onClick={openSignUpForm}>Sign Up</Button>
          </>
        )}
      </Flex>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW="420px"
          bg="linear-gradient(to top left, #ffecd2, #fcb69f)"
          borderRadius="30px"
          p={{ base: "4", md: "8" }}
          boxShadow="lg"
          position="absolute"
          top="14%"
        >
          <ModalHeader position="relative" display="flex" alignItems="center" justifyContent="center" minHeight={{ base: "100px", md: "130px" }}>
            <AnimatePresence mode="wait">
              {isSignUp ? (<SignUpForm onClose={onClose} switchToLogin={switchToLogin} />) : (<LoginForm onClose={onClose} switchToSignUp={switchToSignUp} />)}
            </AnimatePresence>
          </ModalHeader>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Navbar;
