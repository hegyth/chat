import { useState } from "react";
import { apiUrl } from "../constants/constans";
import { addMessage } from "../redux/slices/chatsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getTime } from "../utils/getTime";

export const useSendMessage = (chatId: string | undefined) => {
  const [textMessage, setTextMessage] = useState("");

  const dispatch = useAppDispatch();

  const { idInstance, apiTokenInstance } = useAppSelector(
    (state) => state.auth.authenticationData
  );

  const handleSubmitMessage = async () => {
    setTextMessage("");
    const requestUrl = `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const body = {
      chatId,
      message: textMessage,
    };

    try {
      const response = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { idMessage } = await response.json();

      dispatch(
        addMessage({
          chatId,
          idMessage,
          textMessage,
          sender: "you",
          time: getTime(),
        })
      );

      setTextMessage("");

      console.log("Response:", idMessage);
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  return {
    handleSubmitMessage,
    setTextMessage,
    textMessage,
  };
};
