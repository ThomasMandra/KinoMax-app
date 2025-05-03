import { Skeleton, Stack, useMediaQuery } from "@mui/material";

export default function MoviesListMainSkeleton() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");
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
        mt={2}
        mb={2}
        sx={{ flexDirection: { sm: "column", md: "row" }, gap: 1 }}
      >
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile || isTablet ? "100%" : "25%"}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile || isTablet ? "100%" : "25%"}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile || isTablet ? "100%" : "25%"}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile || isTablet ? "100%" : "25%"}
          height={40}
        />
        <Skeleton animation="wave" variant="rounded" width={132} height={40} />
      </Stack>
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
