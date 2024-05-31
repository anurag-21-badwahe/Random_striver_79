import mongoose, { Schema, Document, model, models } from 'mongoose';

interface Topic {
  id: string;
  title: string;
  post_link: string;
  yt_link: string;
  cs_link: string;
  gfg_link: string;
  lc_link: string;
  company_tags: string[] | null;
  difficulty: number;
}

interface QuestionData extends Document {
  step_no: number;
  head_step_no: string;
  topics: Topic[];
}

const TopicSchema = new Schema<Topic>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  post_link: { type: String, required: true },
  yt_link: { type: String, required: true },
  cs_link: { type: String, required: true },
  gfg_link: { type: String, required: true },
  lc_link: { type: String, required: true },
  company_tags: { type: [String], default: null },
  difficulty: { type: Number, required: true },
});

const QuestionDataSchema = new Schema<QuestionData>({
  step_no: { type: Number, required: true },
  head_step_no: { type: String, required: true },
  topics: { type: [TopicSchema], required: true },
});

const QuestionDataModel = models.QuestionData || model<QuestionData>('QuestionData', QuestionDataSchema);

export default QuestionDataModel;
