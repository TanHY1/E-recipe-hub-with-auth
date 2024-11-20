import React, { useState } from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import cookbook from "../pic/cookbook.png";
import hotdog from "../pic/hotdog.png";
import pizza from "../pic/pizza.png";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";


const MotionImage = motion(Box);

const LoginForm = ({onClose, switchToSignUp}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh

    // Simple validation for email and password
    if (!email || !password) {
      setFormError("Both email and password are required.");
      return;
    }

    try {
      await login(email, password);
      setFormError(""); // Clear error if valid
      console.log("Login successful:", { email, password });
      onClose();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Box position="relative" mt="120px" p="4" zIndex="2">
      <MotionImage
        as="img"
        src={cookbook}
        alt="cookbook"
        position="absolute"
        top={{ base: "-176px", md: "-186px" }} // Adjust top position for small screens
        width={{ base: "68%", md: "82%" }}
        left={{ base: "8%", md: "0%" }}
        initial={{ opacity: 0, x: 34, y: 70 }}
        animate={{ opacity: 1, x: 34, y: -40 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      />

      <MotionImage
        as="img"
        src={hotdog}
        alt="Hotdog"
        position="absolute"
        top={{ base: "12px", md: "2px" }}
        left={{ base: "14px", md: "-10px" }}
        width={{ base: "92px", md: "102px" }}
        initial={{ opacity: 0, x: 60, y: 100, rotate: -180 }}
        animate={{ opacity: 1, x: 0, y: -220, rotate: -80 }}
        transition={{ duration: 1, delay: 0.4 }}
      />

      <MotionImage
        as="img"
        src={pizza}
        alt="Pizza"
        position="absolute"
        bottom={{ base: "140px", md: "130px" }}
        right={{ base: "-18px", md: "-58px" }}
        width={{ base: "104px", md: "110px" }}
        initial={{ opacity: 0, x: -180, y: -100, rotate: -60 }}
        animate={{ opacity: 1, x: 0, y: -206, rotate: 10 }}
        transition={{ duration: 1, delay: 0.4 }}
      />

      <Box as="form" onSubmit={handleLoginSubmit}>
        <Text fontSize="lg" textAlign="center" mb="2" borderRadius="lg">
          Have a great time learning cooking! <br />
          Login here to continue.
        </Text>

        <FormControl isInvalid={!!formError} mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {formError && <FormErrorMessage>Email is required to fill</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!formError} mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {formError && <FormErrorMessage>Password is required to fill</FormErrorMessage>}
        </FormControl>

        <Box justify="space-between" align="center" mb={2} opacity={0.8} display={"flex"}>
          <Text fontSize={"sm"} color={"teal.500"} onClick={onClose}>
            <Link to='/forgot-password'>
              Forgot Password?
            </Link>
          </Text>
        </Box>

        {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

        <Button
          type="submit"
          colorScheme="teal"
          width="100%"
          isLoading={isLoading}
          loadingText="Logging in..."
        >
          Login
        </Button>

        <Text 
         mt = {4}
         fontSize={"sm"}
         textAlign={"center"}
        >
          <Text as="span" color={"red.500"}>
            Don't have an account?{" "} 
          </Text>
          <Box 
            as="span" 
            color="teal.500" 
            fontWeight="bold" 
            cursor="pointer" 
            _hover={{ textDecoration: "underline" }}
          > 
            <Link onClick={switchToSignUp}> 
              Sign Up here
            </Link>
          </Box>
        </Text>
      </Box>
    </Box>
  );
};

export default LoginForm;
