import React from "react";
import { Box, Text, BoxProps } from "@chakra-ui/core";

interface Props extends BoxProps {
  book: {
    title: string;
    author: {
      name: string;
    };
  };
}

export const BookItem: React.FC<Props> = (props) => {
  const {
    title,
    author: { name },
  } = props.book;
  return (
    <Box {...props} key={title} p={5} border="1px solid #979797">
      <Text>{title}</Text>
      <Text>{name}</Text>
    </Box>
  );
};
