import style from "./imdex.module.scss";

type MessageTypeProps = {
  message: {
    idMessage: string;
    textMessage: string;
    sender: string;
    time: string;
  };
};

export default function Message({ message }: MessageTypeProps) {
  if (message.sender === "interlocutor") {
    return (
      <div key={message.idMessage}>
        <div className={style.blockForGetMessage}>
          {message.textMessage}
          <div className={style.getMessage}>
            <span className={style.time}>{message.time}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={message.idMessage}>
      <div className={style.blockForSendMessage}>
        <div className={style.sendMessage}>
          <span className={style.time}>{message.time}</span>
        </div>
        {message.textMessage}
      </div>
    </div>
  );
}
