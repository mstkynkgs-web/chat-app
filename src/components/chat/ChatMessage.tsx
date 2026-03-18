"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { sendMessageAtom } from "@/common/store/chat/chat";
import {
    Box,
    Paper,
    Typography,
    Avatar,
    List,
    ListItem,
    Container
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

type ChatMessage = {
    id: number;
    role: "bot" | "user";
    message: string;
}

export const ChatMessage: React.FC = () => {
    const [inputMessage, setInputMessage] = useState<ChatMessage[]>([]);
    const [sender, setSender] = useAtom(sendMessageAtom);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const response = await fetch("api/chat", {
                    method: "GET"
                });

                const data = await response.json();
                setInputMessage(data);
            } catch (err) {
                console.error(err);
            }
        };

        getMessage();
        setSender(false);
    }, [sender, setSender]);

    return (
        <Container maxWidth="md" sx={{ py: 4, mb: 10 }}>
            <List sx={{ width: "100%" }}>
                {inputMessage.map((post) => {
                    const isUser = post.role === "user";
                    return (
                        <ListItem
                            key={post.id}
                            sx={{
                                flexDirection: isUser ? "row-reverse" : "row",
                                alignItems: "flex-start",
                                mb: 2,
                                gap: 1
                            }}
                        >
                            <Avatar sx={{ bgcolor: isUser ? "primary.main" : "gray.500" }}>
                                { isUser ? <PersonIcon /> : <SmartToyIcon />}
                            </Avatar>
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 2,
                                    maxWidth: "70%",
                                    borderRadius: isUser ? "20px 4px 20px 20px" : "4px 20px 20px 20px",
                                    bgcolor: isUser ? "primary.main" : "background.paper",
                                    color: isUser ? "#ffffff" : "text.primary"
                                }}
                            >
                                <Typography variant="body1" sx={{whiteSpace: "pre-wrap"}}>
                                    {post.message}
                                </Typography>
                            </Paper>
                        </ListItem>
                    )
                })}
            </List>
        </Container>
    );
};