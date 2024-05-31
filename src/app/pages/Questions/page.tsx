"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
  Container,
  Skeleton,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import Leetcode from "../../../../public/leetcode.svg";
import GFG from "../../../../public/gfg.svg";
import YT from "../../../../public/yt.svg";

// Define the interface for the Topic
interface Topic {
  _id: string;
  title: string;
  post_link: string;
  yt_link: string;
  cs_link: string;
  gfg_link: string;
  lc_link: string;
  company_tags: string[] | null;
  difficulty: number;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#d32f2f",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          padding: "16px",
        },
      },
    },
  },
});

const SkeletonRow = () => (
  <TableRow>
    <TableCell>
      <Skeleton variant="text" width={150} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={100} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={100} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={100} />
    </TableCell>
  </TableRow>
);

const QuestionList = () => {
  const [questions, setQuestions] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [randomQuestion, setRandomQuestion] = useState<Topic | null>(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get<{ data: Topic[] }>("/api/get-question");
      setQuestions(response.data.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const getRandomQuestion = () => {
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setRandomQuestion(questions[randomIndex]);
    }
  };

  const renderLinkCell = (
    link: string | null,
    text: string,
    icon: React.ReactNode = null
  ) => {
    return link && link.length > 0 ? (
      <Link href={link} target="_blank" rel="noopener" color="secondary">
        {icon ? icon : text}
      </Link>
    ) : (
      "N/A"
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Question List
        </Typography>
        <Card>
          <CardContent>
            {error && (
              <Alert severity="error">
                Error fetching questions.{" "}
                <Button
                  onClick={fetchQuestions}
                  startIcon={<RefreshIcon />}
                  color="inherit"
                >
                  Retry
                </Button>
              </Alert>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={getRandomQuestion}
              sx={{ mb: 2 }}
            >
              Get Random Question
            </Button>
            {randomQuestion && (
             <Box
             mb={2}
             p={2}
             border={1}
             borderRadius={4}
             borderColor="grey.300"
             position="relative"
             boxShadow={2} // Adding a subtle box shadow for depth
             bgcolor="background.paper" // Setting background color
           >
             {/* Close button */}
             <IconButton
               size="small"
               onClick={() => setRandomQuestion(null)}
               style={{ position: "absolute", top: 0, right: 0 }}
             >
               <CloseIcon />
             </IconButton>
             
             {/* Question */}
             <Typography variant="h6" gutterBottom>
               Question: {randomQuestion.title}
             </Typography>
             
             {/* Links */}
             <Typography variant="body1">
               YouTube Link:{" "}
               {renderLinkCell(
                 randomQuestion.yt_link,
                 "YouTube",
                 <Image src={YT.src} alt="YouTube" width={30} height={30} />
               )}
             </Typography>
             <Typography variant="body1">
               GFG Link:{" "}
               {renderLinkCell(
                 randomQuestion.gfg_link,
                 "GFG",
                 <Image src={GFG.src} alt="GFG" width={30} height={30} />
               )}
             </Typography>
             <Typography variant="body1">
               LeetCode Link:{" "}
               {renderLinkCell(
                 randomQuestion.lc_link,
                 "LeetCode",
                 <Image
                   src={Leetcode.src}
                   alt="LeetCode"
                   width={30}
                   height={30}
                 />
               )}
             </Typography>
           </Box>
           
            )}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>YouTube Link</TableCell>
                    <TableCell>GFG Link</TableCell>
                    <TableCell>LeetCode Link</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading
                    ? Array.from(new Array(3)).map((_, index) => (
                        <SkeletonRow key={index} />
                      ))
                    : questions.map((question) => (
                        <TableRow key={question._id}>
                          <TableCell>{question.title}</TableCell>
                          <TableCell>
                            {renderLinkCell(
                              question.yt_link,
                              "",
                              <Image
                                src={YT.src}
                                alt="Add Icon"
                                width={30}
                                height={30}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {renderLinkCell(
                              question.gfg_link,
                              "",
                              <Image
                                src={GFG.src}
                                alt="Add Icon"
                                width={30}
                                height={30}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {renderLinkCell(
                              question.lc_link,
                              "",
                              <Image
                                src={Leetcode.src}
                                alt="Add Icon"
                                width={30}
                                height={30}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default QuestionList;