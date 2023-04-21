import { Sidebar } from '../Sidebar'
import { Flex, Avatar, Heading, FormControl, Input, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { addDoc, collection, doc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '.././././//../firebase/firebaseconfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import getOtherEmail from '../../Utils/getOtherEmail';
import { useState } from 'react';

const Topbar = ({ email}) => {
    const [user] = useAuthState(auth);
    return (
        <Flex
            borderBottom={'1px solid'}
            borderColor={'gray.100'}
            p={5}
            h={'81px'}
            w={'100%'}>
            <Avatar src={user.Avatar} marginEnd={3} />
            <Heading size={'lg'}>{email}</Heading>
        </Flex>
    )
}

const Bottombar = ({ id, user }) => {
    const [input, setInput] = useState("")
    const sendMessage = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, `chats/${id}/messages`), {
            text: input,
            sender: user.email,
            timestamp: serverTimestamp()
        })
        setInput("");
    }

    return (
        <FormControl
            p={3}
            onSubmit={sendMessage}
            as="form">
            <Input autoComplete='off' placeholder="Type a message..." onChange={e => setInput(e.target.value)} value={input} />
            <Button type='submit' hidden >Submit</Button>
        </FormControl>
    )
}

const Chat = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user] = useAuthState(auth)
    const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
    const [messages] = useCollectionData(q)
    const [chat] = useDocumentData(doc(db, "chats", id))
    const getMessages = () =>
        messages?.map(msg => {
            const sender = msg.sender === user.email;

            return (
                <Flex key={Math.random()} alignSelf={sender ? "flex-start" : "flex-end"} bg={sender ? 'blue.100' : 'yellow.100'} w={'fit-content'} minW={'100px'} borderRadius={'lg'} p={3} m={1}>
                    <Text>{msg.text}</Text>
                </Flex>
            )})

    return (
        <>
            <Flex
                h={'100vh'}>
                <Sidebar />
                <Flex
                    direction={'column'}
                    flex={1}>
                    <Topbar email={getOtherEmail(chat?.users, user)} />
                    <Flex
                        flex={1}
                        direction={'column'}
                        pt={4}
                        mx={5}>
                        {getMessages()}
                    </Flex>
                    <Bottombar id={id} user={user} />
                </Flex>
            </Flex>
        </>
    );
}

export default Chat;