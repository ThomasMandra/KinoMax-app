import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useGetTrailerQuery } from "../../../services/youTubeApi";
import ReactPlayer from "react-player/youtube";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface videoPlayerProps {
  nameRu: string;
}

const VideoPlayer = ({ nameRu }: videoPlayerProps) => {
  const isMobile = useMediaQuery("(max-width:650px)");

  const { data, error, isLoading } = useGetTrailerQuery(nameRu);

  if (error) return <ErrorMessage />;

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Stack alignItems="center" mt={2} mb={3}>
      <ReactPlayer
        controls
        width={isMobile ? 310 : 640}
        height={isMobile ? 210 : 360}
        url={data.videos[0].link}
      />
    </Stack>
  );
};

export default VideoPlayer;
