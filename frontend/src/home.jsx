import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Button,
  Paper,
  CardActionArea,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#ffffff"),
  backgroundColor: "#ffffff",
  "&:hover": {
    backgroundColor: "#ffffff7a",
  },
}));

const useStyles = () => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "100%",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  media: {
    height: 400,
  },
  mainContainer: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: "transparent",
    boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%) !important",
    borderRadius: "15px",
  },
  loader: {
    color: "#be6a77",
  },
  imageCardEmpty: {
    backgroundColor: "#f5f5f5", // Ensure it's styled when empty
  },
});

export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState(""); // To store data fetched from GET endpoint
  const [error, setError] = useState(null); // To store any errors during fetch

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/info");
      if (response.status === 200) {
        setInfo(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data from the server.");
    }
  };

  useEffect(() => {
    getData(); // Fetch server info on component mount
  }, []);

  const sendFile = async () => {
    if (image && selectedFile) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      try {
        setIsLoading(true);
        const res = await axios.post(
          "http://localhost:8000/predict",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onDrop = (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(acceptedFiles[0]);
    setData(undefined);
    setImage(true);
  };

  useEffect(() => {
    if (preview) {
      sendFile(); // Trigger file upload when preview is set
    }
  }, [preview]);

  let confidence = 0;
  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
  });

  return (
    <React.Fragment>
      <Container
        style={{
          backgroundImage:
            "url('https://c4.wallpaperflare.com/wallpaper/108/913/128/calm-clouds-countryside-farm-wallpaper-preview.jpg')",
          backgroundSize: "cover", // Ensure the background covers the entire screen
          backgroundPosition: "center",
          minHeight: "100vh", // Ensure full height of the viewport
          display: "flex", // Flex container to align content vertically
          justifyContent: "center", // Center items horizontally
          alignItems: "center", // Center items vertically
          width: "100vw", // Ensure full width of the viewport
          maxWidth: "100vw", // Prevent width expansion beyond viewport width
        }}
        maxWidth={false}
        disableGutters
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{
            minHeight: "80vh", // Minimum height to avoid shrinking
            width: "100%", // Ensure the grid takes full width
            maxWidth: "800px", // Set a fixed width for the content
            display: "flex",
            flexDirection: "column", // Align children vertically
            justifyContent: "center", // Center the content vertically
            textAlign: "center",
          }}
        >
          <Grid item xs={12} style={{ width: "100%" }}>
            <Card
              className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ""}`}
              style={{
                minHeight: "400px",
                width: "100%",
                maxWidth: "600px", // Set max width to avoid stretching
                height: "auto", // Allow height to grow if necessary
                padding: "20px", // Add padding for content inside the card
              }}
            >
              {!image && (
                <CardContent>
                  <div
                    {...getRootProps({
                      style: {
                        border: "2px dashed #cccccc",
                        borderRadius: "15px",
                        padding: "20px",
                        textAlign: "center",
                        color: "#666666",
                        cursor: "pointer",
                      },
                    })}
                  >
                    <input {...getInputProps()} />
                    <Typography variant="h6">
                      Drag and drop an image of a potato plant leaf to process,
                      or click to select one
                    </Typography>
                  </div>
                </CardContent>
              )}
              {image && (
                <CardActionArea>
                  <CardMedia className={classes.media} image={preview} />
                </CardActionArea>
              )}

              {data && (
                <CardContent>
                  <Paper>
                    <Typography variant="h6">Prediction</Typography>
                    <p>Label: {data.class}</p>
                    <p>Confidence: {confidence}%</p>
                  </Paper>
                </CardContent>
              )}

              {isLoading && (
                <CardContent>
                  <CircularProgress color="secondary" className={classes.loader} />
                </CardContent>
              )}
            </Card>
          </Grid>

          {data && (
            <Grid item>
              <ColorButton variant="contained" onClick={clearData}>
                Clear
              </ColorButton>
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
