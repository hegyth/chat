import { Button, Divider, Flex, Input, InputProps, InputRef } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetMessage } from "../hooks/useGetMessage";
import { addChat } from "../redux/slices/chatsSlice";
import InputMask from "react-input-mask";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { JSX } from "react/jsx-runtime";
import formatPhoneNumber from "../utils/formatPhoneNumber";

export default function CreateChatPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const chats = useAppSelector((state) => state.chatsData.chats);

  const dispatch = useAppDispatch();

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleCreateChat = () => {
    const cleanedPhoneNumber = formatPhoneNumber(phoneNumber);
    if (cleanedPhoneNumber) {
      dispatch(addChat(`${formatPhoneNumber(phoneNumber)}@c.us`));
      setPhoneNumber("");
    }
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCreateChat();
    }
  };

  const { handelGetMessage } = useGetMessage();

  return (
    <React.Fragment>
      <Flex gap="middle" vertical>
        <InputMask
          mask="+7 (999) 999-99-99"
          placeholder="Введите номер телефона"
          onChange={handleChangePhone}
          onKeyDown={handleEnterPress}
          value={phoneNumber}
        >
          {(
            inputProps: JSX.IntrinsicAttributes &
              InputProps &
              React.RefAttributes<InputRef>
          ) => <Input {...inputProps} />}
        </InputMask>
        <Button color="primary" variant="solid" onClick={handleCreateChat}>
          Создать чат
        </Button>
      </Flex>
      <Flex gap="middle" vertical>
        {Object.keys(chats).map((chatId) => (
          <div key={chatId}>
            <Divider style={{ borderColor: "#1677ff" }} />
            <Flex gap="middle">
              {chatId}
              <Link to={`/${chatId}`}>
                <Button
                  color="primary"
                  variant="solid"
                  onClick={handelGetMessage}
                >
                  Перейти в чат
                </Button>
              </Link>
            </Flex>
          </div>
        ))}
      </Flex>
    </React.Fragment>
  );
}
