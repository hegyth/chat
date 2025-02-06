import { apiUrl, receiveTimeout } from "../constants/constans";
import { addMessage } from "../redux/slices/chatsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getTime } from "../utils/getTime";

export const useGetMessage = () => {
  const { idInstance, apiTokenInstance } = useAppSelector(
    (state) => state.authData.authenticationData
  );

  const dispatch = useAppDispatch();

  const handelGetMessage = async () => {
    const ReceiveNotification = `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=${receiveTimeout}`;
    try {
      const responseReceiveNotification = await fetch(ReceiveNotification, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responseReceiveNotification.ok) {
        throw new Error(
          `HTTP error! Status: ${responseReceiveNotification.status}`
        );
      }
      const { receiptId, body } = await responseReceiveNotification.json();

      if (
        body?.senderData?.chatId &&
        body?.idMessage &&
        body.messageData?.textMessageData?.textMessage
      ) {
        dispatch(
          addMessage({
            chatId: body?.senderData?.chatId,
            idMessage: body?.idMessage,
            textMessage: body.messageData?.textMessageData?.textMessage,
            sender: "interlocutor",
            time: getTime(),
          })
        );
      }

      console.log("Response:", body);

      const DeleteNotification = `${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;

      const responseDeleteNotification = await fetch(DeleteNotification, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responseDeleteNotification.ok) {
        throw new Error(
          `HTTP error! Status: ${responseReceiveNotification.status}`
        );
      }
    } catch (error) {
      console.log("Ожидание сообщений:", error);
    }

    handelGetMessage();
  };

  return {
    handelGetMessage,
  };
};
