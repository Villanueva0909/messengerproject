import { Button, Stack, Text, Flex, VStack, useBreakpointValue, Center } from "@chakra-ui/react";
import { auth } from "@/firebase/firebaseconfig";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
        <Flex
            w={'full'}
            h={'100vh'}
            backgroundImage={
                'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                <Stack maxW={'2xl'} justifyContent={'center'} spacing={6}>
                    <Text
                        color={'white'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                        Raul`s Messenger App
                    </Text>
                    <Stack>
                        <Center>
                            <Button
                                colorScheme={'blackAlpha'}
                                rounded={'full'}
                                color={'white'}
                                _hover={{ bg: 'red  .500' }}
                                onClick={() => signInWithGoogle("", {prompt: "select_account"})}>
                                Sign in With Google
                            </Button>
                        </Center>
                    </Stack>
                </Stack>
            </VStack>
        </Flex >
    );
}