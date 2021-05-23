import { Text, HStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { subSeconds } from 'date-fns';
import { useCart } from '../hooks/useCart';

export const Countdown = () => {
  const { removeAllProducts, expirationDate } = useCart();
  const [time, setTime] = useState<Date>(expirationDate);

  const startDate = useMemo(() => new Date(), []);

  const diff = useMemo(
    () => new Date(time.getTime() - startDate.getTime()),
    [startDate, time]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (diff.getTime() >= 1000) {
        setTime(subSeconds(time, 1));
        return;
      }
      removeAllProducts();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [time, diff, removeAllProducts]);

  const minutes = diff.getMinutes();
  const seconds = diff.getSeconds();

  return (
    <HStack>
      {minutes > 0 && (
        <Text>
          {`${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} e`}
        </Text>
      )}
      <Text>
        {`${seconds} ${
          seconds === 1 ? 'segundo' : 'segundos'
        } restantes`}
      </Text>
    </HStack>
  );
};
