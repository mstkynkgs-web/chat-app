import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type MessageRole = "bot" | "user";

interface ChatObj {
    id: number;
    role: MessageRole;
    message: string;
}

// rootのmessage.jsonにデータを保存
const filePath = path.join(process.cwd(), "message.json");

//ヘルパー関数
//メッセージ一覧の取得
const getMessageFromFile = (): ChatObj[] => {
    if (!fs.existsSync(filePath)) {
        //初回、初期メッセージを返す
        return [{ id: 1, role: "bot", message: "こんにちは！なにかお手伝いしましょうか？"}]
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
}

//ファイルにメッセージを書き込む
const saveMessagesToFile = (messages: ChatObj[]) => {
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), "utf-8");
}

let chatMessages: ChatObj[] = [
    {
        id: 1,
        role: "bot",
        message: "こんにちは！"
    }
];

//GET: メッセージ履歴を取得
export async function GET() {
    const messages = getMessageFromFile();
    return NextResponse.json(messages);
};

//POST: メッセージを受け取り、保存する
export async function POST(request: Request) {
    try {
        const data = await request.json();
        const currentMessages = getMessageFromFile();

        const userMsg: ChatObj = {
            id: chatMessages.length + 1,
            role: "user",
            message: data.message
        };
        currentMessages.push(userMsg);

        // Botの返信
        const botMsg: ChatObj = {
            id: chatMessages.length + 1,
            role: "bot",
            message: `「${data.message}」と受け取りました。`
        }

        currentMessages.push(botMsg);

        //全体をファイルに上書き保存
        saveMessagesToFile(currentMessages);

        // 新しいメッセージを含む更新された配列をレスポンスする
        return NextResponse.json(userMsg);
    } catch (err) {
        console.error("保存エラー：", err);
        return NextResponse.json({ err: "保存に失敗しました" }, { status: 500 });
    }
};