import { Skeleton, Stack } from "@mui/material";

export default function MoviesListTopSkeleton() {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="32px"
        width="200px"
        sx={{ mt: 2, mb: 2 }}
      />
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        columnGap="15px"
        rowGap="15px"
      >
        {new Array(20).fill(null).map((_, index) => (
          <Stack key={index}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              height="322px"
              width="215px"
            />
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="text" />
          </Stack>
        ))}
      </Stack>
    </>
  );
}
