import { Idea } from "../../../types/idea";
import { IdeaCategory } from "../../../types/ideas/category";
import { users } from "../users/user";

export const ideas: Idea[] = [
  {
    id: 1,
    ideaText:
      "Mobilen får opp 3 på rad, så skal man sende mobilen til hverandre. Man velger selv. Hvis X vinner drikker andre laget.",
    category: IdeaCategory.DEVELOPMENT,
    createdBy: users[0]
  },
  {
    id: 2,
    ideaText: "Idea 2",
    category: IdeaCategory.DEVELOPMENT,
    createdBy: users[1]
  },
  {
    id: 3,
    ideaText: "Idea 3",
    category: IdeaCategory.GAMES,
    createdBy: users[0]
  },
  {
    id: 4,
    ideaText: "Idea 4",
    category: IdeaCategory.GAMES,
    createdBy: users[1]
  },
  {
    id: 5,
    ideaText: "Idea 5",
    category: IdeaCategory.VARIOUS,
    createdBy: users[0]
  },
  {
    id: 6,
    ideaText: "Idea 6",
    category: IdeaCategory.VARIOUS,
    createdBy: users[1]
  },
  {
    id: 7,
    ideaText: "Idea 7",
    category: IdeaCategory.DESIGN,
    createdBy: users[0]
  },
  {
    id: 8,
    ideaText: "Idea 8",
    category: IdeaCategory.DESIGN,
    createdBy: users[1]
  }
];
