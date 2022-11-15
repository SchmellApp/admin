import axios, { AxiosInstance } from "axios";
import User from "@app/client/user";
import Task from "@app/client/task";
import Comment from "@app/client/comment";
import Idea from "@app/client/idea";
import Statistics from "@app/client/statistics";
import Game from "@app/client/game";
import Question from "@app/client/question";
import Week from "@app/client/week";

export default class SchmellClient {
  axiosInstance: AxiosInstance;
  user = new User(this);
  task = new Task(this);
  comment = new Comment(this);
  idea = new Idea(this);
  statistics = new Statistics(this);
  game = new Game(this);
  week = new Week(this);
  question = new Question(this);

  constructor(url: string, accessToken?: string) {
    this.axiosInstance = axios.create({
      baseURL: url
    });
    this.user = new User(this);
    this.task = new Task(this);
    this.comment = new Comment(this);
    this.idea = new Idea(this);
    this.statistics = new Statistics(this);
    this.game = new Game(this);
    this.week = new Week(this);
    if (accessToken !== undefined) {
      this.setAccessToken(accessToken);
    }
  }

  setAccessToken(accessToken: string): void {
    this.axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }
}
