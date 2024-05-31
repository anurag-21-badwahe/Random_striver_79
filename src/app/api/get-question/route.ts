import QuestionDataModel from "@/models/Questions"; // Adjust the path to your model as necessary
import mongoose from "mongoose";


interface ExtractedDataItem {
  title: string;
  lc_link: string | null;
  gfg_link: string | null;
  cs_link: string | null;
  yt_link: string | null;
  difficulty: string | null;
}

const connectToDatabase = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Rethrow the error to be caught by the error handler
  }
};


export async function GET(request: Request, response: Response) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch only the required fields from the database
    const questions = await QuestionDataModel.aggregate([
      { $unwind: "$sheetData" }, // Unwind the sheetData array
      { $project: { // Project only the specified fields from topics array
          "title": "$sheetData.topics.title",
          "post_link": "$sheetData.topics.post_link",
          "yt_link": "$sheetData.topics.yt_link",
          "gfg_link": "$sheetData.topics.gfg_link",
          "lc_link": "$sheetData.topics.lc_link",
          "difficulty": "$sheetData.topics.difficulty"
        }
      }
    ]);
    
   
    const extractedData: ExtractedDataItem[] = [];

    questions.forEach(question => {
      const { title, lc_link, gfg_link, cs_link, yt_link, difficulty } = question;

      // Iterate over each element in the title array
      title.forEach((titleElement : string, index : number) => {
        const lcLink = lc_link && lc_link[index] ? lc_link[index] : null;
        const gfgLink = gfg_link && gfg_link[index] ? gfg_link[index] : null;
        const csLink = cs_link && cs_link[index] ? cs_link[index] : null;
        const ytLink = yt_link && yt_link[index] ? yt_link[index] : null;
        const diff = difficulty && difficulty[index] ? difficulty[index] : null;

        // Push the extracted data for each element to the extractedData array
        extractedData.push({
          title: titleElement,
          lc_link: lcLink,
          gfg_link: gfgLink,
          cs_link: csLink,
          yt_link: ytLink,
          difficulty: diff
        });
      });
    });

   

    // Return questions with filtered topics as JSON response
    return Response.json({ status: 200, data: extractedData });   
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    // Return error message as JSON response
    return Response.json({ message: "Internal server error", success: false });
  }
}
