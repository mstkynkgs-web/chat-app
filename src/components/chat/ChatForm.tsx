"use client";

import { Box, TextField, Button, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useAtom } from "jotai";
import { sendMessageAtom } from "@/common/store/chat/chat";

export const ChatForm: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [_, setSender] = useAtom(sendMessageAtom);

    const sendMessage = async () => {
        if(!message) return;

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: "user",
                    message: message
                })
            })
            const data = await response.json();
            setSender(true);
        } catch(err) {
            console.error(err);
        }

        setMessage("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <Paper
            elevation={3}
            component="section"
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                p: 2
            }}
        ><Box sx={{ display: "flex", gap: 1, maxWidth: 800, mx: "auto" }}>
        <TextField
            fullWidth
            variant="outlined"
            placeholder="メッセージを入力..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
        /><Button 
        variant="contained" 
        endIcon={<SendIcon />}
        onClick={sendMessage}
      >
        Submit
      </Button>
            </Box>
        </Paper>
    );
}