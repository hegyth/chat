import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useAppSelector } from "../../redux/store";
import Message from "../Message/Message";
import { Button, Flex, Input, Space } from "antd";
import style from "./index.module.scss";

export default function PersonChat() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const chats = useAppSelector((state) => state.chatsData.chats);
  const { idInstance, apiTokenInstance } = useAppSelector(
    (state) => state.authData.authenticationData
  );

  useEffect(() => {
    if (!idInstance && !apiTokenInstance) {
      navigate("/");
    }
  }, [apiTokenInstance, idInstance, navigate]);

  const { handleSubmitMessage, setTextMessage, textMessage } =
    useSendMessage(chatId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmitMessage();
    }
  };

  if (chatId) {
    return (
      <Space direction="vertical" size="middle">
        <Flex justify="space-between" align="center">
          <span>Чат с {chatId}</span>
          <Link to={`/`}>
            <Button color="primary" variant="solid">
              Вернуться в чаты
            </Button>
          </Link>
        </Flex>
        <div className={style.chat}>
          {chats[chatId]?.map((message) => (
            <Message message={message} key={message.idMessage} />
          ))}
        </div>
        <Flex gap="middle">
          <Input
            placeholder="Написать сообщение..."
            onKeyDown={handleEnterPress}
            onChange={handleChange}
            value={textMessage}
          />
          <Button color="primary" variant="solid" onClick={handleSubmitMessage}>
            Отправить
          </Button>
        </Flex>
      </Space>
    );
  }
}
