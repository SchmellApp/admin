import {
  CreateQuestionTypeForm,
  EditQuestionTypeForm,
  QuestionType
} from "@app/types";

export const createQuestionTypeInitialValues: CreateQuestionTypeForm = {
  name: "",
  hint: "",
  hexColor: ""
};

export const editQuestionTypeInitialValues = (
  questionType: QuestionType
): EditQuestionTypeForm => ({
  name: questionType.name,
  hint: questionType.hint,
  hexColor: questionType.hexColor
});
