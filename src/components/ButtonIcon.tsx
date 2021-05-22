import { Icon, IconProps } from '@chakra-ui/react';

import { IconType } from 'react-icons/lib';

export const ButtonIcon = ({
  icon,
  ...rest
}: IconProps & { icon: IconType }) => {
  return (
    <Icon
      {...rest}
      _hover={{
        cursor: 'pointer',
        backgroundColor: 'gray.500',
        transitionDuration: '1s',
      }}
      border="2px"
      bg="gray.300"
      boxSize="6"
      borderRadius="100%"
      as={icon}
    />
  );
};
