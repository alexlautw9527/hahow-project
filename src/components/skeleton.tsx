import { Skeleton, Stack } from '@chakra-ui/react';
import type { StackProps } from '@chakra-ui/react';

export function BoxSkeleton({
  width = 'full',
}: {
  width?: StackProps['width'];
}) {
  return (
    <Stack width={width} align="center" justify="start" gap={6}>
      <Skeleton height="30px" width="full" />
      <Skeleton height="30px" width="full" />
      <Skeleton height="30px" width="full" />
      <Skeleton height="30px" width="full" />
      <Skeleton height="30px" width="full" />
    </Stack>
  );
}
