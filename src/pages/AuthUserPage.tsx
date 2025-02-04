import React, { useState } from "react";
import { setAuthData } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/store";
import { Button, Flex, Input } from "antd";

export default function AuthUserPage() {
  const dispatch = useAppDispatch();

  const [id, setId] = useState("");
  const [api, setApi] = useState("");

  const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleChangeApi = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApi(event.target.value);
  };

  const handleAuthClick = () => {
    dispatch(setAuthData({ idInstance: id, apiTokenInstance: api }));
  };

  return (
    <Flex gap="middle" vertical>
      <Input
        placeholder="Введите свой idInstance"
        onChange={handleChangeId}
        value={id}
      />
      <Input
        placeholder="Введите свой apiTokenInstance"
        onChange={handleChangeApi}
        value={api}
      />
      <Button color="primary" variant="solid" onClick={handleAuthClick}>
        Авторизироваться
      </Button>
    </Flex>
  );
}
